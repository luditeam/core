
app.controller("RootCtrl", ['$rootScope', '$scope', '$location', 'webServices', 'localStorageService', 'userPrefs', function($rootScope, $scope, $location, webServices, localStorageService, userPrefs){
	$rootScope.user = {};
	$rootScope.page = "";

	$scope.logOut = function(){
		webServices.logout(localStorageService.get("authToken"), function(){
			$location.path( "/login" );
			$scope.$apply();
		});
		localStorageService.set("authToken", null);
		userPrefs.token = null;
	}
}])