angular.module('fittr.controllers').

controller('EntryController', function($interval, $scope) {

  var names = [ 
    'Fred',
    'DJ Fredness',
    'Your Fredness',
    'Ryan Stellar',
    'Marcus Phillips',
    'Doug Calhoun',
    "D'andra Moss",
    'Your Mom',
    'Your Roommate',
    'Your Boyfriend',
    'Your Girlfriend',
    'Your Neighbor',
    'Dude on the Street',
    'Peyton Manning',
    'LeBron James',
    // 'Tim Tebow',
    // 'Michael Phelps',
    // 'Usain Bolt',
    // 'Derek Jeter',
    // 'Drew Brees',
    // 'Aaron Rodgers',
    // 'David Beckham',
    'Serena Williams',
    'Candace Parker',
    // 'Venus Williams',
    // 'Alex Morgan',
    // 'Gabby Douglas',
    // 'Misty May-Treanor',
    'Hope Solo',
    // 'Maria Sharapova'
  ];


  var takingNames = function() {
    var index = Math.floor(Math.random() * names.length); 
    $scope.opposition = names[index];
  }

  // initialize the opposition
  // takingNames();
  $scope.opposition = 'Fred';


  setInterval(function() {
    $scope.$apply(function() {
      takingNames();
    })
  }, 1800);

});