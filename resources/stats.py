from flask.views import MethodView
from flask_smorest import Blueprint
from db import db
from models import DigestaBookModel, AuthorModel, OpusModel,\
    BookAuthorshipModel, OpusBookCoverageModel, TitulusAuthorshipModel,\
    DigestaTitulusModel, OpusTitulusCoverageModel
from schemas import DigestaStatsSchema, DigestaBookStatsSchema,\
    DigestaTitulusStatsSchema, BookShareSchema, JuristAuthorshipSchema


blp = Blueprint("stats", __name__, description="Operations on statistic data")



@blp.route("/stats/digesta/books")
class DigestaBooksStats(MethodView):

    @blp.response(200, BookShareSchema(many=True))
    def get(self):
        # jurists = AuthorModel.query.all()
        # opera = OpusModel.query.all()
        books = DigestaBookModel.query.all()

        return books

@blp.route("/stats/digesta/jurists")
class DigestaJuristsStats(MethodView):

    @blp.response(200, JuristAuthorshipSchema(many=True))
    def get(self):
        jurists = AuthorModel.query.all()
        # opera = OpusModel.query.all()
        # books = DigestaBookModel.query.all()

        return jurists

@blp.route("/stats/digesta/books/<int:book_id>")
class DigestaBooksStats(MethodView):

    @blp.response(200, DigestaBookStatsSchema())
    def get(self, book_id):
        jurists = BookAuthorshipModel.query.filter(BookAuthorshipModel.book_id==book_id).all()
        opera = OpusBookCoverageModel.query.filter(OpusBookCoverageModel.book_id == book_id).all()
        tituli = DigestaTitulusModel.query.filter(DigestaTitulusModel.book_id==book_id).all()

        return {
            "jurists_authorship": jurists,
            "opera_coverage": opera,
            "tituli_book_share": tituli

        }

@blp.route("/stats/digesta/tituli/<int:titulus_id>")
class DigestaTitulusStats(MethodView):

    @blp.response(200, DigestaTitulusStatsSchema())
    def get(self, titulus_id):
        jurists = TitulusAuthorshipModel.query.filter(TitulusAuthorshipModel.titulus_id==titulus_id).all()
        opera = OpusTitulusCoverageModel.query.filter(OpusTitulusCoverageModel.titulus_id == titulus_id).all()
        # tituli = DigestaTitulusModel.query.filter(DigestaTitulusModel.book_id==book_id).all()

        return {
            "jurists_authorship": jurists,
            "opera_coverage": opera,
        }