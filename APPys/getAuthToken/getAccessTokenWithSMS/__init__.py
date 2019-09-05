import logging
import requests
import json
import azure.functions as func

CODE_VALIDATE_URL = "https://graph.accountkit.com/v1.2/confirm_login?access_token=AA%7C464891386855067%7Cd1891abb4b0bcdfa0580d9b839f4a522&confirmation_code=#confirmation_code&credentials_type=phone_number&fb_app_events_enabled=1&fields=privacy_policy%2Cterms_of_service&locale=fr_FR&login_request_code=#request_code&phone_number=#phone_number&response_type=token&sdk=ios"
TOKEN_URL = "https://api.gotinder.com/v2/auth/login/accountkit"

HEADERS = {'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_5 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D60 AKiOSSDK/4.29.0'}

def getToken(number, code, req_code):
    VALIDATE_URL = CODE_VALIDATE_URL.replace("#confirmation_code", code)
    VALIDATE_URL = VALIDATE_URL.replace("#phone_number", number)
    VALIDATE_URL = VALIDATE_URL.replace("#request_code", req_code)
    r_validate = requests.post(VALIDATE_URL, headers=HEADERS, verify=False)
    validate_response = r_validate.json()
    access_token = validate_response["access_token"]
    access_id = validate_response["id"]
    GetToken_content = json.dumps({'token':access_token, 'id':access_id, "client_version":"9.0.1"})
    GetToken_headers = {'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_5 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D60 AKiOSSDK/4.29.0', 'Content-Type':'application/json'}
    r_GetToken = requests.post(TOKEN_URL, data=GetToken_content, headers=GetToken_headers, verify=False)
    token_response = r_GetToken.json()
    if(token_response["data"].get("api_token") == None):
        return token_response
    else:
        return token_response["data"]["api_token"]


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    number = req.params.get('number')
    code = req.params.get('code')
    req_code = req.params.get('req_code')

    if not number or not code or not req_code:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            number = req_body.get('number')
            code = req_body.get('code')
            req_code = req_body.get('req_code')


    if number and code and req_code:
        try:
            token = getToken(number, code, req_code)
        except:
            return func.HttpResponse("Error encountered in code.", status_code=500)

        if token:
            return func.HttpResponse(json.dumps(token), status_code=400)
        else:
            return func.HttpResponse("No response.", status_code=500)
            
    else:
        return func.HttpResponse(
             "Please pass a number, code and req_body on the query string or in the request body",
             status_code=400
        )
