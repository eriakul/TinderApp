import logging
import pyodbc

import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.params.get('name')
    punText = req.params.get('punText')
    score_delta = req.params.get('score_delta')
    if not name or not punText or not score_delta:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')
            punText = req.params.get('punText')
            score_delta = req.params.get('score_delta')

    if name and punText and score_delta:
        return change_score(name, punText, score_delta)
    else:
        return func.HttpResponse(
             "Please pass a name on the query string or in the request body",
             status_code=400
        )

#-----------------------#
#-------FUNCTIONS-------#
#-----------------------#
def change_score(name, punText, score_delta):
    server = 'tinderappdatabase.database.windows.net'
    database = 'tinderappdatabase'
    username = 'timlucian0817'
    password = 'Totoro123!'
    driver= '{ODBC Driver 17 for SQL Server}'
    connection = pyodbc.connect('DRIVER='+driver+'; PORT=1433; SERVER='+server+'; DATABASE='+database+';UID='+username+';PWD='+ password)

    cursor = connection.cursor()
    cursor.execute("""SELECT score 
                    FROM tinderappdatabase.dbo.PunsDB 
                    WHERE name=? AND punText=?""", [name, punText])
    
    new_score = int(cursor.fetchone()[0]) + int(score_delta)
    
    cursor.execute("""UPDATE tinderappdatabase.dbo.PunsDB 
                    SET score=?
                    WHERE name=? AND punText=?""", [new_score, name, punText])
    connection.commit()

    return "hey"
