app.controller("LoginCtrl", ['$scope', '$rootScope', 'webServices', '$location', 'localStorageService', 'consts', 'avatarMan','avatarWoman', 'activities',function($scope, $rootScope, webServices, $location, localStorageService, consts,avatarMan,avatarWoman,activities){
		$scope.avatar = {man: avatarMan, woman: avatarWoman};
		$scope.activities = activities;
		/**
		 * STEP 7 : Game start
		 */
		var startGame = function(data, toSelect){
			$scope.setCompanies(data.companies);
			$scope.setCompany(toSelect || data.companies[0]);
			$scope.save();
			$location.path( "/welcome" );
			$scope.setLoading(false);
			$scope.$apply();
		};

		/**
		 * STEP 6 Create a company, if not exist, after go to 7
		 */
		$scope.company = {capital: 1, shares: 1}
		$scope.getMaxShare = function(){
			return 100 * $scope.company.capital;
		};
		$scope.createCompany = function(isValid){
			if (isValid)
				webServices.setCompany($scope.getCharacterId(), $scope.company.name, $scope.company.capital, $scope.company.shares, $scope.company.activity, function(company){
					startGame && startGame([company], company.id);
				});
		};
		
		/**
		 * STEP 5a Character has been loaded or created
		 */
		var onCharacterLoadedOrCreated = function(character){
			$scope.setCharacter(character);
			$scope.save();
			webServices.getMandatedCompanies($scope.getCharacterId(), function(data){
				if (data.companies && data.companies.length){
					startGame(data);
				}
				else{
					$location.path( "/new-company" );
					$scope.setLoading(false);
					$scope.$apply();
				}
					
			});
		};

		/**
		 * STEP 5b create character on the BDD, after, back to 5a
		 */
		$scope.character = {};
		$scope.createCharacter = function(isValid){
			if (isValid){
				webServices.setCharacter($scope.getUserId(), $scope.getUniversId(), $scope.character.name, $scope.character.avatar, onCharacterLoadedOrCreated);
			}
			
		};
		
		$scope.selectAvatar = function(id){
			$scope.character.avatar = id;
		};
		
		/**
		 * STEP 4: get caracter on the universe
		 */
		var getCharacter = function(){
			webServices.getCharacter($scope.getUserId(), $scope.getUniversId(), function(character){
				if (character.id){
					onCharacterLoadedOrCreated && onCharacterLoadedOrCreated(character);
				}
				else {
					$location.path( "/new-character" );
					$scope.setLoading(false);
					$scope.$apply();
				}
					
			});
		};

		/**
		 * STEP 3a: only one univers, direct choose
		 * @param  {Object} univers universe Object
		 */
		$scope.selectUnivers = function(univers){
			$scope.setUnivers(univers);
			$scope.save();
			getCharacter && getCharacter();
		};
		
		/**
		 * STEP 2: authentication success
		 * @param  {Object} user User object
		 */
		var onAuthSuccess = function(gameData){
			
			$scope.setLoading(true);
			//debug
			if(!gameData.user){
				gameData = {user: gameData}
				gameData.universes = [{id: -1, name: "My first univers"}];
			}

			$scope.setUser(gameData.user);
			$scope.setLanguage(gameData.user.i18n || consts.default_i18n);
			//TODO: écran de choix d'univers ici, rajouter liste d'univers au user (nom/id/descr/...)
			$scope.setUniverses(gameData.universes);
			$scope.save();
			if (true || gameData.universes.length === 1){//un seul univers
				$scope.selectUnivers(-1);
			}
			else if(0){//pas d'univers!
				/**
				 * STEP 3b: no universe, error message
				 */
				$location.path( "/no-univers" );
				$scope.setLoading(false);
			}
			else{
				/**
				 * STEP 3c: multiple universe, when choose back to 3a
				 */
				$location.path( "/choose-univers" );
				$scope.setLoading(false);
			}


			
		};

		/**
		 * STEP 1a: Auto log
		 */
		if ($scope.hasSave() && !$scope.isLogged()){
			onAuthSuccess($scope.load());
			//webServices.logByToken(localStorageService.get("authToken"), onAuthSuccess);
		};
			
		/**
		 * STEP 1b: log with form
		 */
		$scope.user = {};
		$scope.login = function(){
			webServices.logUser($scope.user.username, $scope.user.password, !!$scope.user.rememberMe, onAuthSuccess);
		};
		
		//debug
		//if (debugMode && !$scope.isLogged())
		//	onAuthSuccess && onAuthSuccess({"id":1,"lastName":"test","firstName":"test","login":"test","i18n":null});
}]);