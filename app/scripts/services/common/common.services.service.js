app.service("commonServices",['$resource', function($resource){
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
                    contentType: type == this.Methods.PUT? 'application/json; charset=UTF-8' : "application/x-www-form-urlencoded; charset=UTF-8",
                    success: onSuccess || function(){},
                    error: onError || function(){console.error("Exception in service: "+ service)}
                });
        },
        _crud: function(uri, isListIsArray){
            var _that = this.cs;
            return $resource(_that._url + uri, {},
                { 
                    'update': {method: 'PUT'},
                    'query':  {method:'GET', isArray: isListIsArray === false? false : true},
                }
              );
        }
    }
}]);