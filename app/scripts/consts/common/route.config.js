app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        
        $routeProvider
          .when('/:ctrl', {})
          .when('/:ctrl/:method', {})
          .when('/:ctrl/:method/:id', {})
          .otherwise({
            redirectTo: 'welcome'
          });
      // configure html5 to get links working on jsfiddle
      //$locationProvider.html5Mode(true);
  }])
app.run( function($rootScope, $location, env) {
    $rootScope.unSecuredRoute = ["cgu", "cnil", "password"];
    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {

      if (!next.$$route) {
        next.$$route = {};
        next.params.method = "";
      }
      if ($rootScope.session.user === null && ($rootScope.unSecuredRoute.indexOf(next.params.method) == -1)) {
        // no logged user, we should go to #login
        if (next.params.ctrl == "login")//ATTENTION le controlleur login ne doit servir que à logger l'user => controller account
        {
          next.$$route.templateUrl = "views/common/login/_login.html";
          next.$$route.controller = "LoginCtrl";
        }
        else{
            if (!$rootScope.backToRoute){
              var route = next.$$route.originalPath;
              $.each(next.params, function(key, value){
                  route = route.replace(":"+ key, value);
              });
              $rootScope.backToRoute = route;
            }
            $location.path( "/login" );
        }
            
        
      }
      else
      {
        if (next.$$route && next.$$route.templateUrl == "views/_login.html" ) {
          $location.path( "/welcome" );
        }
        else{
          if(next.params.ctrl){//build route
              var ctrl = next.params.ctrl;
              var method = next.params.method;
              var id = next.params.id;
              var view = method == "new" || method == "edit"? "form" : (method? method : "index");
              next.$$route.templateUrl = "views/" + env.ident + "/" + ctrl+ "/_" + view + ".html";
              next.$$route.controller = ctrl.substr(0, 1).toUpperCase() + ctrl.substr(1) + "Ctrl";
              $rootScope.page = ctrl +  (method? "-" + method : "");
          }
        }   
      }
    });
 })