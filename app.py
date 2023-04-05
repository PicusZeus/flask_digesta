from flask import Flask, request
from db import db
from flask_smorest import abort
app = Flask(__name__)

authors = {
    "justinianus": 1,
    "gaius": 2
}

texts = {1: "abc", 2: 'cdb'}


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
