from flask import Blueprint, jsonify
from app.db import get_db

address_bp = Blueprint("address", __name__)

@address_bp.get("/")
def list_address():
    db = get_db()
    rows = db.execute("SELECT * FROM Address").fetchall()
    return jsonify([dict(r) for r in rows])