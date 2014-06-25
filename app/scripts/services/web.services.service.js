app.service("webServices",[function(){
	return {
		Methods: {GET: "GET", POST: "POST", PUT: "PUT", DELETE: "DELETE"},
		_url: "http://entrepreneur.luditest.cloudbees.net/rest/",
		_get: function(service, type, params, onSuccess, onError){
			$.ajax({
				dataType: "jsonp",
				url: this._url + service + "?callback=?",
				type: type || this.Methods.GET,
				params: params || {},
				onSuccess: onSuccess || function(){},
				onError: onError || function(){console.error("Exception in service: "+ service)}
			});
		},
		/*********************** COMPANY *******************************************/
		getCompany: function(id){
			this._get("", this.Methods.GET, params, onSuccess, onError);
		},
		getMandatedCompanies: function(characterid){
			this._get("company/mandatedcharacterid/"+characterid, this.Methods.GET, params, onSuccess, onError);
		},
		setCompany: function(){
			this._get("", this.Methods.GET, params, onSuccess, onError);
		},
		updateCompany: function(){
			this._get("", this.Methods.GET, params, onSuccess, onError);
		},
		deleteCompany: function(){
			this._get("", this.Methods.GET, params, onSuccess, onError);
		},

		/***********************  /COMPANY *******************************************/

		/*********************** SCHEDULE *******************************************/
		getScheduledTasks: function(characterid, onSuccess, onError){
			this._get("schedule/characterid/"+characterid, this.Methods.GET, params, onSuccess, onError);
		},
		setScheduledTasks: function(){
			this._get("", this.Methods.GET, params, onSuccess, onError);
		},

		/*********************** /SCHEDULE *******************************************/

		/*********************** TASK *******************************************/
		getCompanyTasks: function(companyid){
			this._get("task/companyid/"+companyid, this.Methods.GET, params, onSuccess, onError);
		},
		updateCompanyTasks: function(){
			this._get("", this.Methods.GET, params, onSuccess, onError);
		},
		deleteCompanyTask: function(taskId){
			this._get("task/id/"+ taskId, this.Methods.GET, params, onSuccess, onError);
		},

		/*********************** /TASK *******************************************/

		/*********************** USER *******************************************/
		logUser: function(login, password, rememberme, onSuccess, onError){
			var params = {login : login, password: password, rememberme: rememberme};
			this._get("user/login", this.Methods.POST, params, onSuccess, onError);
		},

		/*********************** /USER *******************************************/

		/*********************** WORKERS *******************************************/
		getCompanyWorkers: function(){
			this._get("", this.Methods.GET, params, onSuccess, onError);
		}
		/*********************** /WORKERS *******************************************/



		

	}
}])