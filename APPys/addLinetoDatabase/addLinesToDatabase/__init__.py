import logging
import pyodbc

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
        return add_line()
        #return func.HttpResponse(f"Hello {name}!")
    else:
        return func.HttpResponse(
             "Please pass a name on the query string or in the request body",
             status_code=400
        )

def add_line():
    server = 'tinderappdatabase.database.windows.net'
    database = 'tinderappdatabase'
    username = 'timlucian0817'
    password = 'Totoro123!'
    driver= '{ODBC Driver 17 for SQL Server}'
    connection = pyodbc.connect('DRIVER='+driver+'; PORT=1433; SERVER='+server+'; DATABASE='+database+';UID='+username+';PWD='+ password)
    cursor = connection.cursor()


    cursor.execute("INSERT tinderappdatabase.dbo.Table_1 (name, score, punText)  VALUES ('Peter4', 10, 'Peter4 Peter4 Pussy Eater.')")
    connection.commit()


    Query = "SELECT *  from tinderappdatabase.dbo.Table_1"

    cursor.execute(Query)
    
    row = cursor.fetchone()
    tableString = "Table: "
    while row:
        tableString = tableString + "\n" + (str(row[0]) + " " + str(row[1]) + " " + str(row[2]))
        row = cursor.fetchone()


    return tableString