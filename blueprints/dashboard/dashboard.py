
# APIS for the Intervals dashboard

from sanic import Blueprint
from sanic.response import json, text

from blueprints.authentication.decorators import jwt_required
from blueprints.authentication.helpers.token_decoder import TokenDecoder

from .helpers.labels import LabelsHelpers
from helpers.custom_messages import json_message

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
    user_identity = TokenDecoder.decode_jwt(request.cookies.get('intervals_jwt'))['username']

    label = request.json.get('name')
    color = request.json.get('color')
    print(label)
    print(color)

    process_info = LabelsHelpers.store_label(user_identity, label, color)

    if process_info['success']:
        return json_message("success", "Label created")
    else:
        return json_message("error", process_info['message'])

@dashboard_module.route('/get_labels', methods=['GET'])
@jwt_required()
async def get_labels(request):
    user_identity = TokenDecoder.decode_jwt(request.cookies.get('intervals_jwt'))['username']

    process_info = LabelsHelpers.get_labels(user_identity)

    if process_info['success']:
        return json_message(status="success", data=process_info['data'])
    else:
        return json_message(status="error", message="Unknown error")


