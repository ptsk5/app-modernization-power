# Backend app

Python Flask simple application which connects to:

- PostgreSQL database
- `greeting` service

## Configuration

| Environment variable | Description                                      |
| -------------------- | ------------------------------------------------ |
| DATABASE_HOST        | ip address / domain name of the database server  |
| DATABASE_PORT        | port number                                      |
| DATABASE_NAME        | database name                                    |
| DATABASE_USER        | database user                                    |
| DATABASE_PASSWORD    | database password                                |
| GREETING_HOST        | ip address / domain name of the greeting service |
| GREETING_PORT        | port number                                      |

## Run it locally

Export required environment variables to point to the PostgreSQL database:

```bash
export DATABASE_HOST=localhost
export DATABASE_PORT=5432
export DATABASE_NAME=demodb
export DATABASE_PASSWORD=password123
export DATABASE_USER=postgres
```

Export required environment variables to point to the greeting service:

```bash
export GREETING_HOST=localhost
export GREETING_PORT=5000
```

Install dependencies:

```bash
pip3 install -r requirements.txt
```

Run the app:

```bash
python3 src/app.py
```

## Test if the backend service works

[`GET`] get greetings:

```bash
curl -X GET localhost:4000/api/greetings
```

[`GET`] get all users:

```bash
curl -X GET localhost:4000/api/users
```

[`POST`] create a new user:

```bash
curl -X POST localhost:4000/api/users -d '{"firstName": "Jiri", "lastName": "5nik", "email" : "jiri@5nik.com"}' -H "Content-Type: application/json"
```
