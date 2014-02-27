angular.module('fittr.controllers')

  .controller('ResetController', function($scope, $http, $state, $stateParams, $ionicLoading, UserService, ValidationService) {

    $scope.reset = false;
    if ( $stateParams.slug ) {
      $scope.reset = true;
    }; 

    $scope.title = "Reset Password";
    $scope.user = {};

    // Form validation
    $scope.inputValid   = ValidationService.inputValid;
    $scope.inputInvalid = ValidationService.inputInvalid;
    $scope.showError    = ValidationService.showError;
    $scope.canSubmit    = ValidationService.canSubmit;

    // Flash message
    $scope.resetError = false;
    $scope.flashMessage = "";
    $scope.dismiss = function() {
      $scope.resetError = false;
    };

    $scope.submit = function(form) {

      UserService.reset($scope.user)
        .then(function(data) {

          console.log("response from /user/forgot/password ", data);
          ValidationService.resetForm(form, $scope.user);

          // save user data and store in mem and localStorage
          // UserService.save(data);

          // $state.go('main/stream');
          $scope.flashMessage = "A link to reset the password has been sent."
          $scope.signupLoginError = true;

        }, function(reason) {
          ValidationService.resetForm(form, $scope.user);
          console.log("reason: ", reason);

          $scope.flashMessage = "";
          $scope.signupLoginError = true;
        });
      }
  });