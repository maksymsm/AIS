from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    code = db.Column(db.String(80), nullable=False)
    price = db.Column(db.String(20), nullable=False)
    barcode = db.Column(db.String(120), nullable=True)  # Path to the barcode image

    def __repr__(self):
        return f'<Product {self.name}>'