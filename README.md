# Arcanaeum

## Features

- Keep track of book information, including title, author, and library availability
- Search, add, and edit books
- Filter by starred and library availability
- Links to search Amazon, Goodreads, and a library catalog
- Export list as CSV

## Setup

- Install [Node.js](https://nodejs.org)
- Install [MongoDB](https://docs.mongodb.com/guides/server/install/): If you're setting up MongoDB for the first time, make sure to follow the instructions under "Run MongoDB" for setting up the environment and creating the data directory.
- Create a [Google developer project](https://console.developers.google.com): Used for authentication. Under APIs, enable the Google+ API. Under Credentials, add an Oauth 2.0 client ID. Take note of generated the client ID and client secret (will be used in config.json). Add a redirect URL of the format `<arcaneum URL>/auth/google/callback`.
- Set up the database:
  ```
  mongod
  use books
  db.users.insert({ "email": "your.email@website.com" })
  ```
  For now only one user is supported and login is via Google auth.
- Set up the config: `cp backend/src/config/config.example.json backend/src/config/config.json`. Update the fields in config.json.
- Install node modules:
  ```
  npm install
  ```

## Building and running

### Production

```
mongod
npm run build-all
npm run start-backend
```

### Server development

```
mongod
npm run watch-backend
```

### Client development

```
npm run build-frontend
```

## Details

### Server

- [TypeScript](https://www.typescriptlang.org)
- Runs on [Node](https://nodejs.org); [nodemon](https://nodemon.io) used to run with automatic restarts in development mode
- [MongoDB](https://www.mongodb.com/) with [mongoose](https://mongoosejs.com) ODM
- [Express](https://expressjs.com/) for the REST API
- [Passport](http://passportjs.org/) for authentication with a [Google OAuth 2.0 strategy](https://github.com/jaredhanson/passport-google-oauth2)

### Client

- [TypeScript](https://www.typescriptlang.org)
- [Webpack](https://webpack.js.org/) with webpack-dev-server in development mode
- [axios](https://github.com/axios/axios) HTTP client
- [MobX](https://mobx.js.org) for state management
- [React](https://reactjs.org/)
- [Less](http://lesscss.org/) CSS