
# APIS for the charts
from datetime import datetime

from main import mongo_db


class ChartsHelpers:
    @staticmethod
    def daily_data(user_id):
        user_col = mongo_db.users.find_one({'username': user_id})

        if user_col != None:
            print(user_col)


    @staticmethod
    def monthly_data(user_id):
        pass

    