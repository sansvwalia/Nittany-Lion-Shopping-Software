from flask import Blueprint, jsonify
from app.db import get_db

zipcode_bp = Blueprint("zipcode", __name__)

@zipcode_bp.get("/")
def list_zipcode():
    db = get_db()
    rows = db.execute("SELECT * FROM Zipcode_Info").fetchall()
    return jsonify([dict(r) for r in rows])