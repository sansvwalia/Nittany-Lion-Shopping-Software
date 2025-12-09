from flask import Blueprint, request, jsonify
from app.db import get_db
from datetime import datetime

tickets_bp = Blueprint("tickets_bp", __name__)

@tickets_bp.route("/create", methods=["POST"])
def create_ticket():
    data = request.get_json()
    topic = data.get("topic")
    description = data.get("description")
    category = data.get("category", "General")
    user_email = data.get("userEmail")
    helpdesk_email = "helpdesk@nittany.com"

    if not topic or not description or not user_email:
        return jsonify({"success": False, "error": "All required fields must be filled."}), 400

    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("""
            INSERT INTO Ticket (Topic, Date_Opened, Description, Status, UserEmail, HelpDeskEmail)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            topic,
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            description,
            "Open",
            user_email,
            helpdesk_email
        ))
        db.commit()
        return jsonify({"success": True}), 201
    except Exception as e:
        print("Error creating ticket:", e)
        return jsonify({"success": False, "error": "Database error."}), 500
