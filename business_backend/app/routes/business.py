from flask import Blueprint, jsonify
from app.db import get_db

business_bp = Blueprint("business", __name__)

@business_bp.get("/")
def list_business():
    db = get_db()
    rows = db.execute("SELECT * FROM Business").fetchall()
    return jsonify([dict(r) for r in rows])