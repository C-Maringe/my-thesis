# Import libraries
import numpy as np
from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS
import uvicorn

app = Flask(__name__)
CORS(app)

# Load the models
NB_pickle = pickle.load(open('NB_pickle.pkl', 'rb'))
LOG_pickle = pickle.load(open('LOG_pickle.pkl', 'rb'))
KNN_pickle = pickle.load(open('KNN_pickle.pkl', 'rb'))
SVM_pickle = pickle.load(open('SVM_pickle.pkl', 'rb'))
XGB_pickle = pickle.load(open('XGB_pickle.pkl', 'rb'))

@app.route("/")
def index():
    return "Casper Maringe, Thesis Backend Service"

@app.route('/v1/api/predict', methods=['POST'])
def predict():
    # Get the data from the POST request.
    data = request.get_json(force=True)
    try:
        encripted_agent_account = data['data']['encripted_agent_account']
        city = data['data']['city']
        association = data['data']['association']
        agent_name = data['data']['agent_name']
        encripted_billid = data['data']['encripted_billid']
        payment_channels = data['data']['payment_channels']
        standardised_amount = data['data']['standardised_amount']
        previous_transaction_count = data['data']['previous_transaction_count']

        makePredictionsData = [encripted_agent_account, city, association, agent_name, encripted_billid,
                               payment_channels, standardised_amount, previous_transaction_count]

        try:
            prediction = []
            # Make prediction using model loaded from disk as per the data.
            if data['algorithim'] == 'NB':
                prediction = NB_pickle.predict([makePredictionsData])
            elif data['algorithim'] == 'LOG':
                prediction = LOG_pickle.predict([makePredictionsData])
            elif data['algorithim'] == 'KNN':
                prediction = KNN_pickle.predict([makePredictionsData])
            elif data['algorithim'] == 'SVM':
                prediction = SVM_pickle.predict([makePredictionsData])
            elif data['algorithim'] == 'XGB':
                prediction = XGB_pickle.predict([makePredictionsData])
            else:
                return {"error": "missing valid algorithim", "status": 400}

            # Take the first value of prediction
            print(prediction)
            output = prediction[0]
            if output == 1:
                return {"is_fraud": True, "status": 200}
            else:
                return {"is_fraud": False, "status": 200}
        except Exception as e:
            return jsonify({'error': str(e), "status": 500})
    except Exception as e:
        return jsonify({'error': str(e), "status": 500})


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000,debug=True)
