app.directive('gravatarImage', function () {
         return {
         	scope:{
         		min: "?",
         		max: "?",
         		value: "?"
         		onValueChange: "&",
         		onMin: "&",
         		onMax: "&"
         	}
            restrict:"EA",
            replace: true,
            template: '<div ng-click="down()" class="left-arrow" ng-class="{\'disabled\': value > min}"></div><div class="value">{{value}}</div><div ng-click="up()" class="right-arrow" ng-class="{\'disabled\': value >= max}"></div>'
            link:function ($scope, elm, attrs) {
                 $scope.up = function(){
                 	if ($scope.value > $scope.min){
                 		$scope.value--;
                 		$scope.onValueChange && $scope.onValueChange();
                 	}
                 	else
                 		$scope.onMin && $scope.onMin();
                 		
                 }	
                 $scope.down = function(){
                 	if ($scope.value < $scope.max){
                 		$scope.value++;
                 		$scope.onValueChange && $scope.onValueChange();
                 	}
                 	else
                 		$scope.onMax && $scope.onMax();
                 		
                 }
                 $scope.value = parseInt($scope.value);
            });
         }};
     }); 