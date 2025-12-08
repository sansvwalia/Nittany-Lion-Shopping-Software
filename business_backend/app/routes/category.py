from flask import Blueprint, jsonify
from app.db import get_db

category_bp = Blueprint("category", __name__)

@category_bp.get("/")
def list_category():
    db = get_db()
    rows = db.execute("SELECT * FROM Category").fetchall()
    return jsonify([dict(r) for r in rows])