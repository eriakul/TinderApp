import logging

import azure.functions as func
import requests
import robobrowser
import json

MOBILE_USER_AGENT = "Tinder/7.5.3 (iPhone; iOS 10.3.2; Scale/2.00)"
FB_AUTH = "https://www.facebook.com/v2.6/dialog/oauth?redirect_uri=fb464891386855067%3A%2F%2Fauthorize%2F&display=touch&state=%7B%22challenge%22%3A%22IUUkEUqIGud332lfu%252BMJhxL4Wlc%253D%22%2C%220_auth_logger_id%22%3A%2230F06532-A1B9-4B10-BB28-B29956C71AB1%22%2C%22com.facebook.sdk_client_state%22%3Atrue%2C%223_method%22%3A%22sfvc_auth%22%7D&scope=user_birthday%2Cuser_photos%2Cuser_education_history%2Cemail%2Cuser_relationship_details%2Cuser_friends%2Cuser_work_history%2Cuser_likes&response_type=token%2Csigned_request&default_audience=friends&return_scopes=true&auth_type=rerequest&client_id=464891386855067&ret=login&sdk=ios&logger_id=30F06532-A1B9-4B10-BB28-B29956C71AB1&ext=1470840777&hash=AeZqkIcf-NEW6vBd"


def get_fb_access_token(email, password):
    s = robobrowser.RoboBrowser(user_agent=MOBILE_USER_AGENT, parser="lxml")
    s.open(FB_AUTH)
    f = s.get_form()
    f["pass"] = password
    f["email"] = email
    s.submit_form(f)
    f = s.get_form()
    try:
    	s.submit_form(f, submit=f.submit_fields['__CONFIRM__'])
    	return re.search(
    		r"access_token=([\w\d]+)", s.response.content.decode()).groups()[0]
    except requests.exceptions.InvalidSchema as browserAddress:
    	return re.search(
    		r"access_token=([\w\d]+)",str(browserAddress)).groups()[0]


def get_fb_id(access_token):
    if "error" in access_token:
        return {"error": "access token could not be retrieved"}
    """Gets facebook ID from access token"""
    req = requests.get(
        'https://graph.facebook.com/me?access_token=' + access_token)
    return req.json()["id"]

def get_auth_token(fb_auth_token, fb_user_id):
    if "error" in fb_auth_token:
        return {"error": "could not retrieve fb_auth_token"}
    if "error" in fb_user_id:
        return {"error": "could not retrieve fb_user_id"}
    url = 'https://api.gotinder.com/v2/auth/login/facebook'
    req = requests.post(url,
                        headers=headers,
                        data=json.dumps(
                            {'token': fb_auth_token, 'facebook_id': fb_user_id})
                        )
    try:
        tinder_auth_token = req.json()['data']['api_token']
        headers.update({"X-Auth-Token": tinder_auth_token})
        print("You have been successfully authorized!")
        return tinder_auth_token
    except Exception as e:
        print(e)
        return None



def main(req: func.HttpRequest) -> func.HttpResponse:
    
    email = req.params.get('email')
    password = req.params.get('password')

    if not email or not password:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            email = req_body.get('name')
            password = req_body.get('password')

    if email and password:
        token = get_fb_access_token(email, password)
        fb_user_id = get_fb_id(token)
        auth = get_auth_token(token, fb_user_id)
        if auth:
            return func.HttpResponse(auth)
        else:
            logging.warn("AUTHENTICATION FAILED.")
    else:
        return func.HttpResponse(
             "Please pass an email and password on the query string or in the request body",
             status_code=400
        )
