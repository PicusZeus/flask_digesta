"""empty message

Revision ID: 02f2bcf7ee7e
Revises: 2f06eb826d42
Create Date: 2023-04-22 12:17:29.560106

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '02f2bcf7ee7e'
down_revision = '2f06eb826d42'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_table('comments')
    op.drop_table('users')
    # op.create_table('comments',
    #                 sa.Column('id', sa.Integer(), nullable=False),
    #                 sa.Column('comment', sa.Text(), nullable=False),
    #                 sa.Column('user_id', sa.Integer(), nullable=False),
    #                 sa.Column('private', sa.Boolean(), nullable=True),
    #                 sa.Column('date', sa.DateTime(), nullable=False),
    #                 sa.Column('paragraphus_id', sa.Integer(), nullable=False),
    #                 sa.Column('reply_to_comment_id', sa.Integer(), nullable=True),
    #                 sa.ForeignKeyConstraint(['paragraphus_id'], ['digesta_paragraphi.id'], ),
    #                 sa.ForeignKeyConstraint(['reply_to_comment_id'], ['comments.id'], ),
    #                 sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    #                 sa.PrimaryKeyConstraint('id')
    #                 )
    #
    # op.create_table('users',
    #                 sa.Column('id', sa.Integer(), nullable=False),
    #                 sa.Column('username', sa.String(length=80), unique=True, nullable=False),
    #                 sa.Column('email', sa.String(), unique=True, nullable=False),
    #                 password())


def downgrade():
    pass
