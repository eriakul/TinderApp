import logging
import json
import re
import requests
import robobrowser
import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request for match data.')

    token = req.params.get('token')
    if not token:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            token = req_body.get('token')

    if token:
        headers = {
            'app_version': '6.9.4',
            'platform': 'ios',
            "content-type": "application/json",
            "User-agent": "Tinder/7.5.3 (iPhone; iOS 10.3.2; Scale/2.00)",
            "Accept": "application/json",
            "X-Auth-Token": token
        }
        url = 'https://api.gotinder.com/v2/matches?count=20&message=1'
        matchData = requests.get(url, headers=headers).text
        match_dict = json.loads(matchData)
        match_list = []
        while True:
            for match in match_dict["data"]["matches"]:
                try:
                    person = {
                    "name": match["person"]["name"],
                    "_id": match["_id"],
                    "id":match["id"],
                    "dead":match["dead"],
                    "bio":match["person"]["bio"],
                    "photo":match["person"]["photos"][0]["url"]
                    }
                    match_list.append(person)
                except:
                    person = {
                    "name": match["person"]["name"],
                    "_id": match["_id"],
                    "id":match["id"],
                    "dead":match["dead"],
                    "bio":"",
                    "photo":match["person"]["photos"][0]["url"]
                    }
                    match_list.append(person)
                else:
                    pass       
            if "next_page_token" in match_dict["data"].keys():
                new_url = url+"&page_token="+str(match_dict["data"]["next_page_token"])
                matchData = requests.get(new_url, headers=headers).text
                match_dict = json.loads(matchData)
            else:
                break
        return func.HttpResponse(json.dumps(match_list), status_code=200)
    else:
        return func.HttpResponse(
             "Please pass a token on the query string or in the request body",
             status_code=400
        )
