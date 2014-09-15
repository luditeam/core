app.controller("CharacterCtrl", ['$scope', 'crudService', function($scope, crudService){

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