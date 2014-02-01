# Fittr

Fittr allows you to compare your fitness metrics to the world.
Using the data from many popular trackers like Fitbit. Your metrics are collected and are used to compete with other users. Fittr was
built with the [MEAN Stack](http://mean.io) ([MongoDB](http://mongodb.org) |
 [ExpressJS](http://expressjs.com) | [AngularJS](http://angularjs.org/) | [NodeJS](http://nodejs.org))

## Prerequisites
* Node.js - Download and install [Node.js](http://nodejs.org) 
* MongoDB - Download and install [MongoDB](http://mongodb.org) and make sure you're running on the default port (27017)

### Tools
1. NPM - Package manager that comes with Node.js
2. Bower - Package manager, easy to install with npm
  *  `npm install -g bower`

## Additional Packages
* [Express](http://expressjs.com/) - defined as a node module in the [package.json](https://github.com/Hendrixer/Fittr/blob/master/package.json) file
* [Passport](http://passportjs.org/) - defined as a node module in the [package.json](https://github.com/Hendrixer/Fittr/blob/master/package.json) file
* [Mongoose](http://mongoosejs.com/) - defined as a node module in the [package.json](https://github.com/Hendrixer/Fittr/blob/master/package.json) file
* [Angular](http://angularjs.org/) - defined as bower module in the [bower.json](https://github.com/Hendrixer/Fittr/blob/master/bower.json) file
* [d3](http://d3js.org/) - defined as bower module in the [bower.json](https://github.com/Hendrixer/Fittr/blob/master/bower.json) file
* [nvd3](http://nvd3.org/) - defined as a bower module in the [bower.json](https://github.com/Hendrixer/Fittr/blob/master/bower.json) file
* [Angular-Animate](https://github.com/angular/bower-angular-animate) - defined as a bower module in the [bower.json](https://github.com/Hendrixer/Fittr/blob/master/bower.json) file  

## Usage
Clone the repo `git clone https://github.com/Hendrixer/Fittr.git`

The best way to get started with Fittr is to use npm and bower  
install node modules `npm install`  
install bower modules `bower intsall`  
start mongoDB in a seperate terminal window or tab `mongod`  
in mongo use the command `use fittr` to change to the correct db  
**Fittr does not include the required file that holds your Fitbit app data, to include, just make a  
new file named `auth.js` in the [config folder](https://github.com/Hendrixer/Fittr/tree/master/config) You must now paste the following code in and then fill in your Fitbit app secrets**  
```javscript
var ids = {
  fitbit: {
    consumerKey: '/*Your fitbit consumer key here*/',
    consumerSecret: '/*Your fitbit consumer secret here*/',
    callbackURL: '/*Your fitbit callback url*/'
  }
};

module.exports = ids;
```  

Start the Server `node app.js`

## Bootstrap Fittr
After signing up and populating your DB with users, you must run `node fitbitAllAct.js`  
to query the DB, select all users tokens and retrieve the user's info and data from  
Fitbit.  
`worker.js` will update all users' data from yesterday from fitbit. Use a cron job  
to place the worker on a schedule, run `node worker.js`   

## Team

Fittr was built by [Mehul Patel](https://github.com/Mayho), [Scott Moss](https://github.com/Hendrixer), [David Wu](https://github.com/wuwoot), [Nick Loveridge](https://github.com/lovenick) as a student project at [Hack Reactor](http://hackreactor.com)

## License
MIT
