
# APIS for the charts
from datetime import datetime
from main import mongo_db
from helpers.custom_messages import internal_message

import time


class ChartsHelpers:
    @staticmethod
    def daily_data(user_id):
        user_col = mongo_db.users.find_one({'username': user_id})

        if user_col != None:
            today = datetime.now()
            timestamps = user_col['timestamps'][str(today.year)][str(today.month)][str(today.day)]

            total_seconds = 0
            timestamps_data = []

            # We get the total seconds
            for timestamp in timestamps:
                if timestamp['stopped'] == "":
                    total_seconds += time.time() - timestamp['created']['utc']
                else:
                    total_seconds += timestamp['stopped'] - timestamp['created']['utc']
            
            for timestamp in timestamps:
                timestamp_seconds = 0

                if timestamp['stopped'] == "":
                    timestamp_seconds += time.time() - timestamp['created']['utc']
                else:
                    timestamp_seconds += timestamp['stopped'] - timestamp['created']['utc']
                
                timestamps_data.append({
                    'name': timestamp['label'],
                    'color': timestamp['color'],
                    'value': int(round((timestamp_seconds / total_seconds) * 100))
                })
            return internal_message(
                success=True, 
                message="Data retrieved", 
                data={'timestamps': timestamps_data, 'total_seconds': total_seconds}
            )


    @staticmethod
    def monthly_data(user_id):
        pass

    