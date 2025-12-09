from flask import Flask
from app.routes.business_routes import business_routes

def create_app():
    app = Flask(__name__)

    # Register blueprints
    app.register_blueprint(business_routes)

    return app
