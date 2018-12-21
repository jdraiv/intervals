
from sanic.response import json
from functools import wraps


def jwt_required():
    def decorator(f):
        @wraps(f)
        async def decorated_function(request, *args, **kwargs):
            jwt_cookie = request.cookies.get('intervals_jwt')


            if jwt_cookie == None:
                return json({'status': 'Not authorized'})
            else:
                response = await f(request, *args, **kwargs)
                return response

        return decorated_function
    return decorator


# Todas las noches bajo la via lactea parecen eternas si tu no estas!
