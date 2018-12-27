

# RUN RUN

from sanic import Sanic
from sanic.response import json, html, text
from sanic.websocket import WebSocketProtocol

# Templates
from jinja2 import Environment, PackageLoader

# Database
from pymongo import MongoClient

from secret import DB_URL


from passlib.context import CryptContext

pwd_context = CryptContext(
        schemes=["pbkdf2_sha256"],
        default="pbkdf2_sha256",
        pbkdf2_sha256__default_rounds=30000
)

# Importing blueprints

views_env = Environment(loader=PackageLoader('main', 'templates'))
app = Sanic()

# Static files setup
app.static('/static', './static')

# Database setup
mongo_app = MongoClient(DB_URL)
mongo_db =  mongo_app['intervals']

# Blueprints
from blueprints.authentication.auth import auth_module
from blueprints.dashboard.dashboard import dashboard_module

# Registering blueprints
app.blueprint(auth_module)
app.blueprint(dashboard_module)

# Imports after blueprints
from blueprints.authentication.decorators import jwt_required


@app.route('/')
async def homepage(request):
    return json({'view': 'homepage'})


@app.route('/dashboard')
@jwt_required()
async def tester(request):
    template = views_env.get_template('dashboard.html')
    html_content = template.render()

    return html(html_content)


@app.websocket('/time_tracker')
async def dashboard(request, ws):
    while True:
        data = await ws.recv()
        print('Received: ' + data)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, protocol=WebSocketProtocol, debug=True)
