# OpenShift environment (K8s objects)

## Download oc CLI tool

Log in to your OpenShift cluster (web console). When you are logged in, click on the question mark icon on the right side of the main header panel, and pick `Command line tools`.
Download `oc` tool for your OS.

```bash
unzip oc.zip
mv oc /usr/local/bin
chmod +x /usr/local/bin/oc
```

## CLI login

Take a login command by clicking on the user in the right upper corner of the cluster UI.
Log in by executing the login command, e.g.:

```bash
oc login --token=sha256~xxx --server=https://xxx.cloud.ibm.com:xxx
```

## Create a project

Create a new project in which you will deploy the database and all application modules. Fill in `<your project>` name:

```bash
oc new-project <your project>
```

## Deploy services

### PostgreSQL database

Read in the `README.md` file in the `apps/database` folder.

### Deploy greeting service

Change directory to `apps/greeting/k8s`

Have a look into `greeting.ConfigMap.yaml` where you can configure greeting messages.

Once ready, apply all yaml files at once by executing:

```bash
oc apply -f .
```

### Deploy backend service

Change directory to `apps/backend/k8s`

Copy the template file of the `secret` into a new file:

```bash
cp backend.Secret.yaml.template backend.Secret.yaml
```

Only the database password is missing in the `backend.Secret.yaml` file. You can get it by decoding the `postgresql` secret value (`database-password`). Use either the cluster web UI or the following command to do so:

```bash
oc get secret postgresql -n <your project> --template='{{index .data "database-password"}}' | base64 -d
```

Once the database password in `backend.Secret.yaml` file is updated, apply all yaml files at once by executing:

```bash
oc apply -f .
```

### Deploy frontend service

Change directory to `apps/frontend/k8s`

Apply all yaml files at once by executing:

```bash
oc apply -f .
```

**Warning:** Make sure that your image uses the correct link to the backend service (e.g.: http://backend:4000) in `nginx/api-location.conf` file. If not, or you are unsure, rebuild the `frontend` image and push it to the quay.io repository once again.

### Verify deployment

In case you did not uncomment any definitions of the Route objects, just the `frontend` endpoint should be accessible from outside of the cluster. Get the `frontend` route and open the https host in the browser.

```bash
oc get route frontend
```
