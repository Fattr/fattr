angular.module('fittr.controllers')

.controller('LoginController', function($scope, $state, UserService) {
  
  $scope.title = "Log In";
  $scope.user = {};
  $scope.signupLoginError = false;
  $scope.flashMessage = "";


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
    return $scope.loginLoginForm.$dirty &&
      $scope.loginLoginForm.$valid;
  };

  $scope.dismiss = function() {
    $scope.signupLoginError = false;
  }

  $scope.submit = function(ngFormController) {
    $scope.user.username = $scope.user.email;
    var loginPromise = UserService.login($scope.user);

    loginPromise.then(function(data) {
        console.log("login: ", data);

        resetForm(ngFormController); 
        // move to connect devices state
        // $state.go('main.stream');
      }, function(reason) {
        resetForm(ngFormController);
        console.log("reason: ", reason);
        $scope.flashMessage = "Hmmm, looks like you don't have an account";
        $scope.signupLoginError = true
      });

    loginPromise.then(function(data) {
      UserService.retrieve(data._id, data._access_token)
        .then(function(data) {
          console.log("retrieve fulfilled: ", data);

          // store user details in memory
          UserService.save(data);

          // store user details in local storage?
          UserService.saveToLocal(data);
          console.log("retrieve from mem: ", UserService.currentUser);
          console.log("retrieve from local: ", UserService.retrieveFromLocal());
          UserService.getUserActivity(data._id)
            .then(function(data) {
              
              // reverse order of activities
              data['activities-steps'].reverse();
              UserService.currentUser.activity = data;
              console.log("Activity: ", UserService.currentUser);
              $state.go('main.stream');
            })
        });
      });
    };

});