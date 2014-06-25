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
          .when('/error/:message', {
            templateUrl: 'views/_welcome.html',
            controller: 'WelcomeCtrl',
            controllerAs: 'welcome'
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
          });
        

      // configure html5 to get links working on jsfiddle
      //$locationProvider.html5Mode(true);
  }]).run( function($rootScope, $location) {

    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if (!$rootScope.user.logged) {
        // no logged user, we should be going to #login
        if (next.$$route.templateUrl != "views/_login.html" ) {
          $location.path( "/login" );
        } 
      }
      else
      {
        if (next.$$route.templateUrl == "views/_login.html" ) {
          $location.path( "/welcome" );
        } 
      }      
    });
 })