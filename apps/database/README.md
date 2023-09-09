# PostgreSQL database

## Local installation

Use `bitnami/postgresql` image to run the database in the podman:

```bash
# TODO: Unfortunately there is no bitnami/postgresql option available for ppc64le architecture
podman run --name postgresql -d -p 5432:5432 -e POSTGRESQL_PASSWORD=password123 -e POSTGRESQL_DATABASE=demodb docker.io/bitnami/postgresql:latest
```

Exec into the container to have `psql` CLI tool available:

```bash
podman exec -it postgresql /bin/bash
```

Create required schema and table by running (from inside the container). The command waits for the password which you need to type in:

```bash
psql -v ON_ERROR_STOP=1 --username postgres -d demodb  <<-EOSQL
   CREATE SCHEMA IF NOT EXISTS demo;
   CREATE TABLE demo.users (
      id SERIAL PRIMARY KEY,
      firstName VARCHAR ( 50 ) NOT NULL,
      lastName VARCHAR ( 50 ) NOT NULL,
      email VARCHAR ( 255 ) UNIQUE NOT NULL
   );
EOSQL
```

Exit from the container:

```bash
exit
```

## OpenShift Cluster installation

This installation uses OpenShift template for PostgreSQL database (persistent version).

You can get more details about this template by executing:

```bash
oc get template postgresql-persistent -n openshift -o yaml
```

Create a database instance by using the template (provide the name of your project):

```bash
oc new-app postgresql-persistent --name=postgresql -p POSTGRESQL_DATABASE=demodb -p POSTGRESQL_USER=demouser -n <your_project_name>
```

In the response of the previous command, you should be mostly interested in the password that is generated. You can get any of these values later by inspecting the `postgresql` secret which is used by the PostgreSQL database instance.

Get a full name of the postgresql pod:

```bash
oc get po
```

Exec into the postgresql pod:

```bash
oc rsh postgresql-1-<generated_number>
```

Run the following command to create the schema and `users` table.

```bash
psql -v ON_ERROR_STOP=1 --username demouser -d demodb  <<-EOSQL
   CREATE SCHEMA IF NOT EXISTS demo;
   CREATE TABLE demo.users (
      id SERIAL PRIMARY KEY,
      firstName VARCHAR ( 50 ) NOT NULL,
      lastName VARCHAR ( 50 ) NOT NULL,
      email VARCHAR ( 255 ) UNIQUE NOT NULL
   );
EOSQL
```

In case you want to access the database remotely and not only from within the cluster, you can expose the service and get the route url:

```bash
oc expose svc postgresql
oc get route
```

Or better, you can only port-forward and bind the port of the running pod to your local filesystem:

```bash
oc get po # get pod name, e.g. postgresql-1-wctsw
oc port-forward postgresql-1-wctsw 5432:5432
# connect to localhost:5432
```
