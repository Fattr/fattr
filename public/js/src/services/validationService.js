angular.module('fittr.services')

/**
 * A simple example service that returns some data.
 */
.factory('ValidationService', function() {

  return {
    resetForm: function(ngFormController, user) {
      user.email = "";
      user.password = "";
      ngFormController.$setPristine();
    },
    
    inputValid: function(ngModelController) {
      return ngModelController.$valid && ngModelController.$dirty;
    },

    inputInvalid: function(ngModelController) {
      return ngModelController.$invalid && ngModelController.$dirty;
    },

    showError: function(ngModelController, error) {
      return ngModelController.$error[error];
    },

    // canSubmit: function(scope) {
    //   return scope.loginLoginForm.$dirty &&
    //     scope.loginLoginForm.$valid;
    // },
  };
});
