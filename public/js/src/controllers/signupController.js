angular.module('fittr.controllers')

  .controller('SignupController', function($scope, $http, $state, UserService, ValidationService) {
    $scope.title = "Sign Up";
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
    };

    $scope.submit = function(ngFormController) {
      $scope.user.username = $scope.user.email;
      var signupPromise = UserService.signup($scope.user);

      signupPromise.then(function(data) {

          // console.log("signup: ", data);
          ValidationService.resetForm(ngFormController, $scope.user);

          // get user activity data and store in mem and local storage
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

          // Display a flash message indicating error
          // TODO: would be cool to send back to the user the 
          // email address they used to sign up
          $scope.flashMessage = 'Hmmm, looks like you already have an account.';  //TODO:
          $scope.signupLoginError = true;
        });
    };
  });
