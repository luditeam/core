app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        
        $routeProvider
          .when('/login', {
            templateUrl: 'views/common/_login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
          })
          .when('/cnil', {
            templateUrl: 'views/common/_cnil.html',
            //controller: 'TasksCtrl',
            //controllerAs: 'task'
          })
          .when('/cgu', {
            templateUrl: 'views/common/_cgu.html',
            //controller: 'TasksCtrl',
            //controllerAs: 'task'
          })
          .when('/retrieve-password', {
            templateUrl: 'views/common/_retrieve-password.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
          })
          .when('/error/:message', {
            templateUrl: 'views/frontend/_welcome.html',
            controller: 'WelcomeCtrl',
            controllerAs: 'welcome'
          })
          
          .otherwise({
            templateUrl: 'views/frontend/_welcome.html',
            controller: 'WelcomeCtrl',
            controllerAs: 'welcome'
          });
        

      // configure html5 to get links working on jsfiddle
      //$locationProvider.html5Mode(true);
  }])
app.run( function($rootScope, $location, env) {
    $rootScope.unSecuredRoute = ["/cgu", "/cnil", "/retrieve-password"];
    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ($rootScope.session.user === null) {
        // no logged user, we should be going to #login
        
        if (!next.$$route || next.$$route.templateUrl != "views/_login.html" ) {
          if(!next.$$route || $rootScope.unSecuredRoute.indexOf(next.$$route.originalPath) == -1){
              if (next.$$route && !$rootScope.backToRoute && next.$$route.originalPath !== "/login"){
                var route = next.$$route.originalPath;
                $.each(next.params, function(key, value){
                    route = route.replace(":"+ key, value);
                });
                $rootScope.backToRoute = route;
              }
              $location.path( "/login" );
          }
            
        }
      }
      else
      {
        if (next.$$route && next.$$route.templateUrl == "views/_login.html" ) {
          $location.path( "/welcome" );
        }
        else{
            $rootScope.page = $location.path().substring(1);
            if(next.params.ctrl){
                var ctrl = next.params.ctrl;
                var method = next.params.method;
                var id = next.params.id;
                next.$$route.templateUrl = "views/" + env.ident + "/" + ctrl+ "/_" + method + ".html";
                next.$$route.controller = ctrl.substr(0, 1).toUpperCase() + ctrl.substr(1) + "Ctrl";
            }
              
        }
          
      }


    });
 })