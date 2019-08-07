import logging
import pyodbc
import praw
import auth
from datamuse import datamuse
import json 
import azure.functions as func


def tinderAppgetMatchLines(name):
    server = 'tinderappdatabase.database.windows.net'
    database = 'tinderappdatabase'
    username = 'timlucian0817'
    password = 'Totoro123!'
    driver= '{ODBC Driver 17 for SQL Server}'
    connection = pyodbc.connect('DRIVER='+driver+'; PORT=1433; SERVER='+server+'; DATABASE='+database+';UID='+username+';PWD='+ password)

    cursor = connection.cursor()
    cursor.execute("""SELECT punText 
                    FROM tinderappdatabase.dbo.PunsDB 
                    WHERE name='{}'""".format(name))
    
    #if name does NOT already exist in databse
    if not cursor.fetchone():
        lines = getLinesFromReddit(name)
        add_lines(lines, name, cursor, connection)

    cursor.execute("""SELECT punText AS 'line'
                    FROM tinderappdatabase.dbo.PunsDB
                    WHERE name='{}' AND score >= 0
                    ORDER BY score DESC
                    FOR JSON PATH, ROOT('lines')""".format(name))
    return cursor.fetchone()[0]
    
########################################################################################################################

reddit = praw.Reddit(client_id='fAkqHqn2XyBt3g',
                     client_secret="B1Rv2IY6KfA3PusqSeaFAu8brIw",
                     user_agent='USERAGENT')

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

def getLinesFromReddit(name):
    try:
        names = findNearNames(name)
    except:
        names = [name]
    lines = set()
    for name in names:
        someLines = returnRedditPUL(name)
        for line in someLines:
            lines.add(line)
    return lines

#####################################################################################################################

def add_lines(lines, name, cursor, connection):
    #message = "New lines added: "

    for line in list(lines):
        #print("""INSERT tinderappdatabase.dbo.Table_1 (name, score, punText)
        #                VALUES ('{}', 10, '{}')""".format(name, line))
        #message = message+ "\n" + "('{}', 10, '{}')".format(name, line)
        string = "INSERT tinderappdatabase.dbo.PunsDB (name, score, punText) VALUES ('"+name+"', 10, '"+line+"')"
        cursor.execute(string)
        connection.commit()
        #cursor.execute("""INSERT tinderappdatabase.dbo.PunsDB (name, score, punText) 
        #                VALUES ('{}', 10, '{}')""".format(name, line))
        #connection.commit()

    #return message

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
        return tinderAppgetMatchLines(name)
    else:
        return func.HttpResponse(
             "Please pass a name on the query string or in the request body",
             status_code=400
        )