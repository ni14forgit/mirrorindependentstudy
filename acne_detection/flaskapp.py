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
    #print("LOL")
    #print(imagestring)
    sequence(imagestring)
    response = jsonify({"about":"hi"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

def sequence(image):
    clearfolder("nonML/data/")
    convertbase64_store(image, "nishant", "nonML/data/demo_images/")
    skin_retrieve()
    convolution_manager()
    send_to_react()





if __name__ == "__main__":
    app.run(debug = True)

