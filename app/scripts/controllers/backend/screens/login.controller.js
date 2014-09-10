app.controller("LoginCtrl", ['$scope', '$rootScope', 'webServices', '$location','$timeout','localStorageService', 'consts', function($scope, $rootScope, webServices, $location, $timeout, localStorageService, consts){
                /**
         * STEP 7 : Game start
         */
        var startGame = function(){
            $timeout(function() {
                $location.path($rootScope.backToRoute? $rootScope.backToRoute : "/welcome");
                $rootScope.backToRoute = null;
                $scope.setLoading(false);
                $scope.$apply();
            }, 0);
        };
        /**
         * STEP 2: authentication success
         * @param  {Object} user User object
         */
        var onAuthSuccess = function(gameData){
            
            $scope.setLoading(true);
            $scope.setUser(gameData.user);
            $scope.setLanguage(gameData.user.i18n || consts.default_i18n);
            $scope.save();
            startGame && startGame();
        };

        /**
         * STEP 1a: auto log
         */
        if ($scope.hasSave() && !$scope.isLogged()){
            onAuthSuccess($scope.load());
            //webServices.logByToken(localStorageService.get("authToken"), onAuthSuccess);
        };
            
        /**
         * STEP 1b: log with form
         */
        $scope.user = {};
        $scope.login = function(){
            webServices.logUser($scope.user.username, $scope.user.password, !!$scope.user.rememberMe, onAuthSuccess);
        };
        
        //debug
        //if (debugMode && !$scope.isLogged())
        //  onAuthSuccess && onAuthSuccess({"id":1,"lastName":"test","firstName":"test","login":"test","i18n":null});
}]);