app.controller("TopMenuCtrl", ['$scope', function($scope){
	$scope.getUnreadTasks = function(){
		return 0;
	};
	$scope.getUnreadMessages = function(){
		return 0;
	};
	$scope.getUnreadAlerts = function(){
		return 0;
	};
}]);