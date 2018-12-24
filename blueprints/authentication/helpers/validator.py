
# Validates JSON and refresh tokens
from datetime import datetime

class TokenValidator:
    # Verifies if both tokens are from the same user
    @staticmethod
    def matching_user(jwt, rtk):
        try:
            if jwt['username'] != rtk['username']:
                return False 
            return True 
        except:
            return False

    # Verifies if a JWT is expired. If it is, a new token needs to be generated. The function verifies if the exp_time
    # of the refresh token is valid. If it is, True is returned meaning that a new token needs to be generated.
    @staticmethod
    def token_update_needed(jwt, rtk):
        if datetime.today().timestamp() > jwt['exp_date']:
            # If the refresh token is still valid
            if datetime.today().timestamp() < rtk['exp_date']:
                return True
        return False


