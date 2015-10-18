# employee-directory
Employee directory with seating map and admin interface.

Also includes:
* Printer information and map
* Room information and map

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
* [Icomoon] - Icon Font & SVG Icon Sets
* [mongoDB] - no SQL database
* [jQuery] - The Write Less, Do More, JavaScript Library

### Known Issues
The angular-vertilize module has an issue when used on the same node as the angularUtils-pagination module.  In order to fix this issue do a null check before subscribing to the event getMyRealHeight on line 85 of the unminified file:
```sh
// Line 85 below, add the if conditional
if (myIndex > 0) {
  scope.$watch(getMyRealHeight, function (myNewHeight) {
    ...
  });
}
```