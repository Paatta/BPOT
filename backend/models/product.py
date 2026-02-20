from extensions import db

class Product(db.Model):

    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    cost_price = db.Column(db.Numeric(10,2), nullable=False)
    selling_price = db.Column(db.Numeric(10,2), nullable=False)
    category = db.Column(db.String(100), index=True)
    stock_available = db.Column(db.Integer, default = 0)
    units_sold = db.Column(db.Integer, default = 0)
    customer_rating = db.Column(db.Integer)
    demand_forecast = db.Column(db.Integer)
    optimized_price = db.Column(db.Numeric(10,2))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "cost_price": float(self.cost_price) if self.cost_price else None,
            "selling_price": float(self.selling_price) if self.selling_price else None,
            "category": self.category,
            "stock_available": self.stock_available,
            "units_sold": self.units_sold,
            "customer_rating": self.customer_rating,
            "demand_forecast": self.demand_forecast,
            "optimized_price": float(self.optimized_price) if self.optimized_price else None
        }