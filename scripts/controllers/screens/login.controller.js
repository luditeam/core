app.controller("LoginCtrl", ['$scope', '$rootScope', 'webServices', '$location', 'localStorageService', 'userPrefs', function($scope, $rootScope, webServices, $location, localStorageService, userPrefs){
		$scope.username = "";
		$scope.password = "";
		$scope.rememberMe = false;
		$scope.autoAuthInProgress = localStorageService.get("authToken") != null;
		
		var onAuthSuccess = function(data){
			$rootScope.user = data.user;
			$rootScope.user.logged = true;
			userPrefs.token = data.token? data.token : null;
			localStorageService.set("authToken", data.token? data.token : null);
			$location.path( "/welcome" );
			$scope.$apply();
		}

		if ($scope.autoAuthInProgress)
			setTimeout(function(){
				webServices.logByToken(localStorageService.get("authToken"), onAuthSuccess);
			}, 1000);
			

		$scope.login = function(){
			webServices.logUser($scope.username, $scope.password, $scope.rememberMe, onAuthSuccess);
		}
		
}])