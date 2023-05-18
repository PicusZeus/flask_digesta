"""empty message

Revision ID: 330fed634b27
Revises: cc5e49a0a8df
Create Date: 2023-05-18 03:32:09.577590

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '330fed634b27'
down_revision = 'cc5e49a0a8df'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('authorships',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('author_id', sa.Integer(), nullable=True),
    sa.Column('book_id', sa.Integer(), nullable=True),
    sa.Column('authorship', sa.Float(precision=4), nullable=True),
    sa.ForeignKeyConstraint(['author_id'], ['authors.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['book_id'], ['digesta_books.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('author_id', 'book_id')
    )
    op.drop_table('_alembic_tmp_comments')
    with op.batch_alter_table('authors', schema=None) as batch_op:
        batch_op.add_column(sa.Column('authorship', sa.Float(precision=4), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('authors', schema=None) as batch_op:
        batch_op.drop_column('authorship')

    op.create_table('_alembic_tmp_comments',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('comment', sa.TEXT(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.Column('private', sa.BOOLEAN(), nullable=True),
    sa.Column('date', sa.DATETIME(), nullable=False),
    sa.Column('paragraphus_id', sa.INTEGER(), nullable=False),
    sa.Column('reply_to_comment_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['paragraphus_id'], ['digesta_paragraphi.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['reply_to_comment_id'], ['comments.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('authorships')
    # ### end Alembic commands ###
