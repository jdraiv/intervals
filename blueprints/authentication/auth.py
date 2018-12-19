
from sanic.response import json, html, text
from sanic import Blueprint

# Local directory imports
from .User import UserModel

# We import the sanic app to initialize the authentication system
from main import app, views_env

auth_module = Blueprint('auth_blueprint')


@auth_module.route('/login', methods=['POST'])
async def log_user(request):
    username = request.json.get('username')
    password = request.json.get('password')

    return json({"username": username})

@auth_module.route('/signup', methods=['POST'])
async def register(request):
    username = request.json.get('username')
    password = request.json.get('password')

    return json({"username": username})

# View routes
@auth_module.route('/get_started')
async def auth_view(request):
    template = views_env.get_template('authentication.html')
    html_content = template.render()
    return html(html_content)
