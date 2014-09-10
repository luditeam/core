app.controller("UniverseCtrl", ['$scope', '$rootScope', '$location', '$routeParams', 'webServices', function($scope, $rootScope, $location, $routeParams, webServices){
    $scope.searchActivated = false;
    $scope.toggleSearch = function(){
        $scope.searchActivated = !$scope.searchActivated;
        if ($scope.searchActivated){
            $(".search-field input").focus();
        }
    };

    //config
    var group = "universe";
    var CRUD = webServices.crud(group + "/:param/:id", false);
    var populate = function(){
        Model.userid = $scope.getUserId();
        Model.name = $scope.model.name;
    };

    //\config
    var Model = new CRUD();
    $scope.setLoading(true);
    $scope.params = $routeParams;
    if ($scope.params.method == "view"){
            $scope.universes = CRUD.query({param: "userid", id: $scope.getUserId()}, function(response){
            $scope.setLoading(false);
        });
    }
    else if($scope.params.method == "edit"){
        
    }
    
    $scope.new = function(){
        $location.path( "/" + group + "/new" );
    };
    $scope.edit = function(id){
        $location.path( "/" + group + "/edit/"+id);//+id
    };
    $scope.process = function(method, isValid){
        if (isValid){
            populate();
            if (method == "edit"){
                Model.$update(function(){
                    //notif
                });
            }
            else
            {
                Model.$save(function(){
                    //notif
                });
            }
        }
        
    };
    $scope.delete = function(){
        Model.$delete(function(){
            //notif
        });
    }
}]);