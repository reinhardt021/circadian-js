# CIRCADIAN

Helping you get through the rhythms of your day.

## DEPENDENCIES

In order to run the app,
you will need the following dependencies:

* Node version 12.13.0
* Npm version 6.14.1
* Postgresql version 13 (14 has an issue with ports)
* Express version 4.16.0
* Vue version 2.6.11

```
// to install with homebrew and start postgres
brew install postgresql@13 # last working version to allow connecting to port
brew services start postgresql@13 # starts the server
brew link postgresql@13 # allows you use psql command
psql --version

// might have to run the following if doesn't work
echo 'export PATH="/usr/local/opt/postgresql@13/bin:$PATH"' >> ~/.zshrc

// reference: https://dyclassroom.com/howto-mac/how-to-install-postgresql-on-mac-using-homebrew
// reference: https://stackoverflow.com/questions/69754628/psql-error-connection-to-server-on-socket-tmp-s-pgsql-5432-failed-no-such
```


## Getting Started

How to run this locally for testing and development

```
// SETUP DATABASE
$ psql

> \du # to list the users
// if need to create specific user then do that
> CREATE ROLE <DB_USER> WITH createdb login password '<DB_PASSWORD>'
// log out and log back in as new user before creating database

> \l # to list the databases
// create database
> CREATE DATABASE <DB_NAME>;
> \l


// install dependencies
$ npm install

// run migrations
$ npx sequelize-cli db:migrate

// run the server
$ npm run start

#// go to app in browser
http://localhost:3000
```


## Screenshots

![alt text](public/images/screenshots/circadian-timer.png "Timer")
![alt text](public/images/screenshots/circadian-settings-top.png "Settings Top")
![alt text](public/images/screenshots/circadian-settings-bottom.png "Settings Bottom")


## TODO:

Running list of things to focus on.

### BACK-END:

* [x] setup sequelize with express to use postgres database
* [x] npx sequelize-cli init // to setup folders needed

* [x] create migrations for flows
* `npx sequelize-cli model:generate --name Flows --attributes title:string` 
* [x] run migrations `npx sequelize-cli db:migrate`
* [x] create GET flows route
* [x] create POST flows route
* [x] create PUT flows route
* [x] create DELETE flows route
* [x] test routes with HTTPIE

* [x] create migrations for tasks
* `npx sequelize-cli model:generate --name Tasks --attributes title:string,hours=integer,minutes=integer,seconds=integer`
* [x] run migrations `npx sequelize-cli db:migrate`
* [x] create GET tasks route
* [x] create POST tasks route
* [x] create PUT tasks route
* [x] create DELETE tasks route
* [x] test routes with HTTPIE

* [x] add column type:string for tasks table
  * `npx sequelize-cli migration:create --name add-type-to-tasks`
* [x] run migrations `npx sequelize-cli db:migrate`
* [x] update model to access types
* [x] update tasks routes to have include type data

* [ ] add flow_id to tasks
  * `npx sequelize-cli migration:create --name add-flow-id-to-tasks`
* [x] run migrations `npx sequelize-cli db:migrate`
* [ ] create relation for flows and tasks
* [ ] update GET flows to have tasks data as well
* [ ] update tasks routes to have /flows/:flow_id/ prefix

* [ ] create seeder for default flow and tasks
  * Pomodoro Flow
  * Warm Up (break)
  * Work (focus)
  * Cool Down (break)

* [ ] create migrations & routes for users
* [ ] add created_by user column in the flows table
* [ ] deploy to heroku to test and plan out next steps

### FRONT-END:

* [ ] change the event handler to change the times on click of the arrows
* [ ] make API call to load the default Flow with presets

### stretch:

* chrome extension to run spotify playlists
* tmux plugin to have pomodoro in tmux

