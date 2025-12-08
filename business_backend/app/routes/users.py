from flask import Blueprint, jsonify
from app.db import get_db

users_bp = Blueprint("user", __name__)

@users_bp.get("/")
def list_users():
    db = get_db()
    users = db.execute("SELECT * FROM Registered_User").fetchall()
    return jsonify([dict(u) for u in users])