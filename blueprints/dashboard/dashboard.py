
# APIS for the Intervals dashboard

from sanic import Blueprint
from sanic.response import json, text

from blueprints.authentication.decorators import jwt_required
from blueprints.authentication.helpers.token_decoder import TokenDecoder

from main import mongo_db

dashboard_module = Blueprint('timestamps_module')


@dashboard_module.route('/store_timestamp')
@jwt_required()
async def store_timestamp(request):
    user_identity = TokenDecoder.decode_jwt(request.cookies.get('intervals_jwt'))['username']
    print(user_identity)
    # label = request.json.get('label')

    response = text("Store timestamp")
    return response


@dashboard_module.route('/last_timestamp')
@jwt_required()
async def last_timestamp(request):
    user_identity = TokenDecoder.decode_jwt(request.cookies.get('intervals_jwt'))

    response = text('Last timestamp')
    return response


@dashboard_module.route('/create_label', methods=['POST'])
@jwt_required()
async def create_label(request):
    user_identity = TokenDecoder.decode_jwt(request.cookies.get('intervals_jwt'))

    label = request.json.get('label')
    color = request.json.get('color')
    print(label)
    print(color)

    response = json({'status': 'success'})
    return response
