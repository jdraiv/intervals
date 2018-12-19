
# This class verifies if the username is available.
# If the user is available, the user information is stored in the DB.

from main import mongo_app

class RegUser:
    def __init__(self, username, password):
        self.username = username
        self.password = password

    def available_user(self):
        pass

    def create_user(self):
        pass
