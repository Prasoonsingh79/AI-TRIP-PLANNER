from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Use DATABASE_URL from environment; fallback to SQLite for local development
raw_url = os.getenv("DATABASE_URL", "sqlite:///./dev.db")

# Neon/Postgres requires SSL. If it's a postgres URL and doesn't specify sslmode, add it.
if raw_url.startswith("postgresql") and "sslmode=" not in raw_url:
    SQLALCHEMY_DATABASE_URL = f"{raw_url}?sslmode=require"
else:
    SQLALCHEMY_DATABASE_URL = raw_url

# For SQLite, we need 'check_same_thread': False
engine_args = {"check_same_thread": False} if SQLALCHEMY_DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args=engine_args)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
