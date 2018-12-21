from cryptography.fernet import Fernet
from secret import APP_KEY
import jwt

class TokenDecoder:
    @staticmethod
    def decode_jwt(json_token):
        return jwt.decode(json_token, APP_KEY, algorithms='HS256')

    @staticmethod
    def decode_rtk(user_key, rtk):
        cipher_suite = Fernet(user_key)
        return eval(cipher_suite.decrypt(str.encode(rtk)).decode("utf-8"))
