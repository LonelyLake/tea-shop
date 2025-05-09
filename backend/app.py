from flask import Flask, jsonify
from flask_cors import CORS  # Чтобы фронтенд мог делать запросы

app = Flask(__name__)
CORS(app)  # Разрешаем запросы с любого домена (для теста)

teas = [
    {"id": 1, "name": "Зелёный чай", "price": 300},
    {"id": 2, "name": "Чёрный чай", "price": 250},
    {"id": 3, "name": "Улун", "price": 400}
]

@app.route("/api/teas")
def get_teas():
    return jsonify(teas)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)