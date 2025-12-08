from flask import Blueprint, jsonify
from app.db import get_db

products_bp = Blueprint("product", __name__)

@products_bp.get("/")
def list_products():
    
    db = get_db()
    rows = db.execute("SELECT * FROM Product").fetchall()
    return jsonify([dict(r) for r in rows])