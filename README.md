# button-load
An AngularJS component that handle the disabling of button when clicked synchronous/asynchronously and changing the text of it to progressive form.

# Prerequisite
- AngularJS > 1.6
- Bootstrap 3 (optional)

# Installation

```
npm install --save button-load
```

# Usage
- Just declare the `<button-load></button-load>` like a normal button do.
```
<button-load ng-click="ctrl.yourFunction()" class="btn btn-default">
  Save
</button-load>
```
- It will automatically disable the button and adjust the text specified on a progressive form. e.g. `Save` becomes `Saving ...`
- For asynchronous function for the component to know when it will end. You need to return the promise.
```
function save() {
    return $http.get('test').then(function() {

    });
}
```
- If for instance you want your own translation for the loading text. You can use the attribute `loading-txt` which will use your own translation instead.

```
<button-load ng-click="ctrl.yourFunction()" class="btn btn-default" loading-txt="Your Own Load">
  Save
</button-load>
```
instead of the default it will display the `Your Own Load` text.

# To Be Updated
- Test Script
