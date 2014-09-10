app.controller("UniverseCtrl", ['$scope', '$rootScope', '$location', '$routeParams', 'crudService', function($scope, $rootScope, $location, $routeParams, crudService){

    //config
    var ctrl = "universe";
    var queryParam = {param: "userid", id: $scope.getUserId()};
    var populate = function(Model){
        Model.userid = $scope.getUserId();
        Model.name = $scope.model.name;
    };
    //config
    $scope = crudService.set($scope, ctrl, queryParam, populate);
}]);