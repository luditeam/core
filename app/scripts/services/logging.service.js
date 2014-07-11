app.service("log",['$log', 'enums', function($log, enums){
	return {

		logLevel: enums.log_level.DEBUG,
		setLogLevel: function(value){
			this.logLevel = enums.log_level[value] || enums.log_level.ERROR;
		},
		debug: function(message){
			$log.debug(message);
		},
		info: function(message){
			$log.info(message);
		},
		warn: function(message){
			$log.warn(message);
		},
		error: function(message){
			$log.error(message);
		},
		log: function(message){
			$log.log(message);
		}
	}
}])