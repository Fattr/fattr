angular.module('fittr.controllers')

.controller('ResetController', function($scope, $http, $state, $ionicLoading, UserService, ValidationService) {

  $scope.title = "Reset Password";
  $scope.user = {};

  // Form validation
  $scope.inputValid   = ValidationService.inputValid;
  $scope.inputInvalid = ValidationService.inputInvalid;
  $scope.showError    = ValidationService.showError;
  $scope.canSubmit    = ValidationService.canSubmit;

  // Flash message
  $scope.signupLoginError = false;
  $scope.flashMessage = "";
  $scope.dismiss = function() {
    $scope.signupLoginError = false;
  };

  $scope.show = function() {
    // Show the loading overlay and text
    $scope.loading = $ionicLoading.show({
      content: 'Loading...',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 500
    });

    // Hide the loading indicator
    $scope.hide = function() {
      $scope.loading.hide();
    };

    $scope.submit = function(ngFormController) {
      // activate the loading spinner
      $scope.show();

      UserService.reset($scope.user)
        .then(function(data) {
          // remove loading spinner
          $scope.hide();

          console.log("response from /reset: ", data);
          ValidationService.resetForm(ngFormController, $scope.user);

          // save user data and store in mem and localStorage
          UserService.save(data);

          $state.go('main/stream');

        }, function(reason) {
          ValidationService.resetForm(ngFormController, $scope.user);
          $scope.hide();
          console.log("reason: ", reason);

          $scope.flashMessage = "";
          $scope.signupLoginError = true;
        });
    }
  };
});