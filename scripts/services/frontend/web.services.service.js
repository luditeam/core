app.service("webServices",['commonServices', function(commonServices){
	return {
		
		cs: commonServices,
		/*********************** COMPANY *******************************************/
		getCompany: function(id){
			var params = {};
			this.cs._get("", this.cs.Methods.GET, params, onSuccess, onError);
		},
		/**
		 * Return company where user has mandate
		 * @param  {int} characterid
		 * @param  {function} onSuccess
		 * @param  {function} onError
		 * @return {undefined}
		 */
		getMandatedCompanies: function(characterid, onSuccess, onError){
			this.cs._get("company/mandatedcharacterid/"+characterid, this.cs.Methods.GET, null, onSuccess, onError);
		},
		/**
		 * Create a company
		 * @param {int} character_id
		 * @param {string} name
		 * @param {int} capital
		 * @param {int} shares
		 * @param {int} activity
		 * @param {function} onSuccess
		 * @param {function} onError
		 */
		setCompany: function(character_id, name, capital, shares, activity, onSuccess, onError){
			var params = {character_id: character_id, name: name, capital: capital, shares:shares, activity:activity};
			this.cs._get("company/", this.cs.Methods.POST, params, onSuccess, onError);
		},
		updateCompany: function(){
			var params = {};
			this.cs._get("", this.cs.Methods.GET, params, onSuccess, onError);
		},
		deleteCompany: function(){
			var params = {};
			this.cs._get("", this.cs.Methods.GET, params, onSuccess, onError);
		},

		getCompanyProduct: function(companyid, onSuccess, onError){
			this.cs._get("product/companyid/"+companyid, this.cs.Methods.GET, null, onSuccess, onError);
		},

		updateCompanyProduct: function(item, onSuccess, onError){
			var params = {item:item};
			delete params.hashKey;
			this.cs._get("product/", this.cs.Methods.PUT, params, onSuccess, onError);
		},
		/***********************  /COMPANY *******************************************/

		/*********************** SCHEDULE *******************************************/
		getScheduledTasks: function(characterid, onSuccess, onError){
			var params = {};
			this.cs._get("schedule/characterid/"+characterid, this.cs.Methods.GET, params, onSuccess, onError);
		},
		setScheduledTasks: function(){
			var params = {};
			this.cs._get("", this.cs.Methods.GET, params, onSuccess, onError);
		},

		/*********************** /SCHEDULE *******************************************/

		/*********************** TASK *******************************************/
		getCompanyTasks: function(companyid){
			var params = {};
			this.cs._get("task/companyid/"+companyid, this.cs.Methods.GET, params, onSuccess, onError);
		},
		updateCompanyTasks: function(){
			var params = {};
			this.cs._get("", this.cs.Methods.GET, params, onSuccess, onError);
		},
		deleteCompanyTask: function(taskId){
			var params = {};
			this.cs._get("task/id/"+ taskId, this.cs.Methods.GET, params, onSuccess, onError);
		},

		/*********************** /TASK *******************************************/

		/*********************** USER *******************************************/
		logUser: function(login, password, rememberme, onSuccess, onError){
			var params = {login : login, password: password/*, rememberme: rememberme*/};
			this.cs._get("user/login", this.cs.Methods.POST, params, onSuccess, onError);
		},
		logByToken: function(token, onSuccess, onError){
			var params = {token : token};
			this.cs._get("user/login/token", this.cs.Methods.POST, params, onSuccess, onError);
		},

		logout: function(token, onSuccess, onError){
			var params = {token : token};
			this.cs._get("user/logout", this.cs.Methods.POST, params, onSuccess, onError);
		},

		/*********************** /USER *******************************************/

		/**************************** CHARACTER **********************************/
		getCharacter: function(user_id, universe_id, onSuccess, onError){
			this.cs._get("gamecharacter/userid/"+user_id+"/universeid/"+universe_id, this.cs.Methods.GET, null, onSuccess, onError);
		},

		setCharacter: function(user_id, universe_id, name, avatar_id, onSuccess, onError){
			var params = {user_id: user_id, universe_id: universe_id, name:name, avatar_id:avatar_id};
			this.cs._get("gamecharacter/", this.cs.Methods.POST, params, onSuccess, onError);
		},
		/****************************** /CHARACTER *******************************/

		/*********************** WORKERS *******************************************/
		getCompanyWorkers: function(){
			var params = {};
			this.cs._get("", this.cs.Methods.GET, params, onSuccess, onError);
		},
		/*********************** /WORKERS *******************************************/
		endTurn: function(gamecharacter_id, onSuccess, onError){
			var params = {gamecharacter_id: gamecharacter_id};
			this.cs._get("gamecharacter/endturn", this.cs.Methods.POST, params, onSuccess, onError);
		}	
	}
}]);