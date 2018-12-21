from cryptography.fernet import Fernet
import jwt

from secret import APP_KEY


# Do you like my tokens? They have a strong value for me :)
class TokenGenerator:
    @staticmethod
    def generate_jwt(username):
        json_token = jwt.encode({'username': username}, APP_KEY, algorithm='HS256').decode("utf-8")
        return json_token

    def generate_rtk(user_key, username):
        import json

        cipher_suite = Fernet(user_key)
        user_dic = {'username': username}

        # We convert the dictionary into a string and then convert the string to bytes for encryption
        encrypted_data = cipher_suite.encrypt(str.encode(json.dumps(user_dic))).decode("utf-8")
        return encrypted_data


# En un oceano de primigenio cariño grabo tu nombre!
