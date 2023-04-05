from flask.views import MethodView
from flask_smorest import abort, Blueprint
from db import stores

blp = Blueprint("authors", __name__, description="operation on authors")


blp.route("/authors/<string:author>")
class Store(MethodView):
    def get(self, author):
        pass

    def delete(self, author):
        pass
