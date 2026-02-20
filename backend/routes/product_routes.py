from extensions import *
from flask import Blueprint, request, jsonify
from models.product import Product
from flask_jwt_extended import jwt_required, get_jwt
from utils.decorators import has_role
from decimal import Decimal
from sqlalchemy import distinct

product_bp = Blueprint("product", __name__)

@product_bp.route("/create", methods=["POST"])
@has_role(["admin"])
def create_product():
    data = request.get_json()

    product = Product(
        name = data.get("name"),
        description = data.get("description"),
        cost_price = data.get("cost_price"),
        selling_price = data.get("selling_price"),
        category = data.get("category"),
        stock_available = data.get("stock_available"),
        units_sold = data.get("units_sold"),
        customer_rating = data.get("customer_rating"),
        demand_forecast = data.get("demand_forecast"),
        optimized_price = data.get("optimized_price"),
    )

    db.session.add(product)
    db.session.commit()

    return jsonify({
        "status": 201,
        "message": "Product created successfully"
    }), 201

@product_bp.route("/update/<int:id>", methods=["PATCH"])
@has_role(["admin"])
def update_product(id):
    product = Product.query.get(id)

    if not product:
        return jsonify({
            "status": 404,
            "error": "Product not found"
        }), 404
    
    data = request.get_json()

    if not data:
        return jsonify({
            "status": 204,
            "error": "No data provided"
        }), 204
    
    ALLOWED_FIELDS = [
        "name",
        "description",
        "cost_price",
        "selling_price",
        "category",
        "stock_available",
        "units_sold",
        "customer_rating",
        "demand_forecast",
        "optimized_price"
    ]

    for field, value in data.items():
        if field in ALLOWED_FIELDS:
            if field in ["cost_price","selling_price"]:
                setattr(product, field, Decimal(str(value)))
            else:
                setattr(product, field, value)

    db.session.commit()

    return jsonify({
        "status": 200,
        "message": "Product was updated successfully"
    }), 200


@product_bp.route("/products/<int:id>", methods=["GET"])
@has_role(["admin","buyer","supplier"])
def get_product_by_id(id):
    product = Product.query.filter_by(id=id).first()

    if not product:
        return jsonify({
            "status": 400,
            "error": "No product found"
        }), 400
    
    return jsonify({
        "status": 200,
        "message": product.to_dict()
    }), 200

@product_bp.route("/products/<int:id>", methods=["DELETE"])
@has_role(["admin"])
def delete_product_by_id(id):
    product = Product.query.filter_by(id=id).first()

    if not product:
        return jsonify({
            "status":404,
            "error":"No product found"
        })
    
    db.session.delete(product)
    db.session.commit()

    return jsonify({
        "status": 200,
        "message":" Product was deleted successfully"
    })


@product_bp.route("/products", methods=["GET"])
@has_role(["admin","buyer","supplier"])
def get_products():

    products = Product.query.all()

    result = []

    for p in products:
        result.append(p.to_dict())

    return jsonify({
        "status": 200,
        "message": result
    })

@product_bp.route("/products/<category>", methods=["GET"])
@has_role(["admin","buyer","supplier"])
def filter_by_category(category):

    products = Product.query.filter_by(category=category).all()
    
    if len(products) == 0:
        return jsonify({
            "status": 404,
            "error": "No products found for the given category"
        })
    
    result = []
    for p in products:
        result.append(p.to_dict())

    return jsonify({
        "status": 200,
        "message": result
    })

@product_bp.route("/products/categories", methods=["GET"])
@has_role(["admin","buyer","supplier"])
def get_product_categories():
    categories = db.session.query(
        distinct(Product.category)
    ).order_by(Product.category).all()
    return jsonify({
        "status": 200,
        "message": [category[0] for category in categories]
    })

@product_bp.route("/products/filter", methods=["GET"])
@has_role(["admin", "buyer", "supplier"])
def filter_products():

    categories = request.args.getlist("category")
    search = request.args.get("search")

    query = Product.query

    if categories:
        query = query.filter(Product.category.in_(categories))

    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))

    products = query.all()

    return jsonify([p.to_dict() for p in products])