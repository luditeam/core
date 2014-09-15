app.controller("UniverseCtrl", ['$scope', 'crudService', function($scope, crudService){

    //config
    $scope.model = [
                {
                    name: "userid",
                    value: $scope.getUserId(),
                    type: "hidden",
                    constraints: {
                        editable: false
                    }
                 },
                {
                    name: "name",
                    type: "text",
                    constraints: {
                        min: 3,
                        max: 255,
                        required: true
                    },
                    label: "NAME",

                 },
    ];
    var queryParam = {param: "userid", id: $scope.getUserId()};
    var callbacks = {
        query: function(){},
        get: function(){},
        save: function(){},
        update: function(){},
    };
    //config
    $scope = crudService.set($scope, queryParam, callbacks);
}]);