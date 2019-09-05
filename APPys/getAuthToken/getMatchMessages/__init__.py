import logging
import json
import re
import requests
import robobrowser
import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request for match data.')

    token = req.params.get('token')
    match_id = req.params.get('match_id')
    if not token or not match_id:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            token = req_body.get('token')
            match_id = req_body.get('match_id')

    if token and match_id:
        headers = {
            'app_version': '6.9.4',
            'platform': 'ios',
            "content-type": "application/json",
            "User-agent": "Tinder/7.5.3 (iPhone; iOS 10.3.2; Scale/2.00)",
            "Accept": "application/json",
            "X-Auth-Token": token
        }
        url = 'https://api.gotinder.com/v2/matches/'+ str(match_id)+"/messages?count=20"
        matchData = requests.get(url, headers=headers)
        messageData= matchData.json()["data"]["messages"]
        return func.HttpResponse(json.dumps(messageData), status_code=200)
    else:
        return func.HttpResponse(
             "Please pass a token and match_id on the query string or in the request body",
             status_code=400
        )
