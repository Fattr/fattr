angular.module('fittr.controllers')

  .controller('SignupController', function($scope, $http, $state, UserService, ValidationService) {

    // Helper function to retrieve user's active
    var getUserActivity = function(userId) {
      UserService.retrieve(userId)
        .then(function(data) {
          console.log("retrieve fulfilled: ", data);

          // store user details in memory
          UserService.save(data);

          // store user details in local storage?
          UserService.saveToLocal(data);
          console.log("retrieve from mem: ", UserService.currentUser);
          console.log("retrieve from local: ", UserService.retrieveFromLocal());
        }, function(error) {
          // TODO: flesh out this error handler
          console.log("error occured during user data retrieval");
        });
    };

    $scope.title = "Sign Up";
    $scope.user = {};

    // Form validation
    $scope.inputValid = ValidationService.inputValid;
    $scope.inputInValid = ValidationService.inputInValid;
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
          ValidationService.resetForm(ngFormController, $scope);

          // get user activity data and store in mem and local storage
          getUserActivity(data._id);

          // move to connect devices state
          $state.go('connect-devices');
        }, function(reason) {
          ValidationService.resetForm(ngFormController);
          console.log("reason: ", reason);

          // Display a flash message indicating error
          // TODO: would be cool to send back to the user the 
          // email address they used to sign up
          $scope.flashMessage = 'Hmmm, looks like you already have an account.';  //TODO:
          $scope.signupLoginError = true;
        });
    };
  });
