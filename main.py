

# RUN RUN

from sanic import Sanic
from sanic.response import json
from sanic.websocket import WebSocketProtocol

app = Sanic()

@app.route('/')
async def homepage(request):
    return json({'view': 'homepage'})

"""
@app.websocket('/dashboard')
async def dashboard(request, ws):
    while True:
        data = 'Hello'
        print('Sending: ' + data)
        await ws.send(data)
        data = await ws.recv()
        print('Received: ' + data)
"""


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, protocol=WebSocketProtocol)
