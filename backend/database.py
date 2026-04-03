from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:Udonscola99$@localhost:5432/financeapp"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Transaction(Base):
  __tablename__ = "transactions"
  id = Column(Integer, primary_key=True, index=True)
  name = Column(String)
  category = Column(String)
  amount = Column(Float)
  date = Column(String)

def init_db():
  Base.metadata.create_all(bind=engine)