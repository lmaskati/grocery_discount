from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
import time 
app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*"}})

@app.route("/")
def hello():
	time.sleep(2)
	return jsonify([{"name":"peanuts","discount":7,"old_price":8}, {"name":"orange","discount":4,"old_price":3}])
	
