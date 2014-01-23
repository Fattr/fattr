angular.module('fittr.controllers')

  .controller('SignupController', function($scope, $http, UserService, $state) {
    $scope.title = "Sign Up";
    $scope.user = {};

    var resetForm = function(ngFormController) {
      $scope.user.email = "";
      $scope.user.password = "";
      ngFormController.$setPristine();
    };

    $scope.getCssClasses = function(ngModelController) {
      return {
        error: ngModelController.$invalid && ngModelController.$dirty,
        success: ngModelController.$valid && ngModelController.$dirty
      };
    };
    
    $scope.inputValid = function(ngModelController) {
      return ngModelController.$valid && ngModelController.$dirty
    };

    $scope.inputInvalid = function(ngModelController) {
      return ngModelController.$invalid && ngModelController.$dirty
    };

    $scope.showError = function(ngModelController, error) {
      return ngModelController.$error[error];
    };

    $scope.canSubmit = function() {
      return $scope.signupLoginForm.$dirty &&
        $scope.signupLoginForm.$valid;
    };

    $scope.submit = function(ngFormController) {
      $scope.user.username = $scope.user.email;
      var signupPromise = UserService.signup($scope.user);

      signupPromise.then(function(data) {
          console.log("signup: ", data);

          resetForm(ngFormController); 
          // move to connect devices state
          $state.go('connect-devices');
        }, function(reason) {
          resetForm(ngFormController);
          console.log("reason: ", reason);
        });

      signupPromise.then(function(data) {
        UserService.retrieve(data._id, data._access_token)
          .then(function(data) {
            console.log("retrieve fulfilled: ", data);
            // store user details in memory
            UserService.save(data);
            // store user details in local storage?
            UserService.saveToLocal(data);
            console.log("retrieve from mem: ", UserService.currentUser);
            console.log("retrieve from local: ", UserService.retrieveFromLocal());
          });
        });
    };
  });



