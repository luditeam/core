
app.run( function($rootScope, $location) {
    $rootScope.unSecuredRoute = ["/cgu", "/cnil", "/retrieve-password"];
    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ($rootScope.session.user === null) {
        // no logged user, we should be going to #login
        
        if (!next.$$route || next.$$route.templateUrl != "views/_login.html" ) {
          if(!next.$$route || $rootScope.unSecuredRoute.indexOf(next.$$route.originalPath) == -1){
              if (next.$$route)
                $rootScope.backToRoute = next.$$route.originalPath;
              $location.path( "/login" );
          }
            
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