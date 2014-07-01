app.service("webServices",['userPrefs', function(userPrefs){
	return {
		Methods: {GET: "GET", POST: "POST", PUT: "PUT", DELETE: "DELETE"},
		_url: "http://entrepreneur.luditest.cloudbees.net/rest/",
		_isMock : true,
		_get: function(service, type, params, onSuccess, onError){
			params = params || {};
			params.i18n = userPrefs.i18n;
			params.token = userPrefs.token;

			if(this._isMock){
				var url = "mocks/" + service.replace(/\//g, "_")+ ".json";
				console.log("Get mock: "+ url);
				$.ajax({
					dataType: "json",
					url: url,
					params: params || {},
					type: type || this.Methods.GET,
					success: onSuccess || function(){},
					error: onError || function(){console.error("Exception in service: "+ service)}
				});
			}
			else
				$.ajax({
					dataType: "jsonp",
					url: this._url + service + "?callback=?",
					type: type || this.Methods.GET,
					params: params || {},
					success: onSuccess || function(){},
					error: onError || function(){console.error("Exception in service: "+ service)}
				});
		},

		/*********************** COMPANY *******************************************/
		getCompany: function(id){
			var params = {};
			this._get("", this.Methods.GET, params, onSuccess, onError);
		},
		getMandatedCompanies: function(characterid){
			var params = {};
			this._get("company/mandatedcharacterid/"+characterid, this.Methods.GET, params, onSuccess, onError);
		},
		setCompany: function(){
			var params = {};
			this._get("", this.Methods.GET, params, onSuccess, onError);
		},
		updateCompany: function(){
			var params = {};
			this._get("", this.Methods.GET, params, onSuccess, onError);
		},
		deleteCompany: function(){
			var params = {};
			this._get("", this.Methods.GET, params, onSuccess, onError);
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
			var params = {login : login, password: password, rememberme: rememberme};
			this._get("user/login", this.Methods.POST, params, onSuccess, onError);
		},

		/*********************** USER *******************************************/
		logByToken: function(token, onSuccess, onError){
			var params = {token : token};
			this._get("user/login/token", this.Methods.POST, params, onSuccess, onError);
		},

		logout: function(token, onSuccess, onError){
			var params = {token : token};
			this._get("user/logout", this.Methods.POST, params, onSuccess, onError);
		},

		/*********************** /USER *******************************************/

		/*********************** WORKERS *******************************************/
		getCompanyWorkers: function(){
			var params = {};
			this._get("", this.Methods.GET, params, onSuccess, onError);
		}
		/*********************** /WORKERS *******************************************/



		

	}
}])