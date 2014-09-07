var debugMode = true;
app.controller("RootCtrl", ['$rootScope', '$scope', '$location', '$log','webServices', 'localStorageService', 'avatarMan','avatarWoman', function($rootScope, $scope, $location, $log, webServices, localStorageService, avatarMan,avatarWoman){
	
	$scope.catchException = function(type, message){
		switch (type){
			case "ERROR": 
				$log.error(message);
				break;
			case "WARNING":
				$log.warn(message);
				break;
			case "INFO": 
				$log.info(message);
				break;
			default:
				$log.log(message);
				break;
		}
	};

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

	$scope.loading = false;
	/****************************************** SAVE *********************************************************/
	$scope.save = function(){
		localStorageService.set("user_session", $rootScope.session);
	};
	$scope.load = function(){
		return localStorageService.get("user_session");
	};
	$scope.hasSave = function(){
		return localStorageService.get("user_session") != null;
	};
	/****************************************** USER *********************************************************/
	$scope.setUser = function(user){
		$rootScope.session.user = user;
	};
	$scope.setLanguage = function(language){
		if($rootScope.session.user)
			$rootScope.session.user.i18n = language;
		else
			$scope.catchException("ERROR", "No user defined");
	};
	$scope.logOut = function(){
		webServices.logout($scope.getUserId(), function(){
			$location.path( "/login" );
			localStorageService.set("user_session", null);
			$scope.$apply();
		});
		
	};


	$scope.isLogged = function(){
		return $rootScope.session.user !== null;
	};

	$scope.getUserId = function(){
		return $rootScope.session.user.id;
	};
	/****************************************** UNIVERSES *********************************************************/
	$scope.setUniverses = function(universes){
		$rootScope.session.universes = universes;
	};
	$scope.setUnivers = function(id){
		if($rootScope.session.universes){
			for(var i = 0; i < $rootScope.session.universes.length; i++){
				if ($rootScope.session.universes[i].universe.id == id){
					$rootScope.session.selected.univers = $rootScope.session.universes[i].universe;
					return;
				}
			}
			$scope.catchException("ERROR", "Universe ID not found");
		}
			
	};
	
	$scope.getUnivers = function(){
		if ($rootScope.session.selected.univers)
			return $rootScope.session.selected.univers;
		$scope.catchException("ERROR", "No universe selected");
	};
	$scope.getUniversId = function(){
		return $scope.getUnivers().id;
	};

	/****************************************** CHARACTER *********************************************************/

	$scope.setCharacter = function(character){
		var avatars = character.avatarId % 2 != 0? avatarMan : avatarWoman;
		for (var i = 0; i < avatars.length; i++)
			if (avatars[i].id == character.avatarId){
				character.avatarUrl = "images/avatar/"+avatars[i].file;
				break;
			}
		$rootScope.session.character = character;

	};
	
	$scope.getCharacter = function(){
		return $rootScope.session.character;
	};

	$scope.getCharacterId = function(){
		if($rootScope.session.character)
			return $rootScope.session.character.id;
		return 0;
	};
	$scope.getCharacterName = function(){
		if($rootScope.session.character)
			return $rootScope.session.character.name;
		return "";
	};
	$scope.getMoney = function(){
		if ($rootScope.session.character)
			return $rootScope.session.character.personalBankAccount.balance.amount;
		return 0;
	};

	$scope.getAvatarUrl = function(){
		return $rootScope.session.character.avatarUrl
	}

	$scope.hasCharacter = function(){
		return $rootScope.session.character != null;
	};
	/****************************************** COMPANIES *********************************************************/
	$scope.setCompanies = function(companies){
		$rootScope.session.companies = companies;
	};

	$scope.setCompany = function(id){
		if($rootScope.session.companies && $rootScope.session.companies.length)
			$rootScope.session.selected.company = id;
	};
	$scope.getCompany = function(){
		if ($rootScope.session.selected.company){
			return $rootScope.session.selected.company;
		}
		$scope.catchException("ERROR", "No company selected");
	};
	$scope.getCompanyId = function(){
		return $scope.getCompany().id;
	};


	$scope.getCompanyName = function(){
		if ($rootScope.session.selected.company)
			return $scope.getCompany().corporateName
		return "";
	}

	$scope.hasCompany = function(){
		return $rootScope.session.companies !== null && $rootScope.session.selected.company;
	};
	/****************************************** END TURN *********************************************************/
	$scope.endTurn = function(){
		webServices.endTurn($scope.getCharacterId(), function(company){
			//notif
		});
	};

	$scope.truncate = function(i_string, max_length){
		if(i_string && max_length)
			return i_string.substring(0,max_length) + (i_string.length > max_length? "...": "");
		return "";
	}

	$scope.setLoading = function(state){
		$scope.loading = state;
	}
}]);