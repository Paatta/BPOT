from flask import Flask
from config import Config
from extensions import db, migrate, jwt
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(
        app,
        origins=[
            "http://localhost:5173",
        ],
        supports_credentials=True,
        allow_headers=["Authorization", "Content-Type"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    )

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    import models
    from routes import register_routes
    register_routes(app, url_prefix="/api")
    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)