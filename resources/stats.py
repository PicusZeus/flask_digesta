from flask.views import MethodView
from flask_smorest import Blueprint
from db import db
from models import DigestaBookModel, AuthorModel, OpusModel,\
    BookAuthorshipModel, OpusBookCoverageModel, TitulusAuthorshipModel,\
    DigestaTitulusModel, OpusTitulusCoverageModel
from schemas import DigestaStatsSchema, DigestaBookStatsSchema,\
    DigestaTitulusStatsSchema, BookShareSchema, JuristAuthorshipSchema,\
    JuristBookAuthorshipSchema, JuristStatsMainSchema, JuristStatsBookSchema,\
    JuristStatsTitulusSchema, OpusCoverageSchema,\
    OpusAuthorCoverageSchema, OpusBooksStatsSchema, OpusBookStatsSchema


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

@blp.route("/stats/digesta/jurists/<int:jurysta_id>")
class DigestaJuristStats(MethodView):

    @blp.response(200, JuristStatsMainSchema())
    def get(self, jurysta_id):
        books = BookAuthorshipModel.query.filter(BookAuthorshipModel.author_id == jurysta_id).all()
        opera = OpusModel.query.filter(OpusModel.author_id==jurysta_id).all()
        jurist = AuthorModel.query.filter_by(id=jurysta_id).first()

        return {"books": books, "opera": opera, "jurist": jurist}


@blp.route("/stats/digesta/jurists/<int:jurysta_id>/<int:book_id>")
class DigestaJuristBookStats(MethodView):

    @blp.response(200, JuristStatsBookSchema())
    def get(self, jurysta_id, book_id):
        tituli = TitulusAuthorshipModel.query\
            .join(DigestaTitulusModel, DigestaTitulusModel.id == TitulusAuthorshipModel.titulus_id)\
            .filter(TitulusAuthorshipModel.author_id == jurysta_id, DigestaTitulusModel.book_id == book_id).all()
        author = AuthorModel.query.filter_by(id=jurysta_id).first()
        book = DigestaBookModel.query.filter_by(id=book_id).first()
        opera = OpusBookCoverageModel.query.join(OpusModel, OpusModel.id == OpusBookCoverageModel.opus_id)\
            .filter(OpusModel.author_id == jurysta_id, OpusBookCoverageModel.book_id == book_id).all()


        return {
            "tituli": tituli,
            "author": author,
            "book": book,
            "opera": opera

        }

@blp.route("/stats/digesta/jurists/<int:jurysta_id>/<int:book_id>/<int:titulus_id>")
class DigestaJuristTitulusStats(MethodView):
    @blp.response(200, JuristStatsTitulusSchema())
    def get(self, jurysta_id, book_id, titulus_id):
        titulus = TitulusAuthorshipModel.query\
            .filter(TitulusAuthorshipModel.titulus_id == titulus_id, TitulusAuthorshipModel.author_id == jurysta_id)\
            .first()
        author = AuthorModel.query.filter_by(id=jurysta_id).first()
        opera = OpusTitulusCoverageModel.query.join(OpusModel, OpusModel.id == OpusTitulusCoverageModel.opus_id)\
            .filter(OpusTitulusCoverageModel.titulus_id == titulus_id, OpusModel.author_id == jurysta_id).all()
        return {
            "titulus": titulus,
            "author": author,
            "opera": opera
        }


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

@blp.route("/stats/digesta/opera")
class DigestaOperaSchema(MethodView):

    @blp.response(200, OpusAuthorCoverageSchema(many=True))
    def get(self):
        opera = OpusModel.query.all()

        return opera

@blp.route("/stats/digesta/opera/<int:opus_id>")
class DigestaOpusSchema(MethodView):

    @blp.response(200, OpusBooksStatsSchema())
    def get(self, opus_id):
        books = OpusBookCoverageModel.query.filter(OpusBookCoverageModel.opus_id == opus_id).all()
        opus = OpusModel.query.filter_by(id=opus_id).first()

        return {"books": books, "opus": opus}

@blp.route("/stats/digesta/opera/<int:opus_id>/<int:book_id>")
class DigestaOpusBookSchema(MethodView):

    @blp.response(200, OpusBookStatsSchema())
    def get(self, opus_id, book_id):
        pass
