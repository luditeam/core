var debugMode = true;
app.controller("RootCtrl", ['$rootScope', '$scope', '$location', 'webServices', 'localStorageService', 'userPrefs', function($rootScope, $scope, $location, webServices, localStorageService, userPrefs){
	
	$rootScope.session = {
		user: null,
		universes: null,
		character: null,
		companies: null,
		selected: {
			univers: 0,
			company: 0
		}
	};

	$rootScope.page = "";
	/****************************************** USER *********************************************************/
	$scope.setUser = function(user){
		$rootScope.session.user = user;
	}
	$scope.setLanguage = function(language){
		if($rootScope.session.user)
			$rootScope.session.user.i18n = language;
		//else
			//throw
	}
	$scope.logOut = function(){
		webServices.logout(localStorageService.get("authToken"), function(){
			$location.path( "/login" );
			$scope.$apply();
		});
		localStorageService.set("authToken", null);
		userPrefs.token = null;
	}


	$scope.isLogged = function(){
		return $rootScope.session.user !== null;
	}

	$scope.getUserId = function(){
		return $rootScope.session.user.id;
	}
	/****************************************** UNIVERSES *********************************************************/
	$scope.setUniverses = function(universes){
		$rootScope.session.universes = universes;
	}
	$scope.setUnivers = function(id){
		if($rootScope.session.universes){
			for(var i = 0; i < $rootScope.session.universes.length; i++){
				if ($rootScope.session.universes[i].id == id){
					$rootScope.session.selected.univers = i;
					return;
				}
			}
			//throw
		}
			
	}
	
	$scope.getUnivers = function(){
		if (!isNaN($rootScope.session.selected.univers))
			return $rootScope.session.universes[$rootScope.session.selected.univers];
		//throw
	}
	$scope.getUniversId = function(){
		return $scope.getUnivers().id;
	}

	/****************************************** CHARACTER *********************************************************/

	$scope.setCharacter = function(character){
		$rootScope.session.character = character;
	}
	
	$scope.getCharacter = function(){
		return $rootScope.session.character;
	}

	$scope.getCharacterId = function(){
		return $rootScope.session.character.id;
	}

	/****************************************** COMPANIES *********************************************************/
	$scope.setCompanies = function(companies){
		$rootScope.session.companies = companies;
	}
	$scope.setCompany = function(id){
		if($rootScope.session.companies && $rootScope.session.companies.length && id > 0 && id < $rootScope.session.companies.length)
			$rootScope.session.selected.company = id;
	}
	$scope.getCompany = function(){
		if (!isNaN($rootScope.session.selected.company))
			return $rootScope.session.companies[$rootScope.session.selected.company];
	}
	$scope.getCompanysId = function(){
		return $scope.getCompany().id;
	}

	

	/****************************************** END TURN *********************************************************/
	$scope.endTurn = function(){
		
	}
}])