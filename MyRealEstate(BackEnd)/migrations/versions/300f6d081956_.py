"""empty message

Revision ID: 300f6d081956
Revises: 
Create Date: 2024-02-27 17:20:13.570211

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '300f6d081956'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('admin',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstName', sa.String(length=150), nullable=True),
    sa.Column('lastName', sa.String(length=150), nullable=True),
    sa.Column('email', sa.String(length=150), nullable=True),
    sa.Column('phoneNumber', sa.String(length=150), nullable=True),
    sa.Column('password', sa.String(length=150), nullable=True),
    sa.Column('gender', sa.String(length=150), nullable=True),
    sa.Column('address', sa.String(length=150), nullable=True),
    sa.Column('role', sa.String(length=20), nullable=False),
    sa.Column('profile_uri', sa.String(length=255), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstName', sa.String(length=150), nullable=True),
    sa.Column('lastName', sa.String(length=150), nullable=True),
    sa.Column('email', sa.String(length=150), nullable=True),
    sa.Column('phoneNumber', sa.String(length=150), nullable=True),
    sa.Column('gender', sa.String(length=150), nullable=True),
    sa.Column('address', sa.String(length=150), nullable=True),
    sa.Column('password', sa.String(length=150), nullable=True),
    sa.Column('role', sa.String(length=20), nullable=False),
    sa.Column('profile_uri', sa.String(length=255), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('property',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=150), nullable=True),
    sa.Column('description', sa.String(length=250), nullable=True),
    sa.Column('price', sa.String(length=150), nullable=True),
    sa.Column('location', sa.String(length=150), nullable=True),
    sa.Column('bedrooms', sa.String(length=150), nullable=True),
    sa.Column('bathrooms', sa.String(length=150), nullable=True),
    sa.Column('type', sa.String(length=150), nullable=True),
    sa.Column('contact', sa.String(length=150), nullable=True),
    sa.Column('images', sa.String(), nullable=True),
    sa.Column('admin_id', sa.Integer(), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['admin_id'], ['admin.id'], name='property_admin_fk'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favorite',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('admin_id', sa.Integer(), nullable=True),
    sa.Column('property_id', sa.Integer(), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['admin_id'], ['admin.id'], ),
    sa.ForeignKeyConstraint(['property_id'], ['property.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('inquiry',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('admin_id', sa.Integer(), nullable=True),
    sa.Column('property_id', sa.Integer(), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.Column('content', sa.String(length=250), nullable=True),
    sa.ForeignKeyConstraint(['admin_id'], ['admin.id'], ),
    sa.ForeignKeyConstraint(['property_id'], ['property.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('message',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('inquiry_id', sa.Integer(), nullable=True),
    sa.Column('sender_id', sa.Integer(), nullable=True),
    sa.Column('receiver_id', sa.Integer(), nullable=True),
    sa.Column('content', sa.String(length=250), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['inquiry_id'], ['inquiry.id'], ),
    sa.ForeignKeyConstraint(['receiver_id'], ['admin.id'], ),
    sa.ForeignKeyConstraint(['sender_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('message')
    op.drop_table('inquiry')
    op.drop_table('favorite')
    op.drop_table('property')
    op.drop_table('user')
    op.drop_table('admin')
    # ### end Alembic commands ###