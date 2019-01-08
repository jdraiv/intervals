
from main import mongo_db
from helpers.custom_messages import internal_message
from datetime import datetime


class TimestampsHelpers:
    @staticmethod
    def store_timestamp(user_id, label):
        user_col = mongo_db.users.find_one({'username': user_id})
        today = datetime.today()

        if user_col != None:
            timestamps_list = user_col['timestamps']
            timestamp_data = {
                'label': label,
                'created': {
                    'month': today.month,
                    'day': today.day,
                    'utc': today.timestamp()
                },
                'stopped': ""
                }


            mongo_db.users.update({"username": user_id}, {"$push": {"timestamps.%s" % today.year: timestamp_data}})
            return internal_message(success=True, message='Timestamp stored')
        return internal_message(success=False, message='None')
    
    @staticmethod
    def end_timestamp(user_id):
        user_col = mongo_db.users.find_one({'username': user_id})
        today = datetime.today()

        if user_col != None:
            timestamps_list = user_col['timestamps']

            mongo_db.users.update({"username": user_id}, {"$set": {"timestamps.%s.%s.stopped" % (today.year, len(timestamps_list[str(today.year)]) - 1): today.timestamp()}})
            return internal_message(success=True, message="Updated timestamp")
        return internal_message(success=False, message="None")
