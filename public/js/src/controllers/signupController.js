angular.module('fittr.controllers')

  .controller('SignupController', function($scope, $http, $state, $ionicLoading, UserService, ValidationService) {

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

    var errorHandler = function() {

    };

    // Trigger the loading indicator
    $scope.show = function() {

      // Show the loading overlay and text
      $scope.loading = $ionicLoading.show({
        content: 'Loading...',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 500
      });
    };

    // Hide the loading indicator
    $scope.hide = function(){
      $scope.loading.hide();
    };

    $scope.submit = function(form) {
      // activate the loading spinner
      $scope.show();

      UserService.signup($scope.user)
        .then(function(data) {

        // deactiviate the loading spinner
        $scope.hide();

        console.log("response from /signup: ", data);
        ValidationService.resetForm(form, $scope.user);

        // save user profile data and store in mem and local storage
        UserService.save(data);

        // move to connect devices state
        $state.go('connect-devices');
         
      }, function(reason) {
          ValidationService.resetForm(form, $scope.user);
          // deactiviate the loading spinner
          $scope.hide();
          
          console.log("reason: ", reason);

          // Display a flash message indicating error
          // TODO: would be cool to send back to the user the 
          // email address they used to sign up
          $scope.flashMessage = 'Hmmm, looks like you already have an account.';
          $scope.signupLoginError = true;
      });
    };
  });
