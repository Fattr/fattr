# Fittr Code Review

### File Organization
* Standarize file name convention (you've got both camelCase and hyphen-ated patterns).
* Get rid of (and don't create in the future) directories like `pubic/css/backup` -- that's what git is for
  * Use `git tag` to tag special commits for easy access.
* Either delete your readme file or put something in it! such a tease.
* Unless the `app/coffee` is a convention that is used by other coffee devs or tools, get rid of it (a folder containing a single folder feels silly).


### Backend

* `localhost` is hard-coded in a few spots. Doesn't look like this repo is ready to be deployed?
* The functions in `routeHelpers` are more commonly called controllers, endpoints, or route handlers. *NB.*: Convention is the currency of our expertise, so you'll do well to name things in a way that is recognizable to your colleagues.

### Frontend

#### Files
* Your js file org could use a little love.
  * Ideally, thirdparty libraries like angular and iconic should be managed by a package manager like npm or bower.
  * Sometimes you have to keep thirdparty libs in version control (e.g., you're using a hacked lib, or a lib not in a package manager), in which case its a good idea to keep them in a `thirdarty` or `libs` folder so that they don't end up littering your directory structure.
    * This folder is usually a *sibling* of your application's js folder, not its parent (currently you have `js` containing thirdparty libs *and* a folder `src` containing your app-specific js)
* You're following a very common pattern for organizing js, css, and html, but as it turns out, it's a bad pattern. Can you imagine what this structure looks like for an app that has 10x the code? It becomes a nightmare for new devs to locate all the js, css, and html related to a single feature because the files are organized by the *kind* of code they contain, not by that feature to which the code they contain *pertains*.
  * Suggestion: in the future, consider organizing your files by feature, e.g., a `modules` folder that has a `menu` folder that has `menu.js`, `menu.html`, and `menu.css`. Of course, this pattern introduces some complexity in terms of your build process (used to be that you could just concat all the css files in the css directory, but now you have to walk the entire project to collect them all!), but it's definitely more maintainable in other ways. Obviously, not all code relates directly to pixels on the screen, so you'll probably have a few `modules` or folders that are purely abstract services. You'll also probably have some code that's shared between the modules, but these decisions are pretty inconsequential after you've established the module file pattern.

#### On Comments
* Don't [re-document the libraries you're using](https://github.com/Fittr/fittr/blob/master/public/js/src/app.js#L3)
* Prefer deleting unused code vs [commenting it out](https://github.com/Fittr/fittr/blob/master/public/js/src/app.js#L11)
* Avoid [*derp derp* comments](https://github.com/Fittr/fittr/blob/master/public/js/src/services/validationService.js#L4)
* Axe [this](https://github.com/Fittr/fittr/blob/master/public/js/src/services/userService.js#L10) and [this](https://github.com/Fittr/fittr/blob/master/public/js/src/services/userService.js#L85) and [WTF](https://github.com/Fittr/fittr/blob/master/public/js/src/controllers/cardsController.js#L57) and also [this](https://github.com/Fittr/fittr/blob/master/public/js/src/controllers/chartController.js)

#### URLs
* [No!](https://github.com/Fittr/fittr/blob/master/public/js/src/services/deviceService.js#L9) In general, you don't need to specify the host for a URL&mdash;you can use an `/absolute/path/without/the/host`, and you'll save yourself the headache of keeping app state in sync with app context.
* [Same here](https://github.com/Fittr/fittr/blob/master/public/test/jasmine/userService.spec.js#L15)

#### Location, location, location
* Does `show()` need to be on `$scope` [here](https://github.com/Fittr/fittr/blob/master/public/js/src/controllers/signupController.js#L21)? Where a thing lives implies something about its use&mdash;seeing `show()` defined on `$scope` suggests to me that the templates reference `show`, though it turns out they do not. In this case, `show` is only called by other functions defined in the `signup` controller, so I would not put it on scope but rather just let it live in the controller's closure.

#### Styles
* inline styles? ferreal? ima pretend i didn't see them.

#### Tests
* [This](https://github.com/Fittr/fittr/blob/master/public/test/jasmine/deviceService.spec.js) seems only to assert what was written in the DeviceService&mdash;a meaningful test would test its behavior (if it had any!), or its interaction with other parts of the system. I would delete this file, as well as [this one](https://github.com/Fittr/fittr/blob/master/public/test/jasmine/signupController.spec.js).
* userService
  * (This is definitely your most meaingful set of tests.)
  * Write no tests like [this](https://github.com/Fittr/fittr/blob/master/public/test/jasmine/userService.spec.js#L49)
  * Write more tests like [this](https://github.com/Fittr/fittr/blob/master/public/test/jasmine/userService.spec.js#L60)
* In general, try to test things that are more complicated than not. E.g., don't test that a service returns a promise, test that the promise resolves (and fails!) properly. You want to put some significant distance between the initial state of the tested system and the assertions you make about it. Testing that a service returns a promise, for example, would constitute a very short distance between initial state and the assertions made&mdash; there is very little opportunity for failure, and thus very little chance of the test catching a bug. As mentioned, test that the promise resolves/fails properly, or go even further afield and test the service's interaction with, e.g., a controller. Doing so will take you in the direction of integration tests, which are great for making sure system components have healthy relationships.

#### Extra Credit
* Don't assume mongodb is running locally--make it configurable so that you can put the mongo daemon on another box
* If you want to be bad ass, write a dockerfile so that the developer onboarding instructions are this short:

```Shell
git clone ...
docker build -t fittr .
docker run -d fittr
```
