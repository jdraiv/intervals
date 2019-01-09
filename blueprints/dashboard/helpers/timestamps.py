
from main import mongo_db
from helpers.custom_messages import internal_message
from datetime import datetime
import time

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
                    'day': today.day,
                    'utc': time.time()
                },
                'stopped': ""
                }

            mongo_db.users.update({"username": user_id}, {"$push": {"timestamps.%s.%s" % (today.year, today.month): timestamp_data}})
            return internal_message(success=True, message='Timestamp stored')
        return internal_message(success=False, message='None')
    
    @staticmethod
    def end_timestamp(user_id):
        user_col = mongo_db.users.find_one({'username': user_id})
        today = datetime.today()

        if user_col != None:
            timestamps_list = user_col['timestamps']

            mongo_db.users.update({"username": user_id}, {"$set": {"timestamps.%s.%s.%s.stopped" % (today.year, today.month, len(timestamps_list[str(today.year)]) - 1): time.time()}})
            return internal_message(success=True, message="Updated timestamp")
        return internal_message(success=False, message="None")

    """ Returns information about the last stored timestamp """
    @staticmethod
    def last_timestamp(user_id):
        user_col = mongo_db.users.find_one({'username': user_id})
        today = datetime.today()

        if user_col != None:
            try:
                timestamps = user_col['timestamps'][str(today.year)][str(today.month)]
                last_timestamp = timestamps[len(timestamps) - 1]

                if last_timestamp['stopped'] == "":
                    # Get total elapsed seconds
                    elapsed_secs = int(time.time()) - int(last_timestamp['created']['utc'])

                    expired = "true" if elapsed_secs >= 86400 else "false"

                    return internal_message(
                        success=True,
                        message="Last timestamp acquired", 
                        data={
                            'expired': expired,
                            'elapsed_secs': elapsed_secs,
                            'label': last_timestamp['label']
                        })
            except:
                return internal_message(success=False, message="No timestamps data")