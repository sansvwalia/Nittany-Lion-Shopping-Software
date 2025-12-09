from flask import Blueprint, jsonify
from app.db import get_db

products_bp = Blueprint("product", __name__)

@products_bp.get("/")
def list_products():

    db = get_db()
    rows = db.execute("SELECT * FROM Product").fetchall()
    return jsonify([dict(r) for r in rows])

@products_bp.route("/seller/<email>", methods=["GET"])
def get_products_for_seller(email):
    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        """
        SELECT p.ProductID, p.Name, p.Description, p.Price, p.Quantity
        FROM Product p
        JOIN Seller s ON p.BusinessID = s.BusinessID
        WHERE s.UserEmail = ?
        """,
        (email,),
    )
    products = [dict(row) for row in cursor.fetchall()]
    return jsonify(products)
