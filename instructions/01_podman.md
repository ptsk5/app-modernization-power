# Podman environment

## Run apps inside the containers

### database

Read in the `README.md` file in the `apps/database` folder.

### greeting app

From greeting app folder run:

```bash
cd apps/greeting

podman build -t greeting:latest .

export GREETINGS="Hello from greeting app;Hello Jiri"

podman run --name greeting -d --rm -p 5000:5000 -e GREETINGS="${GREETINGS}" greeting:latest
```

### backend app

From backend app folder run:

```bash
# I saw an error running the latest python version container connecting to postresql (on M1 Macbook)
# As a workaround, add and build with amd64 arch platform parameter instead -> --platform=linux/amd64
podman build -t backend:latest .

# NOTE: for Docker, use 'host.docker.internal' instead of 'host.containers.internal'. Or the hostname if the network has 'dns_enabled: true'
export DATABASE_HOST=host.containers.internal
export DATABASE_PORT=5432
export DATABASE_NAME=demodb
export DATABASE_PASSWORD=password123
export DATABASE_USER=postgres
export GREETING_HOST=host.containers.internal
export GREETING_PORT=5000

podman run --name backend -d --rm -p 4000:4000 -e DATABASE_HOST=${DATABASE_HOST} -e DATABASE_PORT=${DATABASE_PORT} -e DATABASE_NAME=${DATABASE_NAME} -e DATABASE_PASSWORD=${DATABASE_PASSWORD} -e DATABASE_USER=${DATABASE_USER} -e GREETING_HOST=${GREETING_HOST} -e GREETING_PORT=${GREETING_PORT} backend:latest

```

### frontend app

From frontend app folder run:

```bash
# NOTE: Double-check the configuration in ./nginx/api-location.conf
# For Docker, use 'http://host.docker.internal:4000'; for podman, use 'http://host.containers.internal:4000' in api-location.conf file
podman build -t frontend:latest .

podman run --name frontend -d --rm -p 3000:8080 frontend:latest
```

## Ports mapping

| Application | container port | host port |
| ----------- | -------------- | --------- |
| frontend    | 8080           | 3000      |
| backend     | 4000           | 4000      |
| greeting    | 5000           | 5000      |
| database    | 5432           | 5432      |

## Clean up

```bash
podman stop frontend backend greeting
# podman rm frontend backend greeting
# podman rmi frontend backend greeting
```
