from flask.views import MethodView
from flask_smorest import Blueprint


blp = Blueprint("opera", __name__, description="operations on opera jurisprudentiorum")


from models import OperaModel
from schemas import OperaSchema


@blp.route("/opera/<int:opus_id>")
class OperaView(MethodView):
    @blp.response(200, OperaSchema)
    def get(self, opus_id):
        opera_data = OperaModel.query.get_or_404(opus_id)
        return opera_data
