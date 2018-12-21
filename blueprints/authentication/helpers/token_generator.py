from cryptography.fernet import Fernet
import jwt
from datetime import datetime

from secret import APP_KEY

def generate_timestamp(extra_seconds):
    return datetime.today().timestamp() + extra_seconds


# Do you like my tokens? They have a strong value for me :)
class TokenGenerator:
    @staticmethod
    def generate_jwt(username):
        # 10 minutes duration
        json_token = jwt.encode({'username': username, 'exp': generate_timestamp(600)}, APP_KEY, algorithm='HS256').decode("utf-8")
        return json_token

    @staticmethod
    def generate_rtk(user_key, username):
        import json

        cipher_suite = Fernet(user_key)

        user_dic = {'username': username, 'exp': generate_timestamp(604800)}

        # We convert the dictionary into a string and then convert the string to bytes for encryption
        encrypted_data = cipher_suite.encrypt(str.encode(json.dumps(user_dic))).decode("utf-8")
        return encrypted_data
