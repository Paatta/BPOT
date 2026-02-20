import csv
import requests

API_URL = "http://127.0.0.1:5000/api/create"
ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc3MTA2NTUwMSwianRpIjoiMzM0MmQ3ZjUtNGVmMi00N2QwLWEyZWItMjhmNzgzMDk4NjA5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjYiLCJuYmYiOjE3NzEwNjU1MDEsImNzcmYiOiJiNTliMzI4MS1jZDIxLTRhY2QtOGY5Zi1hNmI2NDAyMDliNzgiLCJleHAiOjE3NzEwNjY0MDEsInJvbGUiOiJhZG1pbiIsInVzZXJfbmFtZSI6IlByYXRlZWsgU29vZCJ9.FbAcvVQyNkoqSZc6JUH-wZoLnjtKr3aYatRwOurMqc0"   
CSV_FILE = "product_data.csv"


def seed_products():
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }
    CSV_FILE = "./product_data.csv"

    with open(CSV_FILE, newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)

        for row in reader:
            payload = {
                "name": row["name"],
                "description": row["description"],
                "cost_price": float(row["cost_price"]),
                "selling_price": float(row["selling_price"]),
                "category": row["category"],
                "stock_available": int(row["stock_available"]),
                "units_sold": int(row["units_sold"]),
                "customer_rating": int(row["customer_rating"]),
                "demand_forecast": int(row["demand_forecast"]),
                "optimized_price": float(row["optimized_price"]),
            }

            response = requests.post(API_URL, json=payload, headers=headers)

            if response.status_code == 201:
                print(f"Inserted: {row['name']}")
            else:
                print(f"Failed: {row['name']} -> {response.text}")


if __name__ == "__main__":
    seed_products()