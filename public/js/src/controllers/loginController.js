angular.module('fittr.controllers')

  .controller('LoginController', function($scope, $state, $stateParams, $ionicLoading, UserService, ValidationService) {

    $scope.title = "Log In";
    $scope.usernamePlaceholder = "Enter your username"
    $scope.user = {};

    // Form validation is handled by the ValidationSerice
    $scope.inputValid = ValidationService.inputValid;
    $scope.inputInvalid = ValidationService.inputInvalid;
    $scope.showError = ValidationService.showError;
    $scope.canSubmit = ValidationService.canSubmit;
    
    // Flash message.  Used to indicate error messages to the user
    $scope.signupLoginError = false;
    $scope.flashMessage = "";
    $scope.dismiss = function() {
      $scope.signupLoginError = false;
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
    
      UserService.login($scope.user)
        .then(function(data) {

        // deactiviate the loading spinner
        $scope.hide();

        ValidationService.resetForm(form, $scope.user); 

        // save user profile data and store in mem and local storage
        UserService.save(data);

        if (!data.authData){
          $state.go('connect-devices');
        } else {
          // move to connect devices state
          $state.go('main.stream');
        }

      }, function(reason) {
          ValidationService.resetForm(form, $scope.user);
          // deactiviate the loading spinner
          $scope.hide();

          console.log("reason: ", reason);

          // Display a flash message indicating error
          // TODO: would be cool to send back to the user the 
          // email address they used to sign up
          $scope.flashMessage = 'Hmmm, you must be using the wrong credentials';  //TODO:
          $scope.signupLoginError = true;
      });
    };
  });