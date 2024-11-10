# app.py
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from models import db, Product
from delta_distance import generate_delta_barcode, create_barcode_image
from parse import read_barcode_image, decode_delta_barcode
import os

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
db.init_app(app)

@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.get_json()
    name = data.get('name')
    code = data.get('code')
    price = data.get('price')

    # Check if product with the same code already exists
    existing_product = Product.query.filter_by(code=code).first()
    if existing_product:
        return jsonify({'message': 'Product with this code already exists'}), 400

    # Generate barcode image
    barcode_data = generate_delta_barcode(code)
    barcode_filename = f"{code}.png"
    barcode_path = os.path.join('uploads', barcode_filename)
    create_barcode_image(barcode_data, barcode_path)

    new_product = Product(name=name, code=code, price=price, barcode=barcode_filename)
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'message': 'Product added successfully'}), 201

@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{
        'id': product.id,
        'name': product.name,
        'code': product.code,
        'price': product.price,
        'barcode': product.barcode
    } for product in products])

@app.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify({
        'id': product.id,
        'name': product.name,
        'code': product.code,
        'price': product.price,
        'barcode': product.barcode
    })

@app.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.get_json()
    product = Product.query.get_or_404(id)
    product.name = data.get('name', product.name)
    product.code = data.get('code', product.code)
    product.price = data.get('price', product.price)
    product.barcode = data.get('barcode', product.barcode)
    db.session.commit()
    return jsonify({'message': 'Product updated successfully'})

@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'})

@app.route('/api/image/<filename>', methods=['GET'])
def get_image(filename):
    file_path = os.path.join('uploads', filename)
    if os.path.exists(file_path):
        return send_file(file_path, mimetype='image/png')
    return "File not found", 404

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    with app.app_context():
        db.create_all()
    app.run(debug=True)