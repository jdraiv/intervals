

from main import mongo_db, pwd_context

class CanLogin:
    def __init__(self, username, password):
        self.username = username
        self.password =  password

    def check_credentials(self):
        user_info = mongo_db.users.find_one({'username': self.username})

        # Verifies if the credentials from a user are correct
        if user_info != None:
            if pwd_context.verify(self.password, user_info['password']):
                return {'status': 'success', 'message': 'Valid credentials'}
            return {'status': 'error', 'message': 'Invalid username or password'}
        return {'status': 'error', 'message': 'That user does not exist'}
