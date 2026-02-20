from flask import Blueprint

from flask import Blueprint

# Initialize blueprints
def register_routes(app, url_prefix):
    
    from routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix=url_prefix)

    from routes.product_routes import product_bp
    app.register_blueprint(product_bp, url_prefix=url_prefix)
    