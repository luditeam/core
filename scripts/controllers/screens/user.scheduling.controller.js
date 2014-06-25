app.controller("UserSchedulingCtrl", ['$scope', '$routeParams', 'webServices', function($scope, $routeParams, webServices){
	$scope.min = 0;
	$scope.max = 0;
	$scope.valueLoaded = false;
	$scope.value= {
		sleep: 8,
		friend_relationship: 1,
		personal_learning: 2,
		divertisement: 1,
		company_work: 4,
		company_relationship: 2,
		employees_relationship: 2,
		investisor_relationship: 2,
		salary_work: 2
	};
	$scope.onMin= function(){

	}
	$scope.onMax = function(){

	}
	$scope.onValueChange = function(oldValue, newValue){
		$scope.max += oldValue - newValue
	}
	try{
		webServices.getScheduledTasks($scope.user.characterId, function(data){
			if (data){
				$scope.value = data;
			}
			$scope.valueLoaded = true;
		});
	}
	catch(e){
		$location.path( "/error/"+encodeURIComponent(e.message));
	}
}])