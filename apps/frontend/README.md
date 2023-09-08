# Frontend app

React simple application which:

- shows greetings
- shows a list of users
- adds a user

## Configuration

No special configuration is required.
The frontend app expects to have the backend services accessible at `/api`, i.e.:

- `/api/users` - `GET` a list of users and `POST` a new user
- `/api/greetings` - `GET` an array of greetings

## Run it locally

Install dependencies:

```bash
npm install
```

Run the app in the development mode:

```bash
npm start
```

## Test if the frontend service works

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
