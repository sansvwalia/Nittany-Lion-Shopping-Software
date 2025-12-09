from flask import Blueprint, jsonify
from app.db import get_db

orders_bp = Blueprint("orders", __name__)

@orders_bp.get("/")
def list_orders():
    db = get_db()
    rows = db.execute("SELECT * FROM Orders").fetchall()
    return jsonify([dict(r) for r in rows])

@orders_bp.route("/seller/<email>", methods=["GET"])
def get_orders_for_seller(email):
    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        """
        SELECT o.OrderID, o.Quantity, o.DateCreated, b.BuyerEmail AS buyer,
               p.Name AS product, p.Price AS price
        FROM Orders o
        JOIN Product p ON o.ProductID = p.ProductID
        JOIN Seller s ON p.BusinessID = s.BusinessID
        JOIN Buyer b ON o.TransactionID = b.BuyerEmail
        WHERE s.UserEmail = ?
        ORDER BY o.DateCreated DESC
        """,
        (email,),
    )
    orders = [dict(row) for row in cursor.fetchall()]
    return jsonify(orders)
