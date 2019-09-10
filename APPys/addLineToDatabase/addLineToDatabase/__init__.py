import logging
import pyodbc
import praw
import auth
from datamuse import datamuse
import json
import azure.functions as func

#----------------------#
#---GLOBAL VARIABLES---#
#----------------------#
reddit = praw.Reddit(client_id='fAkqHqn2XyBt3g',
                     client_secret="B1Rv2IY6KfA3PusqSeaFAu8brIw",
                     user_agent='USERAGENT')

version = praw.__version__

#-----------------------#
#-------FUNCTIONS-------#
#-----------------------#


def tinderAppgetMatchLines(name):
    server = 'tinderappdatabase.database.windows.net'
    database = 'tinderappdatabase'
    username = 'timlucian0817'
    password = 'Totoro123!'
    driver = '{ODBC Driver 17 for SQL Server}'
    connection = pyodbc.connect('DRIVER='+driver+'; PORT=1433; SERVER=' +
                                server+'; DATABASE='+database+';UID='+username+';PWD=' + password)

    cursor = connection.cursor()
    cursor.execute("""SELECT punText
                    FROM tinderappdatabase.dbo.PunsDB
                    WHERE name=?""", [name])

    # if name does NOT already exist in databse, get lines from reddit and add them to database
    if not cursor.fetchone():
        lines = list()
        if not hasBeenScraped(name, cursor, connection):
            lines = getLinesFromReddit(name)
            add_name(name, cursor, connection)
            add_lines(lines, name, cursor, connection)
        # check database again for name
        cursor = connection.cursor()
        cursor.execute("""SELECT punText
                    FROM tinderappdatabase.dbo.PunsDB
                    WHERE name=?""", [name])
        if cursor.fetchone():
            lines = getLinesFromDatabase(name, cursor, connection)
    else:
        lines = getLinesFromDatabase(name, cursor, connection)
    return lines


def add_lines(lines, name, cursor, connection):
    addedLines = list()
    for line in lines:
        if not line in addedLines:
            # https://github.com/mkleehammer/pyodbc/wiki/Getting-started#parameters
            cursor.execute("""INSERT tinderappdatabase.dbo.PunsDB (name, score, punText) 
                            VALUES (?, 10, ?)""", [name, line])
            connection.commit()
            addedLines.append(line)


def findNearNames(name):
    api = datamuse.Datamuse()
    listofDictionaries = api.words(sl=name, max=10)
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
            if topLevelComment.score>3:
                pickuplines.append(topLevelComment.body)

    if pickuplines:
        print(str(len(pickuplines))+" pick-up lines for " +
              name.title() + " found on Reddit.")
    else:
        print("No pickup lines for " + name + " found on Reddit.")
    return pickuplines


def getLinesFromReddit(name):
    try:
        names = findNearNames(name)
    except:
        names = [name]
    lines = list()
    for name in names:
        someLines = returnRedditPUL(name)
        for line in someLines:
            lines.append(line)
    return lines


def hasBeenScraped(name, cursor, connection):
    cursor = connection.cursor()
    cursor.execute("""SELECT name 
                    FROM tinderappdatabase.dbo.scrapedNames 
                    WHERE name=?""", [name])
    if cursor.fetchone():
        return True
    else:
        return False


def add_name(name, cursor, connection):
    cursor.execute("""INSERT tinderappdatabase.dbo.scrapedNames (name) 
                        VALUES (?)""", [name])
    connection.commit()


def getLinesFromDatabase(name, cursor, connection):
    cursor.execute("""SELECT punText AS 'line', score AS 'score'
                        FROM tinderappdatabase.dbo.PunsDB
                        WHERE name=? AND score >= 0
                        ORDER BY score DESC
                        FOR JSON PATH""", [name])
    lines = list()
    response = cursor.fetchall()
    result = ""
    # join all the lines fetched from database
    for row in response:
        result = result + row[0]
    logging.warn(result)

    for i in json.loads(result):
        line = i['line']
        score = i['score']
        lineObject = {'line': line, 'score': str(score)}
        lines.append(lineObject)
    return lines


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
        lines = tinderAppgetMatchLines(name)
        # should be getting json

        lineObject = {'lines': lines}
        data = json.dumps(lineObject)

        return func.HttpResponse(
            data,
            status_code=200
        )

    else:
        return func.HttpResponse(
            "Please pass a name on the query string or in the request body",
            status_code=400
        )
