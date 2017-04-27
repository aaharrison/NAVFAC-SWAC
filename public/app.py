from flask import Flask, jsonify
from flask import render_template
from flask import request
from flask import Response

import rh1mod

app = Flask(__name__) #create a variable to store an instance of the Flask class

@app.route("/")
def index():
    return(render_template("index.html"))

@app.route("/getData/")
def getData():
    return rh1mod.getData(request.args)


if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5002,debug=True,threaded=True)