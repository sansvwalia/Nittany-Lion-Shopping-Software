from flask import Blueprint, jsonify
from app.db import get_db

buyer_bp = Blueprint("buyer", __name__)

@buyer_bp.get("/")
def list_buyer():
    db = get_db()
    rows = db.execute("SELECT * FROM Buyer").fetchall()
    return jsonify([dict(r) for r in rows])