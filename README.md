# Arcanaeum

## Features
- Keep track of book information, including title, author, and library availability
- Search, add, and edit
- Filter by starred and library availability
- Links to search Amazon, Goodreads, and a library catalog
- Export list as CSV

## Usage

### Pre-requisites
- [Node.js](https://nodejs.org)
- [MongoDB](http://docs.mongodb.org/manual/installation/): If you're setting up MongoDB for the first time, make sure to follow the [installation instructions](http://docs.mongodb.org/manual/installation/) for creating the data directory and running MongoDB.
- [Google developer project](https://console.developers.google.com): Used for authentication. Under APIs, enable the Google+ API. Under Credentials, add an Oauth 2.0 client ID. Take note of generated the client ID and client secret (will be used in config.json). Add a redirect URL of the format `<arcaneum URL>/auth/google/callback`.

### Setup

Set up the database:
```
mongod
use books
db.users.insert({ "email": "your.email@gmail.com" })
```
For now only one user is supported and login is via Google auth.

Set up the config: `cp config.example.json config.json` Update the fields in config.json.

Install node modules: `npm install`

### Running

```
mongod
node server.js
```