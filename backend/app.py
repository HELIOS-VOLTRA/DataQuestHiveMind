from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return jsonify({
        "message": "Backend is working!"
    })


@app.route("/api/test")
def test():
    return jsonify({
        "success": True,
        "message": "Hello from Python backend!"
    })


if __name__ == "__main__":
    app.run(debug=True)