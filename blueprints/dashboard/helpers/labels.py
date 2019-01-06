
from main import mongo_db
from helpers.custom_messages import internal_message


class LabelsHelpers:
    @staticmethod
    def store_label(user_id, label_name, label_color):
        user_col = mongo_db.users.find_one({'username': user_id})

        if user_col != None:
            try:
                mongo_db.users.update({'username': user_id}, {"$push": {'labels': {'name': label_name, 'color': label_color}}})
                return internal_message(success=True, message="Label has been stored")
            except:
                return internal_message(success=False, message="Unknown error")
        else:
            return internal_message(success=False, message="Unknown user")
    
    def delete_label():
        pass

    def get_labels(user_id):
        user_col = mongo_db.users.find_one({'username': user_id})

        if user_col != None:
            return internal_message(success=True, message='Retrieved data', data=user_col['labels'])
        else:
            return internal_message(success=False, message="Unknown error")
    