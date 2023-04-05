from flask import Flask, request, jsonify
from db import db
from flask_smorest import abort, Api
from flask_jwt_extended import JWTManager
app = Flask(__name__)
from flask_migrate import Migrate
from dotenv import load_dotenv

import os

from db import db
import models
from schemas import AuthorSchema, DigestaBookSchema, DigestaParagraphSchema, DigestaSectionSchema, OperaSchema




@app.get("/authors")
def get_authors():
    return {"authors": authors}


@app.post("/authors")
def get_authors_works():
    author = request.get_json()
    if author["author"] in authors:
        return texts[author["author"]], 201
    else:
        abort(404, message="author not found")


if __name__ == "__main__":
    db.init_app(app)
    app.run(port=5050, debug=True)
