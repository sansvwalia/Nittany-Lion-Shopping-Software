from flask import Blueprint, jsonify
from app.db import get_db

sellers_bp = Blueprint("seller", __name__)

@sellers_bp.get("/")
def list_seller():
    db = get_db()
    rows = db.execute("SELECT * FROM Seller").fetchall()
    return jsonify([dict(r) for r in rows])
