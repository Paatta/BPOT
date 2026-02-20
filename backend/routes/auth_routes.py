from flask import Blueprint, request, jsonify
from extensions import db
from models.user import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from utils.token import generate_verification_token, confirm_verification_token
from utils.email import send_email


auth_bp = Blueprint("auth", 
                    __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    
    first_name = data.get("first_name", "")
    last_name = data.get("last_name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role","buyer")

    if not email or not password:
        return jsonify({"error":"Email and password are required"})
    
    if User.query.filter_by(email=email).first():
        return jsonify({"error":"User already exists."})
    
    hashed_password = generate_password_hash(password)

    user = User(
        first_name = first_name,
        last_name=last_name,
        email=email,
        password_hash=hashed_password,
        role=role
    )

    db.session.add(user)
    db.session.commit()

    verification_token = generate_verification_token(user.email)
    verification_link = f"http://127.0.0.1:5000/api/verify/{verification_token}"

    send_email(
        (first_name+last_name),
        user.email,
        verification_link
    )

    return jsonify({
            "status": 201,
            "message": "User was registered successfully. Please check your email to verify your account"
        }), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    
    # if (data.first_name):
    #     first_name = data.first_name

    # last_name = data.last_name
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "status": 404,
            "error":"No user found, please sign up"
        }),404
    
    if not check_password_hash(user.password_hash, password):
        return jsonify({
            "status": 401,
            "error": "Invalid credentials"
        }), 401
    
    user_name = (user.first_name +' '+ user.last_name if user.first_name != None else user.last_name)

    if not user.is_verified:
        verification_token = generate_verification_token(user.email)
        verification_link = f"http://127.0.0.1:5000/api/verify/{verification_token}"
        

        send_email(
            user_name,
            user.email,
            verification_link
        )

        return jsonify({
            "status": 401,
            "error": "Please verify your email, verification email has been sent to your inbox"
        })
    
    jwt = create_access_token(
        identity = str(user.id),
        additional_claims={
            "role": user.role,
            "user_name": user_name
        }
    )

    return jsonify({
        "status": 200,
        "access_token": jwt,
        "message": "Login successful"
    }), 200

@auth_bp.route("/verify/<token>", methods=["GET"])
def verify_email(token):
    
    email = confirm_verification_token(token)

    if not email:
        return jsonify({
            "status":400,
            "error":"Invalid or expired token"
        }), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "status":404,
            "error":"User not found"
        }), 404
    
    if user.is_verified:
        return jsonify({
            "staus": 208,
            "message": "Email already verified"
        }), 208
    
    user.is_verified = True
    db.session.commit()

    return jsonify({
        "status": 200,
        "message": "Email verfied successfully"
    }), 200