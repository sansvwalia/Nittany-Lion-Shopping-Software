from flask import Blueprint, jsonify
from app.db import get_db

transaction_bp = Blueprint("transaction", __name__)

@transaction_bp.get("/")
def list_transaction():
    db = get_db()
    rows = db.execute('SELECT * FROM Transactions').fetchall()
    return jsonify([dict(r) for r in rows])