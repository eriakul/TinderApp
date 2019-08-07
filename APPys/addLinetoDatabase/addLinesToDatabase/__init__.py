import logging
import pyodbc
import praw
import auth
from datamuse import datamuse
import json 
import azure.functions as func


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
        #return add_line()
        #return func.HttpResponse(f"Hello {name}!")
    else:
        return func.HttpResponse(
             "Please pass a name on the query string or in the request body",
             status_code=400
        )

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

    #Check database to see if puns for name already exist
    #if name exists
        #Retrieve lines from database WHERE score >= 0
        #Return RESPONSE 
    #else
        #Lines = get lines from reddit()
		#Add lines to database. Initialize each line with score of 10. 
		#Return RESPONSE
        
    if cursor.fetchone():
        cursor.execute("""SELECT punText AS 'line'
                        FROM tinderappdatabase.dbo.PunsDB
                        WHERE name='{}' AND score >= 0
                        ORDER BY score DESC
                        FOR JSON PATH, ROOT('lines')""".format(name))
        return cursor.fetchone()[0]
    else:
        lines = getLinesFromReddit(name)
        return add_lines(lines, name, cursor, connection)
        #return "No match"

########################################################################################################################

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

def add_lines(lines, name, cursor, connection):
    #server = 'tinderappdatabase.database.windows.net'
    #database = 'tinderappdatabase'
    #username = 'timlucian0817'
    #password = 'Totoro123!'
    #driver= '{ODBC Driver 17 for SQL Server}'
    #connection = pyodbc.connect('DRIVER='+driver+'; PORT=1433; SERVER='+server+'; DATABASE='+database+';UID='+username+';PWD='+ password)
    #cursor = connection.cursor()

    message = "New lines added: "

    for line in list(lines):
        print("""INSERT tinderappdatabase.dbo.Table_1 (name, score, punText)
                        VALUES ('{}', 10, '{}')""".format(name, line))
        message = message+ "\n" + "('{}', 10, '{}')".format(name, line)
        #cursor.execute("""INSERT tinderappdatabase.dbo.Table_1 (name, score, punText)
        #                VALUES ('{}', 10, '{}')""".format(name, line))
        #connection.commit()


    #Query = "SELECT *  from tinderappdatabase.dbo.PunsDB"

    #cursor.execute(Query)
    
    #row = cursor.fetchone()
    #tableString = "Table: "
    #while row:
        #tableString = tableString + "\n" + (str(row[0]) + " " + str(row[1]) + " " + str(row[2]))
        #row = cursor.fetchone()


    #return tableString
    return message