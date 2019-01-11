
# APIS for the Intervals dashboard

from sanic import Blueprint
from sanic.response import json, text

from blueprints.authentication.decorators import jwt_required
from blueprints.authentication.helpers.token_decoder import TokenDecoder

from .helpers.labels import LabelsHelpers
from .helpers.timestamps import TimestampsHelpers
from .helpers.charts import ChartsHelpers
from helpers.custom_messages import json_message


dashboard_module = Blueprint('timestamps_module')

# This route is used to create a new timestamp. It is only used to create the object, it cannot be used to update or add the finished utc timestamp.
@dashboard_module.route('/store_timestamp', methods=['POST'])
@jwt_required()
async def store_timestamp(request):
    user_identity = TokenDecoder.decode_jwt(request.cookies.get('intervals_jwt'))['username']
    label = request.json.get('label')
    color = request.json.get('color')

    process_info = TimestampsHelpers.store_timestamp(user_identity, label, color)

    if process_info['success']:
        return json_message(status="success", message="Timestamp has been stored")
    return json_message(status="error", message="Unknown error")


@dashboard_module.route('/end_timestamp', methods=['POST'])
@jwt_required()
async def end_timestamp(request):
    user_identity = TokenDecoder.decode_jwt(request.cookies.get('intervals_jwt'))['username']

    process_info = TimestampsHelpers.end_timestamp(user_identity)

    if process_info['success']:
        return json_message(status="success", message="Updated timestamp")
    return json_message(status="error", message="Unknown error")


@dashboard_module.route('/last_timestamp', methods=['GET'])
@jwt_required()
async def last_timestamp(request):
    user_identity = TokenDecoder.decode_jwt(request.cookies.get('intervals_jwt'))['username']

    process_info = TimestampsHelpers.last_timestamp(user_identity)

    if process_info['success']:
        return json_message(status="success", message="Successful API call", data=process_info['data'])

    return json_message(status="error", message=process_info['message'])


@dashboard_module.route('/create_label', methods=['POST'])
@jwt_required()
async def create_label(request):
    user_identity = TokenDecoder.decode_jwt(request.cookies.get('intervals_jwt'))['username']

    label = request.json.get('name')
    color = request.json.get('color')

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


""" CHARTS """
@dashboard_module.route('/daily_data', methods=['GET'])
@jwt_required()
async def get_daily_data(request):
    process_info = ChartsHelpers.daily_data('Jdraiv')

    if process_info['success']:
        return json_message(status="success", message=process_info['message'], data=process_info['data'])
    return json_message(status="error")


