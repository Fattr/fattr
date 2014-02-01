# Fittr
[![Build Status](https://travis-ci.org/Fittr/fittr.png?branch=master)](https://travis-ci.org/Fittr/fittr)   [![Dependency Status](https://david-dm.org/Fittr/fittr.png?theme=shields.io)](https://david-dm.org/Fittr/fittr)   [![devDependency Status](https://david-dm.org/Fittr/fittr/dev-status.png?theme=shields.io)](https://david-dm.org/Fittr/fittr#info=devDependencies)  [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)




Fittr allows you to compare your fitness metrics to the world.
Using the data from many popular trackers like Fitbit. Your metrics are collected and are used to compete with other users. Fittr was
built with the [MEAN Stack](http://mean.io) ([MongoDB](http://mongodb.org) |
 [ExpressJS](http://expressjs.com) | [AngularJS](http://angularjs.org/) | [NodeJS](http://nodejs.org)).
 We also used the [Ionic Framework v0.9.20](http://ionicframework.com/) to give the application a more native feel.
 
 You can demo the app [here](http://fittrapp.herokuapp.com).

## Prerequisites
* Node.js - Download and install [Node.js](http://nodejs.org) 
* MongoDB - Download and install [MongoDB](http://mongodb.org) and make sure you're running on the default port (27017)

### Tools
1. NPM - Package manager that comes with Node.js
2. Bower - Package manager, easy to install with npm
  *  `npm install -g bower`
3. Grunt - Task Runner, easy to install with npm
  *  `npm install -g grunt`

## Usage
Clone the repo `git clone https://github.com/Fittr/fittr.git`

The best way to get started with Fittr is to use npm and bower  
install node modules `npm install`  
start mongoDB in a seperate terminal window or tab `mongod`  
in mongo use the command `use app` to change to the correct db  
**Fittr does not include the required file that holds your Fitbit app data, to include, just make a  
new file named `auth.coffee` in the [config folder](https://github.com/Fittr/fittr/blob/master/app/coffee/config) You must now paste the following code in and then fill in your Fitbit app secrets**  
```coffeescript
module.exports =
  fitbit:
    consumerKey: '*Your fitbit consumer key here*'
    consumerSecret: '*Your fitbit consumer secret here*'
    callbackURL:  '*Your fitbit callback URL here*'
```  

Next run the command `grunt serve`. This will lint and compile the coffeescript files, and start up server on localhost:3000.

## Bootstrap Fittr
After signing up and populating your DB with users, you must run `nodemon app/coffee/config/worker.coffee`  
to query the DB, select all users tokens and retrieve the user's info and data from  
Fitbit.  
`worker.coffee` will update all users' data from yesterday from fitbit. Use a cron job  
to place the worker on a schedule, run the worker.   

## To Do
* Add more quantified self devices/services
* Add groups and challenges features
* UI overhaul



## Team

Fittr was built by [Mehul Patel](https://github.com/Mayho), [Scott Moss](https://github.com/Hendrixer), [David Wu](https://github.com/wuwoot), [Wayne Montague](https://github.com/stateoflux), and [Santiago Archila](https://github.com/sarchila) as a student project at [Hack Reactor](http://hackreactor.com)

## License
MIT
