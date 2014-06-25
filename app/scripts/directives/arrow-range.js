app.directive('arrowrange', function () {
         return {
         	scope:{
         		min: "=",
         		max: "=",
         		value: "=",
         		onValueChange: "=",
         		onMin: "=",
         		onMax: "="
         	},
            restrict:"EA",
            replace: false,
            template: '<div class="row"><div ng-click="down()" class="col-md-4 col-xs-4 col-lg-4 left-arrow" ng-class="{\'disabled\': value <= min}"><</div><div class="col-md-4 col-xs-4 col-lg-4 value">{{value}}</div><div ng-click="up()" class="col-md-4 col-xs-4 col-lg-4 right-arrow" ng-class="{\'disabled\': value >= max}">></div></div>',
            link:function ($scope, elm, attrs) {
                 $scope.down = function(){
                 	if ($scope.value > $scope.min){
                 		$scope.value--;
                 		$scope.onValueChange && $scope.onValueChange($scope.value + 1, $scope.value);
                 	}
                 	else
                 		$scope.onMin && $scope.onMin();
                 		
                 }	
                 $scope.up = function(){
                 	if ($scope.max){
                 		$scope.value++;
                 		$scope.onValueChange && $scope.onValueChange($scope.value - 1, $scope.value);
                 	}
                 	else
                 		$scope.onMax && $scope.onMax();
                 		
                 }
                 $scope.value = parseInt($scope.value);

            }
         };
     }); 