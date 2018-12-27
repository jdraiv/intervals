
# This class verifies if the username is available.
# If the user is available, the user information is stored in the DB.

from main import mongo_db, pwd_context

class RegUser:
    def __init__(self, username, password):
        self.username = username
        self.password = password

    def available_user(self):
        if mongo_db.users.find_one({'username': self.username}) == None:
            return True
        return False

    def create_user(self):
        if self.available_user():
            user_structure = {
            'username': self.username,
            'password': pwd_context.encrypt(self.password),
            'timestamps': [],
            'labels': [{"name": "Untracked", "color": "#ffc168"}]
            }
            # We store the user data
            mongo_db.users.insert_one(user_structure)
            return {'status': 'Success', 'message': 'User created!'}
        return {'status': 'error', 'message': 'The username is not available'}
