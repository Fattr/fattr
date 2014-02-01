angular.module('fittr.services')
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
    };
  });
