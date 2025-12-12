from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os
from google import genai
from google.genai import types
from model.model import generate_mental_health_response

load_dotenv()

app = Flask(__name__)

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")

# Initialize client
client = genai.Client(api_key=api_key)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat')
def chat():
    return render_template('chat.html')

@app.route('/api/chat', methods=['POST'])
def chat_api():
    data = request.json
    user_message = data.get('message')

    if not user_message:
        return jsonify({'error': 'Thik se daal BKL'}), 400

    try:
        response = generate_mental_health_response(user_message)
        return jsonify({'response': response})
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return jsonify({'error': 'Failed to generate response'}), 500

if __name__ == '__main__':
    app.run(debug=True)
