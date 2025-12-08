from flask import Blueprint, jsonify
from app.db import get_db

orders_bp = Blueprint("orders", __name__)

@orders_bp.get("/")
def list_orders():
    db = get_db()
    rows = db.execute("SELECT * FROM Orders").fetchall()
    return jsonify([dict(r) for r in rows])