# kanban-backend
backend for Kanban!


This repository contains the backend for [Kanban!](http://kanban-client.s3-website.us-west-2.amazonaws.com/), a personal project of mine. It's built primarily with ExpressJS, Passport, and RethinkDB.


## If you'd like to clone and run a test setup of your own:
*frontend client repo:* [kanban-client](https://github.com/SimpliciTea/kanban-client)

1) Make sure you have [installed RethinkDB](https://rethinkdb.com/docs/install/)
2) Clone this repo and `npm install`
3) Start RethinkDB in the project directory
4) Run `npm run setup` to initialize the minimal database and tables used by the application
5) start the node server! I use `nodemon` while developing, but just running `node index.js` works fine.
