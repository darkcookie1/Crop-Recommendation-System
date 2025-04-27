from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load trained model
with open("crop_model.pkl", "rb") as file:
    model = pickle.load(file)

@app.route("/")
def home():
    return "Crop Recommendation API is Running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json  # Get input from frontend
        features = np.array([[
            data["N"], data["P"], data["K"], data["temperature"],
            data["humidity"], data["ph"], data["rainfall"]
        ]])

        prediction = model.predict(features)[0]  # Predict Crop
        return jsonify({"crop": prediction})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
