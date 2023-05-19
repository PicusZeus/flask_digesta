from flask.views import MethodView
from flask_smorest import Blueprint
from db import db
from models import DigestaBookModel, AuthorModel, OpusModel
from schemas import DigestaStats


blp = Blueprint("stats", __name__, description="Operations on statistic data")



@blp.route("/stats/digesta/books")
class DigestaBooksStats(MethodView):

    @blp.response(200, DigestaStats())
    def get(self):
        jurists = AuthorModel.query.all()
        opera = OpusModel.query.all()
        books = DigestaBookModel.query.all()

        return {
            "jurists_authorship": jurists,
            "opera_coverage": opera,
            "books_share": books

        }