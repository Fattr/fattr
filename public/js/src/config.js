angular.module('fittr')

.config(function(UserServiceProvider) {
  // UserServiceProvider.setApiKey('myKey');
})

// Allows us to segregate app data by using a 'Fittr' prefix
.config(function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('Fittr');
})

.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
