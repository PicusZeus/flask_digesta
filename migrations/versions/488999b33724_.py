"""empty message

Revision ID: 488999b33724
Revises: e828aca0c920
Create Date: 2023-04-18 12:52:34.552499

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '488999b33724'
down_revision = 'e828aca0c920'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_table('comments')
    op.create_table('comments',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('comment', sa.Text(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('lex_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['lex_id'], ['digesta_leges.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )


def downgrade():
    pass
