from flask import Blueprint, jsonify
from app.db import get_db

tag_bp = Blueprint("tag", __name__)

@tag_bp.get("/")
def list_tag():
    db = get_db()
    rows = db.execute("SELECT * FROM Tag").fetchall()
    return jsonify([dict(r) for r in rows])