app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      
      $routeProvider
        .when('/user-scheduling'/*:id*/, {
          templateUrl: 'views/_user_scheduling.html',
          controller: 'UserSchedulingCtrl',
          controllerAs: 'userScheduling'
        })
        .when('/login', {
          templateUrl: 'views/_login.html',
          controller: 'LoginCtrl',
          controllerAs: 'login'
        })
        .when('/welcome', {
          templateUrl: 'views/_welcome.html',
          controller: 'WelcomeCtrl',
          controllerAs: 'welcome'
        })
        .otherwise({
          templateUrl: 'views/_welcome.html',
          controller: 'WelcomeCtrl',
          controllerAs: 'welcome'
        })

      // configure html5 to get links working on jsfiddle
      //$locationProvider.html5Mode(true);
  }])