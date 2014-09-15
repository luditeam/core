app.controller("CompanyCtrl", ['$scope', 'crudService', function($scope, crudService){

    //config
    var ctrl = "company";
    var queryParam = {};
    var populate = function(Model){
        Model.userid = $scope.getUserId();
        Model.name = $scope.model.name;
    };
    //config
    $scope = crudService.set($scope, ctrl, queryParam, populate);
}]);