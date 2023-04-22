from db import db


class CommentModel(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True)

    comment = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship("UserModel", back_populates="comments")
    private = db.Column(db.Boolean)
    date = db.Column(db.DateTime, nullable=False)
    paragraphus_id = db.Column(db.Integer, db.ForeignKey('digesta_paragraphi.id'), nullable=False)
    paragraphus = db.relationship("DigestaParagraphusModel", back_populates='comments')
    reply_to_comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=True)
    reply_to_comment = db.relationship('CommentModel', remote_side=[id])

# class TagModel(db vc.Model):
#     __tablename__ = "tags"
#
#     id = db.Column(db.Integer, primary_key=True)
#     emoji = db.Column(db.File)


