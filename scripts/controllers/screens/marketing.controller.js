app.controller("MarketingCtrl", ['$scope', '$rootScope', '$location', 'webServices', function($scope, $rootScope, $location, webServices){
	$scope.setLoading(true);
	$scope.products = null;
	webServices.getCompanyProduct($scope.getCompanyId(), function(products){
		$scope.setLoading(false);
		$scope.products = products;
		$scope.$apply();
	}, function(){$scope.setLoading(false);});
	var timer = null;
	$scope.updateProduct = function(product){
		if (timer){
			clearTimeout(timer);
		}
		timer = setTimeout(function(){
			console.warn(product);
			webServices.updateCompanyProduct(product.id, product.salesForecast, product.sellingPrice, function(){
				//notif
			});
		}, 2000);
	}
}]);