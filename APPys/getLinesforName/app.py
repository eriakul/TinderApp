from flask import Flask
from flask import request
from flask import json
from getLinesFromReddit import *

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def getPULs():
    if request.method == 'POST':
        name = request.form['name']
        PULs = return_reddit_PULine(name)
        return json.dumps({"PULs":PULs})
