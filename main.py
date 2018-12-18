

# RUN RUN

from sanic import Sanic
from sanic.response import json, html
from sanic.websocket import WebSocketProtocol

# Templates
from jinja2 import Environment, PackageLoader

# Database
from pymongo import MongoClient

from secret import DB_URL

env = Environment(loader=PackageLoader('main', 'templates'))
app = Sanic()

app.static('/static', './static')

mongo_app = MongoClient(DB_URL)

@app.route('/')
async def homepage(request):
    return json({'view': 'homepage'})

@app.route('/dashboard')
async def tester(request):
    template = env.get_template('dashboard.html')
    html_content = template.render()

    return html(html_content)

# Login user
@app.route('/login')
async def login(request):
    return 'Login'

# Register user
@app.post('/register')
async def register_user(request):
    return json({"status": "success"})

@app.websocket('/time_tracker')
async def dashboard(request, ws):
    while True:
        data = await ws.recv()
        print('Received: ' + data)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, protocol=WebSocketProtocol)
