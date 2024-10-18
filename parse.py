from PIL import Image

# Таблиця відповідностей символів Delta Distance
delta_code_table = {
    '01010': '0',
    '10100': '1',
    '01001': '2',
    '01000': '3',
    '10010': '4',
    '01100': '5',
    '10001': '6',
    '10000': '7',
    '00101': '8',
    '00100': '9',
    '00110': 'K',
    '11000': 'L',
    '00010': 'M',
    '00001': 'O',
    '00000': 'START',
    '00011': 'STOP'
}


# Функція для зчитування штрих-коду із зображення
def read_barcode_image(file_name, module_width=5):
    # Завантажуємо зображення
    image = Image.open(file_name)
    pixels = image.load()
    width, height = image.size

    # Розпізнаємо білі проміжки, які несуть інформацію
    barcode = []
    current_color = pixels[0, 0]  # Початковий колір (чорний або білий)
    module_count = 0
    reading_gap = False  # Чи читаємо зараз білий проміжок

    for x in range(1, width, 5):
        color = pixels[x, 0]

        if color == (0, 0, 0):  # Чорний колір (штрих — розділювач)
            if reading_gap:
                # Визначаємо, чи короткий (0), чи довгий (1) білий проміжок
                if module_count == 3:
                    barcode.append('1')  # Довгий проміжок
                else:
                    barcode.append('0')  # Короткий проміжок

                reading_gap = False
                module_count = 0
        else:  # Білий колір (проміжок — несе інформацію)
            if not reading_gap:
                reading_gap = True
                module_count = 1
            else:
                module_count += 1

    return ''.join(barcode)


# Функція для декодування штрих-коду у вихідні дані
def decode_delta_barcode(barcode):
    # Видаляємо стартовий і стоповий символи
    barcode = barcode[6:-5]  # Знаємо, що 'START' і 'STOP' мають довжину 5 + 1 роздільний елемент

    data = []
    for i in range(0, len(barcode), 6):
        symbol_code = barcode[i:i + 5]
        if symbol_code in delta_code_table:
            data.append(delta_code_table[symbol_code])

    return ''.join(data)


# Використання модулів
file_name = "barcode.png"
barcode = read_barcode_image(file_name)
print("Зчитаний штрих-код:", barcode)

decoded_data = decode_delta_barcode(barcode)
print("Розшифровані дані:", decoded_data)
