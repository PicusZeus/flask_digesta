"""empty message

Revision ID: 42e185668598
Revises: 8160028ed8e2
Create Date: 2023-04-18 15:10:34.779843

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '42e185668598'
down_revision = '8160028ed8e2'
branch_labels = None
depends_on = None


def upgrade():
    op.drop_table('comments')
    op.create_table('comments',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('comment', sa.Text(), nullable=False),
                    sa.Column('private', sa.Boolean()),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('lex_id', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['lex_id'], ['digesta_leges.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )


def downgrade():
    pass
