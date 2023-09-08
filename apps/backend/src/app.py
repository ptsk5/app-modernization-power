import os
import psycopg2
import json
import logging
import http.client
from flask import Response
from flask import Flask
from flask import jsonify
from flask import request
from waitress import serve

logging.basicConfig(level="INFO")
logger = logging.getLogger("backend")

app = Flask(__name__)

DATABASE_HOST = os.environ["DATABASE_HOST"]
DATABASE_PORT = os.environ["DATABASE_PORT"]
DATABASE_NAME = os.environ["DATABASE_NAME"]
DATABASE_PASSWORD = os.environ["DATABASE_PASSWORD"]
DATABASE_USER = os.environ["DATABASE_USER"]
GREETING_HOST = os.environ["GREETING_HOST"]
GREETING_PORT = os.environ["GREETING_PORT"]


def dbConnect():
    """ Init db connection """
    return psycopg2.connect(
        host=DATABASE_HOST,
        database=DATABASE_NAME,
        user=DATABASE_USER,
        password=DATABASE_PASSWORD,
        port=DATABASE_PORT,
    )


@app.route("/")
def index():
    msg = {"msg": "Hello from the backend app"}
    logger.info("[GET /] Hello from the backend app")
    return jsonify(msg)


@app.route("/api/greetings", methods=["GET"])
def greetingsApi():
    msg = ""
    status = 200

    if request.method == "GET":
        """Get greetings"""
        logger.info("[GET /api/greetings] get all greetings")
        conn = http.client.HTTPConnection(host=GREETING_HOST, port=GREETING_PORT)

        try:
            conn.request("GET", "/api/greetings")

            response = conn.getresponse()
            msg = {"greetings": json.loads(response.read().decode())}

        except (Exception) as error:
            logger.error(f"Error while fetching greeting service. {error}")
            msg = {"error": str(error)}
            status = 404
        finally:
            if conn:
                conn.close()

        return Response(json.dumps(msg), status=status, mimetype="application/json")


@app.route("/api/users", methods=["GET", "POST"])
def usersApi():
    msg = ""
    status = 200

    if request.method == "GET":
        """Get all users"""
        logger.info("[GET /api/users] get all users")
        conn = None
        try:
            conn = dbConnect()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM demo.users")
            allUsers = cursor.fetchall()
            usersArray = []
            for row in allUsers:
                usersArray.append({"id": row[0], "firstName": row[1], "lastName": row[2], "email": row[3]})

            msg = {"users": usersArray}

        except (Exception, psycopg2.Error) as error:
            logger.error(f"Error while fetching all users from the database. {error}")
            msg = {"error": str(error)}
            status = 404

        finally:
            if conn:
                cursor.close()
                conn.close()

    if request.method == "POST":
        """Create a new user"""
        logger.info("[POST /api/users] create a new user")
        data = request.get_json()
        conn = None
        try:
            conn = dbConnect()
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO demo.users (firstname, lastname, email) VALUES(%s, %s, %s)",
                (data["firstName"], data["lastName"], data["email"]),
            )
            conn.commit()

            msg = {"msg": "OK"}

        except (Exception, psycopg2.Error) as error:
            logger.error(f"Error while inserting an user into the database. {error}")
            msg = {"error": str(error)}
            status = 404

        finally:
            if conn:
                cursor.close()
                conn.close()

    return Response(json.dumps(msg), status=status, mimetype="application/json")


if __name__ == "__main__":
    # app.run(host="0.0.0.0", port=4000)
    serve(app, host="0.0.0.0", port=4000)
