app.service("webServices",[function(){
	return {
		Methods: {GET: "GET", POST: "POST", PUT: "PUT", DELETE: "DELETE"}
		_url: "http://entrepreneur.luditest.cloudbees.net/rest/",
		_get: function(service, type, onSuccess, onError){
			$.ajax({
				url: this._url + service,
				type: type,
				params: params,
				onSuccess: onSuccess,
				onError: onError
			});
		},
		/*********************** COMPANY *******************************************/
		getCompany: function(id){
			this._get("", this.Methods.GET, onSuccess, onError);
		},
		getMandatedUserCompanies: function(){
			this._get("", this.Methods.GET, onSuccess, onError);
		},
		setCompany: function(){
			this._get("", this.Methods.GET, onSuccess, onError);
		},
		updateCompany: function(){
			this._get("", this.Methods.GET, onSuccess, onError);
		},
		deleteCompany: function(){
			this._get("", this.Methods.GET, onSuccess, onError);
		},

		/***********************  /COMPANY *******************************************/

		/*********************** SCHEDULE *******************************************/
		getScheduledTasks: function(id){
			this._get("", this.Methods.GET, onSuccess, onError);
		},
		setScheduledTasks: function(){
			this._get("", this.Methods.GET, onSuccess, onError);
		},

		/*********************** /SCHEDULE *******************************************/

		/*********************** TASK *******************************************/
		getCompanyTasks: function(){
			this._get("", this.Methods.GET, onSuccess, onError);
		},
		updateCompanyTasks: function(){
			this._get("", this.Methods.GET, onSuccess, onError);
		},
		deleteCompanyTask: function(){
			this._get("", this.Methods.GET, onSuccess, onError);
		},

		/*********************** /TASK *******************************************/

		/*********************** USER *******************************************/
		logUser: function(login, password){
			this._get("user/"+login+"/password/"+password, this.Methods.POST, onSuccess, onError);
		},

		/*********************** /USER *******************************************/

		/*********************** WORKERS *******************************************/
		getCompanyWorkers: function(){
			this._get("", this.Methods.GET, onSuccess, onError);
		}
		/*********************** /WORKERS *******************************************/



		

	}
}])