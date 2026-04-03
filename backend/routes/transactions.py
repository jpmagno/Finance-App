from fastapi import APIRouter, UploadFile, File
from sqlalchemy.orm import Session
from database import SessionLocal, Transaction
import pandas as pd
import io

router = APIRouter()

def categorize(description: str) -> str:
  d = description.lower()
  if any(x in d for x in ["spotify", "netflix", "hulu"]):
    return "Subscriptions"
  if any(x in d for x in ["uber", "lyft", "gas"]):
    return "Transport"
  if any(x in d for x in ["amazon", "walmart", "target"]):
    return "Shopping"
  if any(x in d for x in ["chipotle", "mcdonald", "restaurant"]):
    return "Dining"
  if any(x in d for x in ["whole foods", "kroger", "grocery"]):
    return "Groceries"
  if any(x in d for x in ["electric", "water", "internet"]):
    return "Utilities"
  if any(x in d for x in ["salary", "payroil", "deposit"]):
    return "Income"
  return "Other"

@router.get("/transactions")
def get_transactions():
  db: Session = SessionLocal()
  transactions = db.query(Transaction).all()
  db.close()
  if not transactions:
    return [
      {"id": 1, "name": "Spotify", "category": "Subscriptions", "amount": -9.99, "date": "Mar 20"},
      {"id": 2, "name": "Salary", "category": "Income", "amount": 3500, "date": "Mar 15"},
      {"id": 3, "name": "Whole Foods", "category": "Groceries", "amount": -84.32, "date": "Mar 14"},
    ]
  return [{"id": t.id, "name": t.name, "category": t.category, "amount": t.amount, "date": t.date} for t in transactions]

@router.post("/transactions/upload")
async def upload_csv(file: UploadFile = File(...)):
  contents = await file.read()
  df = pd.read_csv(io.StringIO(contents.decode("utf-8")))
  df.columns = df.columns.str.lower().str.strip()

  db: Session = SessionLocal()
  db.query(Transaction).delete()

  transactions = []
  for i, row in df.iterrows():
    name = str(row.get("description") or row.get("name") or row.get("merchant") or "Unknown")
    amount = float(row.get("amount") or row.get("debit") or 0)
    date = str(row.get("date") or "Unknown")
    category = categorize(name)

    t = Transaction(name=name, amount=amount, date=date, category=category)
    db.add(t)
    transactions.append({"id": i + 1, "name": name, "amount": amount, "date": date, "category": category})
  
  db.commit()
  db.close()
  
  return {"transactions": transactions, "count": len(transactions)}
              