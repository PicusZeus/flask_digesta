from flask import Flask
from db import db
app = Flask(__name__)


if __name__ == "__main__":
    db.init_app(app)
    app.run(port=5050, debug=True)
