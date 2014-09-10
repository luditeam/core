app.service("webServices",['commonServices', function(commonServices){
	return {
		
		cs: commonServices,
		crud: commonServices._crud,
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
		/*getUniverses: function(user_id, onSuccess, onError){
			this.cs._get("universe/userid/"+user_id, this.cs.Methods.GET, null, onSuccess, onError);
		},
		createUniverse: function(user_id, name, onSuccess, onError){
			var params = {userid : user_id, name: name};
			this.cs._get("universe/", this.cs.Methods.POST, params, onSuccess, onError);
		}*/
	}
}]);