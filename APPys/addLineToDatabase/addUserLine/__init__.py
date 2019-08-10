import logging
import pyodbc

import azure.functions as func


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.params.get('name')
    punText = req.params.get('punText')
    if not name or not punText:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')
            punText = req.params.get('punText')

    if name and punText:
        add_Line(name, punText)
        return func.HttpResponse(
             "Line added successfully",
             status_code=200
        )
    else:
        return func.HttpResponse(
             "Please pass a name on the query string or in the request body",
             status_code=400
        )

#-----------------------#
#-------FUNCTIONS-------#
#-----------------------#
def add_Line(name, punText):
    server = 'tinderappdatabase.database.windows.net'
    database = 'tinderappdatabase'
    username = 'timlucian0817'
    password = 'Totoro123!'
    driver= '{ODBC Driver 17 for SQL Server}'
    connection = pyodbc.connect('DRIVER='+driver+'; PORT=1433; SERVER='+server+'; DATABASE='+database+';UID='+username+';PWD='+ password)

    cursor = connection.cursor()
    cursor.execute("""INSERT tinderappdatabase.dbo.PunsDB (name, score, punText) 
                        VALUES (?, 10, ?)""", [name, punText])
    connection.commit()
