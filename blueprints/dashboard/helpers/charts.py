
# APIS for the charts
from datetime import datetime

from main import mongo_db
from helpers.custom_messages import internal_message


class ChartsHelpers:
    @staticmethod
    def daily_data(user_id):
        user_col = mongo_db.users.find_one({'username': user_id})

        if user_col != None:
            today = datetime.now()
            data = user_col['timestamps'][str(today.year)][str(today.month)][str(today.day)]
            return internal_message(success=True, message="Data retrieved", data=data)


    @staticmethod
    def monthly_data(user_id):
        pass

    