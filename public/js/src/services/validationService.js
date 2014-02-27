angular.module('fittr.services')

  .factory('ValidationService', function() {

    return {
      resetForm: function(form, user) {
        user.email = "";
        user.username = "";
        user.password = "";
        form.$setPristine();
      },
      
      inputValid: function(form) {
        return form.$valid && form.$dirty;
      },

      inputInvalid: function(form) {
        return form.$invalid && form.$dirty;
      },

      showError: function(form, error) {
        return form.$error[error];
      },
    };
  });
