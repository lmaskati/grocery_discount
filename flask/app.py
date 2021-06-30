from flask import Flask, Response
from flask import request, jsonify
from flask_cors import CORS
from discount import *
import time 
app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

@app.route("/")
def hello():
	return jsonify(get_cold_storage())
