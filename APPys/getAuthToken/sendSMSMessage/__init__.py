import logging
import requests
import json
import azure.functions as func

CODE_REQUEST_URL = "https://graph.accountkit.com/v1.2/start_login?access_token=AA%7C464891386855067%7Cd1891abb4b0bcdfa0580d9b839f4a522&credentials_type=phone_number&fb_app_events_enabled=1&fields=privacy_policy%2Cterms_of_service&locale=fr_FR&phone_number=#placeholder&response_type=token&sdk=ios"
TOKEN_URL = "https://api.gotinder.com/v2/auth/login/accountkit"

HEADERS = {'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_5 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D60 AKiOSSDK/4.29.0'}

def sendCode(number):
    URL = CODE_REQUEST_URL.replace("#placeholder", number)
    r = requests.post(URL, headers=HEADERS, verify=False)
    print(r.url)
    response = r.json()
    if(response.get("login_request_code") == None):
        return False
    else:
        return response["login_request_code"]


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    number = req.params.get('number')
    if not number:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            number = req_body.get('number')

    if number:
        try:
            response = sendCode(number)
        except:
            return func.HttpResponse(f"Error encountered in code.", status_code=500)

        if response:
            return func.HttpResponse(json.dumps(response), status_code=400)
        else:
            return func.HttpResponse(f"No response.", status_code=500)
            
    else:
        return func.HttpResponse(
             "Please pass a number on the query string or in the request body",
             status_code=400
        )
