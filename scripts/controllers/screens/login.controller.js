app.controller("LoginCtrl", ['$scope', '$rootScope', 'webServices', '$location', function($scope, $rootScope, webServices, $location){
		$scope.username = "";
		$scope.password = "";
		$scope.rememberMe = false;
		$scope.login = function(){
			webServices.logUser($scope.username, $scope.password, $scope.rememberMe, function(data){
				$rootScope.user = data;
				$rootScope.user.logged = true;
				$location.path( "/welcome" );
			});
		}
		
}])