angular.module('fittr.controllers')

.controller('LoginController', function($scope, $state, UserService, ValidationService) {

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
        UserService.getActivity(data._id)
          .then(function() {
          // move to connect devices state
          $state.go('main.stream');
          }, function() {
            console.log("failed in retrieving user activity");
          })
      }, function(reason) {
        ValidationService.resetForm(ngFormController, $scope.user);
        console.log("reason: ", reason);
        $scope.flashMessage = "Hmmm, looks like you don't have an account";
        $scope.signupLoginError = true;
      });
  };
});