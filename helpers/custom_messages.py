from sanic.response import json

"""
This function is used to return information to the customer.
"""
def json_message(status=str, message=str, data='None'):
    return json({'status': status, 'message': message, 'data': data})

"""
This function is for internal processes only. The success paramater must be boolean.
"""
def internal_message(success=bool, message='None', data=None):
    return {'success': success, 'message': message, 'data': data}

