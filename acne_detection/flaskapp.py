from flask import Flask, jsonify, request
import sys
sys.path.append("nonML/")
from rgb_face import * 
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route("/", methods = ["GET", "POST"])
def generate_face():
    imagestring = request.args.get('base64')
    initial = sequence(imagestring)
    response = jsonify({"image":initial})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def sequence(image):
    clearfolder("nonML/data/")
    convertbase64_store(image, "nishant", "nonML/data/demo_images/")
    skin_retrieve()
    convolution_manager()
    return send_to_react()





if __name__ == "__main__":
    #app.run(debug = True, host="0.0.0.0", port = "5000", threaded = True)
    app.run(host = "0.0.0.0", port = "5001",threaded = True)

