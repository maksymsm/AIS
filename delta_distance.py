from PIL import Image, ImageDraw

# Таблиця відповідностей символів Delta Distance
delta_code_table = {
    '0': '01010',
    '1': '10100',
    '2': '01001',
    '3': '01000',
    '4': '10010',
    '5': '01100',
    '6': '10001',
    '7': '10000',
    '8': '00101',
    '9': '00100',
    'K': '00110',
    'L': '11000',
    'M': '00010',
    'O': '00001',
    'START': '00000',
    'STOP': '00011'
}


def generate_delta_barcode(data):
    barcode = delta_code_table['START'] + '1'

    for char in data:
        if char in delta_code_table:
            barcode += delta_code_table[char] + '1'

    barcode += delta_code_table['STOP']
    return barcode


def create_barcode_image(barcode, file_name="barcode.png", module_width=5, height=50):
    zeros_count = barcode.count('0')
    ones_count = barcode.count('1')
    modules_count = zeros_count  * 2 + ones_count * 4 + 1

    width = modules_count * module_width
    image = Image.new("RGB", (width, height), "white")
    draw = ImageDraw.Draw(image)

    x_position = 0
    for bit in barcode:
        draw.rectangle([x_position * module_width, 0, x_position * module_width + 5, height], fill="black")
        x_position += 1

        if bit == '1':
            x_position += 3
        else:
            x_position += 1

    draw.rectangle([x_position * module_width, 0, x_position * module_width + 5, height], fill="black")

    image.save(file_name)
    print(f"Зображення штрих-коду збережено як {file_name}")


data = "26"
barcode = generate_delta_barcode(data)
print("Згенерований штрих-код:", barcode)
create_barcode_image(barcode)
