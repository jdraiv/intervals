
from sanic.response import json, html, text
from sanic import Blueprint
from functools import wraps

# Local directory imports
from .helpers.reg_user import RegUser
from .helpers.can_login import CanLogin
from .helpers.token_generator import TokenGenerator
from .helpers.token_decoder import TokenDecoder

# Decorators
from .decorators import jwt_required

# We import the sanic app to initialize the authentication system
from main import app, views_env

auth_module = Blueprint('auth_blueprint')

# Authentication handler decorators

@auth_module.route('/login', methods=['POST'])
async def log_user(request):
    username = request.json.get('username')
    password = request.json.get('password')

    credentials_status = CanLogin(username, password).check_credentials()

    if credentials_status['status'] == "success":
        # Generate tokens
        json_token = TokenGenerator.generate_jwt(username)
        refresh_token = TokenGenerator.generate_rtk(credentials_status['user_key'], username)

        # Store tokens in HTTP only cookies
        response = json({'status': 'success'})
        response.cookies['intervals_jwt'] = json_token
        response.cookies['intervals_jwt']['httponly'] = True
        response.cookies['intervals_rtk'] = refresh_token
        response.cookies['intervals_rtk']['httponly'] = True

        return response
    return json(credentials_status)


@auth_module.route('/signup', methods=['POST'])
async def register(request):
    username = request.json.get('username')
    password = request.json.get('password')

    return json(RegUser(username, password).create_user())

# View routes
@auth_module.route('/get_started')
async def auth_view(request):
    template = views_env.get_template('authentication.html')
    html_content = template.render()
    return html(html_content)

@auth_module.route('/get_cookies')
@jwt_required()
async def get_cookie(request):
    test_cookie = request.cookies.get('intervals_jwt')
    return text("Test cookie set to: {}".format(test_cookie))

@auth_module.route('/delete_cookies')
async def del_cookie(request):
    response = text("Cookies deleted")
    del response.cookies['intervals_jwt']
    del response.cookies['intervals_rtk']
    return response
