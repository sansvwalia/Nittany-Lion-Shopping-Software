import os


class Config:
    BASE_DIR = os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
    DATABASE = os.path.join(BASE_DIR, "database", "NLionBusiness.db")
    SECRET_KEY = "devkey" 

