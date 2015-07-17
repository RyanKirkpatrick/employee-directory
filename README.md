# employee-directory
Employee directory with seating map and admin

## Setup
```sh
$ git clone [git-repo-url] employee-directory
$ cd employee-directory
$ npm install
$ bower install
```

create 'credentials.js' in /server/config/
```sh
module.exports = {
  sessionSecret: 'this is my session secrect',
  cookieSecret: 'this is my cookie secrect'
};
```

### Tech

Employee Directory uses a number of open source projects to work properly:

* [AngularJS] - HTML enhanced for web apps!
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Stylus] - Expressive, dynamic, robust CSS
* [Bootstrap] - awesome UI framework
* [Toastr] - a Javascript library for non-blocking notifications
* [Font Awesome] - The iconic font and CSS toolkit
* [mongoDB] - no SQL database


