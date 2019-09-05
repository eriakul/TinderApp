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
    message = req.params.get('message')
    if not token or not match_id or not message:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            token = req_body.get('token')
            match_id = req_body.get('match_id')
            message = req_body.get('message')

    if token and match_id and message:
        headers = {
            'app_version': '6.9.4',
            'platform': 'ios',
            "content-type": "application/json",
            "User-agent": "Tinder/7.5.3 (iPhone; iOS 10.3.2; Scale/2.00)",
            "Accept": "application/json",
            "X-Auth-Token": token
        }
        url = 'https://api.gotinder.com/user/matches/'+str(match_id)
        msg = {"message": message}
        response = requests.post(url, headers=headers, data=json.dumps(msg))
        return func.HttpResponse(json.dumps(response.json()), status_code=200)

    else:
        return func.HttpResponse(
             "Please pass a message, token and match_id on the query string or in the request body",
             status_code=400
        )
