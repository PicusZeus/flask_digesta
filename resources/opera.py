from flask.views import MethodView
from flask_smorest import Blueprint


blp = Blueprint("opera", __name__, description="operations on opera jurisprudentiorum")


from models import OperaModel
from schemas import OperaSchema


@blp.route("/opera/<int:opus_id>")
class Opus(MethodView):
    @blp.response(200, OperaSchema)
    def get(self, opus_id):
        opera_data = OperaModel.query.get_or_404(opus_id)
        return opera_data

@blp.route("/opera")
class Opera(MethodView):
    @blp.response(200, OperaSchema(many=True))
    def get(self):
        opera_data = OperaModel.query.order_by(OperaModel.title_lat, OperaModel.author_id, OperaModel.book).all()
        return opera_data

@blp.route("/opera/jurist/<int:jurist_id>")
class OperaByJurist(MethodView):
    @blp.response(200, OperaSchema(many=True))
    def get(self, jurist_id):
        opera_data = OperaModel.query.filter(OperaModel.author_id == jurist_id).order_by(OperaModel.title_lat, OperaModel.book).all()
        return opera_data
