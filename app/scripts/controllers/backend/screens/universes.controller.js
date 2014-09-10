app.controller("UniverseCtrl", ['$scope', '$rootScope', '$location', '$routeParams', 'webServices', function($scope, $rootScope, $location, $routeParams, webServices){
	$scope.searchActivated = false;
	$scope.toggleSearch = function(){
		$scope.searchActivated = !$scope.searchActivated;
		if ($scope.searchActivated){
			$(".search-field input").focus();
		}
	};


	$scope.setLoading(true);
	var CRUD = webServices.crud("universe/userid/:id", false);

	$scope.model = new CRUD();
	$scope.universes = CRUD.query({id: $scope.getUserId()}, function(response){
		$scope.setLoading(false);
	});
	$scope.params = $routeParams;
	
	$scope.new = function(){
		$location.path( "/universe/new" );
	};
	$scope.edit = function(id){
		$location.path( "/universe/edit/"+id);//+id

	};
	$scope.create = function(){
		$scope.model.$save(function(){
			//notif
		});
	};

	$scope.update = function(){
		$scope.model.$update(function(){
			//notif
		});
	}

	$scope.delete = function(){
		$scope.model.$delete(function(){
			//notif
		});
	}
}]);