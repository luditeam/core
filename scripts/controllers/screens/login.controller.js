app.controller("LoginCtrl", ['$scope', '$rootScope', 'webServices', '$location', 'localStorageService', 'userPrefs', function($scope, $rootScope, webServices, $location, localStorageService, userPrefs){
		$scope.autoAuthInProgress = localStorageService.get("authToken") != null;
		
		/**
		 * STEP 7 : Game start
		 */
		var startGame = function(data){
			$scope.setCompanies(data.companies);
			$location.path( "/welcome" );
			$scope.$apply();
		}

		/**
		 * STEP 6 Create a company, if not exist, after go to 7
		 */
		$scope.createCompany = function(){
			webServices.setCompany($scope.getCharacterId(), $scope.company.name, $scope.company.capital, $scope.company.shares, $scope.company.activity, startGame);
		}	
		
		/**
		 * STEP 5a Character has been loaded or created
		 */
		var onCharacterLoadedOrCreated = function(character){
			$scope.setCharacter(character);
			
			webServices.getMandatedCompanies($scope.getCharacterId(), function(data){
				if (data.companies && data.companies.length){
					startGame(data);
				}
				else{
					$location.path( "/new-company" );
					$scope.$apply();
				}
					
			});
		}

		/**
		 * STEP 5b create character on the BDD, after, back to 5a
		 */
		$scope.createCharacter = function(){
			//debug
			$scope.character.avatar = 1;
			webServices.setCharacter($scope.getUserId(), $scope.getUniversId(), $scope.character.name, $scope.character.avatar, onCharacterLoadedOrCreated);
		}
		
		
		
		/**
		 * STEP 4: get caracter on the universe
		 */
		var getCharacter = function(){
			webServices.getCharacter($scope.getUserId(), $scope.getUniversId(), function(character){
				if (character.id){
					onCharacterLoadedOrCreated && onCharacterLoadedOrCreated(character);
				}
				else{
					$location.path( "/new-character" );
					$scope.$apply();
				}
					
			});
		}

		/**
		 * STEP 3a: only one univers, direct choose
		 * @param  {Object} univers universe Object
		 */
		$scope.selectUnivers = function(univers){
			$scope.setUnivers(univers);
			getCharacter && getCharacter();
		}
		
		/**
		 * STEP 2: authentication success
		 * @param  {Object} user User object
		 */
		var onAuthSuccess = function(gameData){
			//debug
			gameData = {user: gameData}
			gameData.universes = [{id: -1, name: "My first univers"}];

			$scope.setUser(gameData.user);
			$scope.setLanguage(gameData.user.i18n || userPrefs.i18n);

			//userPrefs.token = gameData.user.token? gameData.user.token : null;
			//localStorageService.set("authToken", gameData.user.token? gameData.user.token : null);
			
			//TODO: écran de choix d'univers ici, rajouter liste d'univers au user (nom/id/descr/...)
			$scope.setUniverses(gameData.universes);
			if (true || gameData.universes.length === 1){//un seul univers
				$scope.selectUnivers(-1);
			}
			else if(0){//pas d'univers!
				/**
				 * STEP 3b: no univers, error message
				 */
				$location.path( "/no-univers" );
			}
			else
				/**
				 * STEP 3c: multiple universe, when choose back to 3a
				 */
				$location.path( "/choose-univers" );

			
		}

		/**
		 * STEP 1a: Auto log
		 */
		if ($scope.autoAuthInProgress && !$scope.isLogged())
			webServices.logByToken(localStorageService.get("authToken"), onAuthSuccess);

		/**
		 * STEP 1b: log with form
		 */
		$scope.login = function(){
			webServices.logUser($scope.user.username, $scope.user.password, !!$scope.user.rememberMe, onAuthSuccess);
		}
		
		//debug
		if (debugMode && !$scope.isLogged())
			onAuthSuccess && onAuthSuccess({"id":1,"lastName":"test","firstName":"test","login":"test","i18n":null});
}])