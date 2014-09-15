app.service("crudService",['$location', '$routeParams', 'webServices', function($location, $routeParams, webServices){
    return {
        set: function($scope, queryParam, callbacks){
            $scope.params = $routeParams;
            var ctrl = $scope.params.ctrl;
            var populate = function(Model){
                $.each($scope.model, function(key, value){
                    Model[key] = $scope.values[key];
                });
            }
            var CRUD = webServices.crud(ctrl + "/:param/:id", false);
            $scope.toggleSearch = function(){
                $scope.searchActivated = !$scope.searchActivated;
            };

            var Model = new CRUD();
            $scope.setLoading(true);
           
            
            if ($scope.params.method == "list"){
                    $scope.items = CRUD.query(queryParam, function(response){
                    $scope.setLoading(false);
                });
            }
            else if($scope.params.method == "new"){
                $scope.setLoading(false);
            }
            else if($scope.params.method == "view"){
                $scope.setLoading(false);
            }
            else if($scope.params.method == "edit"){
                $scope.setLoading(false);
            }

            $scope.new = function(){
                $location.path( "/" + ctrl + "/new" );
            };
            $scope.edit = function(id){
                $location.path( "/" + ctrl + "/edit/"+id);//+id
            };
            $scope.process = function(method, isValid){
                if (isValid){
                    populate && populate(Model);
                    if (method == "edit"){
                        Model.$update(function(){
                            //notif messages.success.update
                        });
                    }
                    else
                    {
                        Model.$save(function(){
                            //notif messages.success.save
                        });
                    }
                }
                
            };
            $scope.delete = function(){
                Model.$delete(function(){
                    //notif
                });
            };
            return $scope;
        }
    };
}]);