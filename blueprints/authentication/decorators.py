
from sanic.response import json, redirect
from functools import wraps
from datetime import datetime

from .helpers.token_generator import TokenGenerator
from .helpers.token_decoder import TokenDecoder
from .helpers.validator import TokenValidator
from .auth import token_key

# If the token has already expired, this functions returns False, else returns True
def token_active(token, token_exp):
    if datetime.today().timestamp() > token_exp:
        return False
    return True

def jwt_required():
    def decorator(f):
        @wraps(f)
        async def decorated_function(request, *args, **kwargs):
            jwt_cookie = request.cookies.get('intervals_jwt')
            refresh_token = request.cookies.get('intervals_rtk')

            # If the JWT is expired, the application generates a new access token using the refresh_token

            if jwt_cookie == None:
                return redirect('/')
            else:
                # tokens
                decoded_jwt = TokenDecoder.decode_jwt(jwt_cookie)
                decoded_rtk = TokenDecoder.decode_rtk(token_key, refresh_token)

                # If both tokens belong to the same user, we then check the expiration time of the JWT
                if TokenValidator.matching_user(decoded_jwt, decoded_rtk):
                    if TokenValidator.token_update_needed(decoded_jwt, decoded_rtk):
                        # We can generate a new JWT. Setting up new cookies for the customer.
                        response = redirect('/dashboard')
                        response.cookies['intervals_jwt'] = TokenGenerator.generate_jwt(decoded_jwt['username'])

                        response.cookies['intervals_jwt']['httponly'] = True
                        return response

                    # Everything is ok.
                    response = await f(request, *args, **kwargs)
                    return response
                return json({'status': 'error', 'message': 'Unknown error'})
        return decorated_function
    return decorator


# Todas las noches bajo la via lactea parecen eternas si tu no estas!
