app.service("webServices",[ function(){
	return {
		Methods: {GET: "GET", POST: "POST", PUT: "PUT", DELETE: "POST"},
		_url: "http://prod1.luditeam.com/entrepreneur-server/rest/",
		_isMock : false,
		_isJsonp : false,
		_get: function(service, type, params, onSuccess, onError){
			params = params || {};

			if(this._isMock){
				var url = "mocks/" + service.replace(/\//g, "_")+ ".json";
				console.log("Get mock: "+ url);
				$.ajax({
					dataType: "json",
					url: url,
					contentType: 'application/json; charset=UTF-8',
					data: params || {},
					type: type || this.Methods.GET,
					success: onSuccess || function(){},
					error: onError || function(){console.error("Exception in service: "+ service)}
				});
			}
			else
				$.ajax({
					dataType: this._isJsonp? "jsonp" : "json",
					url: this._url + service + (this._isJsonp? "?callback=?" : ""),
					type: type || this.Methods.GET,
					data: params || null,
					contentType: 'application/json; charset=UTF-8',
					success: onSuccess || function(){},
					error: onError || function(){console.error("Exception in service: "+ service)}
				});
		},

		/*********************** COMPANY *******************************************/
		getCompany: function(id){
			var params = {};
			this._get("", this.Methods.GET, params, onSuccess, onError);
		},
		/**
		 * Return company where user has mandate
		 * @param  {int} characterid
		 * @param  {function} onSuccess
		 * @param  {function} onError
		 * @return {undefined}
		 */
		getMandatedCompanies: function(characterid, onSuccess, onError){
			this._get("company/mandatedcharacterid/"+characterid, this.Methods.GET, null, onSuccess, onError);
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
			this._get("company/", this.Methods.POST, params, onSuccess, onError);
		},
		updateCompany: function(){
			var params = {};
			this._get("", this.Methods.GET, params, onSuccess, onError);
		},
		deleteCompany: function(){
			var params = {};
			this._get("", this.Methods.GET, params, onSuccess, onError);
		},

		getCompanyProduct: function(companyid, onSuccess, onError){
			this._get("product/companyid/"+companyid, this.Methods.GET, null, onSuccess, onError);
		},

		updateCompanyProduct: function(item_id, sales_forecast, selling_price, onSuccess, onError){
			var params = {item_id:item_id, sales_forecast:sales_forecast, selling_price:selling_price};
			this._get("product/", this.Methods.PUT, params, onSuccess, onError);
		},
		/***********************  /COMPANY *******************************************/

		/*********************** SCHEDULE *******************************************/
		getScheduledTasks: function(characterid, onSuccess, onError){
			var params = {};
			this._get("schedule/characterid/"+characterid, this.Methods.GET, params, onSuccess, onError);
		},
		setScheduledTasks: function(){
			var params = {};
			this._get("", this.Methods.GET, params, onSuccess, onError);
		},

		/*********************** /SCHEDULE *******************************************/

		/*********************** TASK *******************************************/
		getCompanyTasks: function(companyid){
			var params = {};
			this._get("task/companyid/"+companyid, this.Methods.GET, params, onSuccess, onError);
		},
		updateCompanyTasks: function(){
			var params = {};
			this._get("", this.Methods.GET, params, onSuccess, onError);
		},
		deleteCompanyTask: function(taskId){
			var params = {};
			this._get("task/id/"+ taskId, this.Methods.GET, params, onSuccess, onError);
		},

		/*********************** /TASK *******************************************/

		/*********************** USER *******************************************/
		logUser: function(login, password, rememberme, onSuccess, onError){
			var params = {login : login, password: password/*, rememberme: rememberme*/};
			this._get("user/login", this.Methods.POST, params, onSuccess, onError);
		},
		logByToken: function(token, onSuccess, onError){
			var params = {token : token};
			this._get("user/login/token", this.Methods.POST, params, onSuccess, onError);
		},

		logout: function(token, onSuccess, onError){
			var params = {token : token};
			this._get("user/logout", this.Methods.POST, params, onSuccess, onError);
		},

		/*********************** /USER *******************************************/

		/**************************** CHARACTER **********************************/
		getCharacter: function(user_id, universe_id, onSuccess, onError){
			this._get("gamecharacter/userid/"+user_id+"/universeid/"+universe_id, this.Methods.GET, null, onSuccess, onError);
		},

		setCharacter: function(user_id, universe_id, name, avatar_id, onSuccess, onError){
			var params = {user_id: user_id, universe_id: universe_id, name:name, avatar_id:avatar_id};
			this._get("gamecharacter/", this.Methods.POST, params, onSuccess, onError);
		},
		/****************************** /CHARACTER *******************************/

		/*********************** WORKERS *******************************************/
		getCompanyWorkers: function(){
			var params = {};
			this._get("", this.Methods.GET, params, onSuccess, onError);
		}
		/*********************** /WORKERS *******************************************/



		

	}
}])