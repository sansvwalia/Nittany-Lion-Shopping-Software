from flask import Blueprint, jsonify
from app.db import get_db

creditcards_bp = Blueprint("creditcards", __name__)

@creditcards_bp.get("/")
def list_creditcards():
    db = get_db()
    rows = db.execute("SELECT * FROM Credit_Cards").fetchall()
    return jsonify([dict(r) for r in rows])