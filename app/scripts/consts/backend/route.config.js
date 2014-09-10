app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        
        $routeProvider
          .when('/:ctrl/:method'/*:id*/, {
            //templateUrl: 'views/backend/universe/_list.html',
            //controller: 'UniverseCtrl',
            //controllerAs: 'universe'
          })
          .when('/:ctrl/:method/:id'/*:id*/, {
            //templateUrl: 'views/backend/universe/_view.html',
            //controller: 'UniverseCtrl',
            //controllerAs: 'universe'
          })
          /*.when('/universe/:method'/*:id, {
            templateUrl: 'views/backend/universe/_form.html',
            controller: 'UniverseCtrl',
            controllerAs: 'universe'
          })*/

          

          /*.when('/universe/edit/:id':id, {
            templateUrl: 'views/backend/universe/_form.html',
            controller: 'UniverseCtrl',
            controllerAs: 'universe'
          })*/

      // configure html5 to get links working on jsfiddle
      //$locationProvider.html5Mode(true);
  }]);
