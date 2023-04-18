from db import db


class CommentModel(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship("UserModel", back_populates="comments")
    private = db.Column(db.Boolean, nullable=False)
    lex_id = db.Column(db.Integer, db.ForeignKey('digesta_leges.id'), nullable=False)
    lex = db.relationship("DigestaLexModel", back_populates='comments')

# class TagModel(db.Model):
#     __tablename__ = "tags"
#
#     id = db.Column(db.Integer, primary_key=True)
#     emoji = db.Column(db.File)


