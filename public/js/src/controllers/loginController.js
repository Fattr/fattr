angular.module('fittr.controllers')

.controller('LoginController', function($scope, $state, UserService, ValidationService) {

  // Helper function to retrieve user's active
  var getUserActivity = function(userId) {
    UserService.get(userId)
      .then(function(data) {
        console.log("retrieve fulfilled: ", data);

        // store user details in memory
        UserService.save(data);

        // store user details in local storage?
        UserService.saveToLocal(data);
        console.log("retrieve from mem: ", UserService.currentUser);
        console.log("retrieve from local: ", UserService.getFromLocal());
      }, function(error) {
        // TODO: flesh out this error handler
        console.log("error occured during user data retrieval");
      });
  };


  $scope.title = "Log In";
  $scope.user = {};

  // Form validation
  $scope.inputValid = ValidationService.inputValid;
  $scope.inputInvalid = ValidationService.inputInvalid;
  $scope.showError = ValidationService.showError;
  $scope.canSubmit = ValidationService.canSubmit;
  
  // Flash message
  $scope.signupLoginError = false;
  $scope.flashMessage = "";
  $scope.dismiss = function() {
    $scope.signupLoginError = false;
  }

  $scope.submit = function(ngFormController) {
    $scope.user.username = $scope.user.email;
    var loginPromise = UserService.login($scope.user);

    loginPromise.then(function(data) {
        console.log("login: ", data);

        ValidationService.resetForm(ngFormController, $scope.user); 
        // retrieve user activity and store in mem and local storage
        getUserActivity(data._id);
        // move to connect devices state
        $state.go('main.stream');
      }, function(reason) {
        ValidationService.resetForm(ngFormController, $scope.user);
        console.log("reason: ", reason);
        $scope.flashMessage = "Hmmm, looks like you don't have an account";
        $scope.signupLoginError = true;
      });
  };
});