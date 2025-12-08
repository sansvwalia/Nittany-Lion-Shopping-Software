from flask import Blueprint, jsonify
from app.db import get_db

review_bp = Blueprint("review", __name__)

@review_bp.get("/")
def list_review():
    db = get_db()
    rows = db.execute("SELECT * FROM Review").fetchall()
    return jsonify([dict(r) for r in rows])