from flask import Blueprint, jsonify
from app.db import get_db

helpdesk_bp = Blueprint("helpdesk_table", __name__)

@helpdesk_bp.get("/")
def list_helpdesk():
    db = get_db()
    rows = db.execute("SELECT * FROM Help_Desk").fetchall()
    return jsonify([dict(r) for r in rows])