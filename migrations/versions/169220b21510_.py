"""empty message

Revision ID: 169220b21510
Revises: 97b443b7bb3d
Create Date: 2023-05-02 10:08:54.913644

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '169220b21510'
down_revision = '97b443b7bb3d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('comment_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['comment_id'], ['comments.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('privileged', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('subscription_until', sa.DateTime(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('subscription_until')
        batch_op.drop_column('privileged')

    op.drop_table('likes')
    # ### end Alembic commands ###
