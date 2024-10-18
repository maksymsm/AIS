from flask import Flask, render_template, request, send_file
import os

app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_barcode():
    data = request.form['data']
    if not data:
        return "Невірні дані. Введіть допустимі символи."

    # Генеруємо штрих-код
    # barcode = generate_delta_barcode(data)
    # file_name = create_barcode_image(barcode)
    # return send_file(file_name, as_attachment=True)
    return 'ok'

# Завантаження зображення для декодування
@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    if file and file.filename.endswith('.png'):
        file.save(os.path.join('uploads', file.filename))
        return "Файл успішно завантажено і буде декодовано!"
    return "Невірний формат файлу. Потрібен PNG файл."

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)