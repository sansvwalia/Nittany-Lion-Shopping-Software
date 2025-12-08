from flask import Blueprint, jsonify
from app.db import get_db

tickets_bp = Blueprint("ticket", __name__)

@tickets_bp.get("/")
def list_tickets():
    db = get_db()
    rows = db.execute("SELECT * FROM Ticket").fetchall()
    return jsonify([dict(r) for r in rows])