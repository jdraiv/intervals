

# RUN RUN

from sanic import Sanic
from sanic.response import json, html, text
from sanic.websocket import WebSocketProtocol

# Templates
from jinja2 import Environment, PackageLoader

# Database
from pymongo import MongoClient

from secret import DB_URL

# Importing blueprints

views_env = Environment(loader=PackageLoader('main', 'templates'))
app = Sanic()

# Static files setup
app.static('/static', './static')

# Database setup
mongo_app = MongoClient(DB_URL)

# Blueprints
from blueprints.authentication.auth import auth_module

# Registering blueprints
app.blueprint(auth_module)


@app.route('/')
async def homepage(request):
    return json({'view': 'homepage'})

@app.route('/dashboard')
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
