app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        
        $routeProvider
          .when('/login', {
            templateUrl: 'views/_login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
          })
          .when('/user-scheduling'/*:id*/, {
            templateUrl: 'views/_user_scheduling.html',
            controller: 'UserSchedulingCtrl',
            controllerAs: 'userScheduling'
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
          .when('/tasks-handling', {
            templateUrl: 'views/_tasks.html',
            controller: 'TasksCtrl',
            controllerAs: 'task'
          })
          .when('/building', {
            templateUrl: 'views/_building.html',
            controller: 'BuildingCtrl',
            controllerAs: 'building'
          })
          .when('/shopping', {
            templateUrl: 'views/_shopping.html',
            controller: 'ShoppingCtrl',
            controllerAs: 'shopping'
          })
          .when('/marketing', {
            templateUrl: 'views/_marketing.html',
            controller: 'MarketingCtrl',
            controllerAs: 'marketing'
          })
          .when('/retrieve-password', {
            templateUrl: 'views/_retrieve-password.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
          })
          .when('/invit/:token', {
            templateUrl: 'views/_new-user.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
          })
          .when('/new-character', {
            templateUrl: 'views/_new-character.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
          })
          .when('/new-company', {
            templateUrl: 'views/_new-company.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
          })

          .when('/load-character', {
            templateUrl: 'views/_load-character.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
          })

          .when('/cnil', {
            templateUrl: 'views/_cnil.html',
            //controller: 'TasksCtrl',
            //controllerAs: 'task'
          })
          .when('/cgu', {
            templateUrl: 'views/_cgu.html',
            //controller: 'TasksCtrl',
            //controllerAs: 'task'
          })
          .otherwise({
            templateUrl: 'views/_welcome.html',
            controller: 'WelcomeCtrl',
            controllerAs: 'welcome'
          });
        

      // configure html5 to get links working on jsfiddle
      //$locationProvider.html5Mode(true);
  }]).run( function($rootScope, $location) {
    $rootScope.unSecuredRoute = ["/cgu", "/cnil", "/retrieve-password"];
    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ($rootScope.session.user === null) {
        // no logged user, we should be going to #login
        
        if (!next.$$route || next.$$route.templateUrl != "views/_login.html" ) {
          if(!next.$$route || $rootScope.unSecuredRoute.indexOf(next.$$route.originalPath) == -1)
            $location.path( "/login" );
        } 
      }
      else
      {
        if (next.$$route && next.$$route.templateUrl == "views/_login.html" ) {
          $location.path( "/welcome" );
        }
        else
          $rootScope.page = $location.path().substring(1); 
      }


    });
 })