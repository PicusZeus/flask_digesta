from flask import abort
from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import CommentModel, DigestaParagraphusModel, LikeModel
from db import db
from schemas import CommentSaveSchema, CommentSchema, CommentUpdateSchema, \
    PlainCommentSchema, DeleteResponseSchema, CommentedParagraphiSchema, LikeSaveSchema
from datetime import datetime
from sqlalchemy import or_
from sqlalchemy.sql.expression import false

blp = Blueprint("Comments", "comments", description="Operations on comments")


@blp.route("/comments")
class AllCommentsByUser(MethodView):
    @jwt_required()
    @blp.response(200, CommentSchema(many=True))
    def get(self):
        user_id = get_jwt_identity()
        comments = CommentModel.query.filter(CommentModel.user_id == user_id).all()

        return comments


@blp.route("/comment/<int:comment_id>")
class Comment(MethodView):

    @jwt_required()
    @blp.response(200, CommentSchema())
    def get(self, comment_id):
        user_id = get_jwt_identity()
        if user_id == 1:
            comment = CommentModel.query.filter(CommentModel.id == comment_id).first()
            return comment
        else:
            abort(401)

    @jwt_required()
    @blp.arguments(CommentUpdateSchema())
    def put(self, data, comment_id):
        user_id = get_jwt_identity()
        com = CommentModel.query.filter(CommentModel.id == comment_id, CommentModel.user_id == user_id).first()

        if com:
            comment_content = data["comment"]
            date = datetime.now()
            com.comment = comment_content
            com.date = date
            db.session.commit()

            return {"message": "Comment updated successfully"}, 200
        return {"message": user_id}, 403

    @jwt_required()
    @blp.response(200, DeleteResponseSchema())
    def delete(self, comment_id):
        user_id = get_jwt_identity()
        comment = CommentModel.query.filter(CommentModel.id == comment_id, CommentModel.user_id == user_id).first()

        if comment:
            db.session.delete(comment)
            db.session.commit()
            newCommentedParagraphi = DigestaParagraphusModel.query.filter(
                DigestaParagraphusModel.comments.any(user_id=user_id))
            return {"status": 200, "message": "Item deleted.", "commentedParagraphi": newCommentedParagraphi}

        return {"status": 204, "message": "No such comment or user privilege required."}


@blp.route("/comment/commented")
class CommentedParagraphs(MethodView):

    @jwt_required()
    @blp.response(200, CommentedParagraphiSchema(many=True))
    def get(self):
        user_id = get_jwt_identity()
        paragraphi = DigestaParagraphusModel.query.filter(DigestaParagraphusModel.comments.any(user_id=user_id))
        # access_token = create_access_token(identity=user_id, fresh=True)

        return paragraphi


@blp.route("/comment/paragraphus/<int:paragraphus_id>")
class CommentByLex(MethodView):

    @jwt_required(optional=True)
    @blp.response(200, PlainCommentSchema(many=True))
    def get(self, paragraphus_id):
        user_id = get_jwt_identity()
        comments = CommentModel.query \
            .filter(CommentModel.paragraphus_id == paragraphus_id) \
            .filter(or_(CommentModel.private == false(), CommentModel.user_id == user_id)).all()
        return comments

    @jwt_required()
    @blp.arguments(CommentSaveSchema())
    @blp.response(200, CommentSchema())
    def post(self, data, paragraphus_id):
        user_id = get_jwt_identity()
        comment_content = data["comment"]
        private = data["private"]
        reply_to_comment_id = data["reply_to_comment_id"]
        date = datetime.now()

        comment = CommentModel(comment=comment_content,
                               user_id=user_id,
                               private=private,
                               date=date,
                               paragraphus_id=paragraphus_id,
                               reply_to_comment_id=reply_to_comment_id)
        # paragraphus = DigestaParagraphusModel.query.filter_by(id=paragraphus_id).first()
        db.session.add(comment)
        db.session.commit()

        return comment


@blp.route("/like")
class Likes(MethodView):

    @jwt_required()
    @blp.arguments(LikeSaveSchema())
    def post(self, data):
        user_id = get_jwt_identity()
        comment_id = data["comment_id"]
        if comment_id is None or user_id is None:
            return {'error': 'post_id and user_id are required'}, 400

        liked = LikeModel.query.filter(LikeModel.comment_id == comment_id, LikeModel.user_id == user_id).first()
        if liked:
            db.session.delete(liked)
            db.session.commit()
            return {'message': 'Post unliked!'}
        else:
            like = LikeModel(comment_id=comment_id, user_id=user_id)

            db.session.add(like)
            db.session.commit()
            return {'message': 'Post liked!'}

