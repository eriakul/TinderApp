import logging
import azure.functions as func
import praw
import auth
from datamuse import datamuse

reddit = praw.Reddit(client_id= auth.REDDIT_CLIENT_ID,
                     client_secret= auth.REDDIT_CLIENT_SECRET,
                     user_agent= auth.REDDIT_USER_AGENT)
version = praw.__version__
def findNearNames(name):
    api = datamuse.Datamuse()
    listofDictionaries = api.words(sl = name, max = 10)
    nameSet = set()
    for i in listofDictionaries:
        if i['score'] == 100:
            nameSet.add(i['word'])
    nameSet.add(name)
    nameList = list(nameSet)
    if len(nameSet) > 5:
        nameList = nameList[:4]
    return nameList

def returnRedditPUL(name):
    """Function that takes name and outputs comments from r/pickuplines under the search term {name} """
    pickuplines = []
    name = name.lower()
    logging.info(reddit)
    for submission in reddit.subreddit('pickuplines').search(name):
        submission.comments.replace_more(limit=0)
        for topLevelComment in submission.comments:
            pickuplines.append(topLevelComment.body)

    if pickuplines:
        print(str(len(pickuplines))+" pick-up lines for "+ name.title()+ " found on Reddit.")
    else:
        print("No pickup lines for "+ name+ " found on Reddit.")
    return pickuplines


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.params.get('name')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

    if name:
        names = findNearNames(name)
        lines = set()
        for name in names:
            someLines = returnRedditPUL(name)
            for line in someLines:
                lines.add(line)
        return func.HttpResponse(str(list(lines)))
    else:
        return func.HttpResponse(
             "Please pass a name on the query string or in the request body",
             status_code=400
        )
