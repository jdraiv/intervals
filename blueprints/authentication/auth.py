
from sanic.response import json, html, text
from sanic import Blueprint

from sanic_jwt import Initialize, exceptions, inject_user
from sanic_jwt.decorators import protected

# Local directory imports
from .User import UserModel

# We import the sanic app to initialize the authentication system
from main import app, views_env

auth_module = Blueprint('auth_blueprint')

# View routes
@auth_module.route('/get_started')
async def auth_view(request):
    template = views_env.get_template('authentication.html')
    html_content = template.render()
    return html(html_content)
