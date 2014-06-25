app.value("enums", {
	login_state: {
		SUCCESS: "success",
		BAD_CREDENTIAL: "bad_credential",
		BANISH: "banish",
		NOT_VALIDATED: "not_validated",
		DISCONNECTED: "diconnected",
		ANONYMOUS: "anonymous"
	},
	login_event: {
		LOGIN_SUCCESS: "user_login_success",
		LOGIN_FAIL: "user_login_fail",
		DISCONNECTED: "user_disconnected"
	},
	log_level:{
		DEBUG: 3,
		INFO: 2,
		WARN: 1,
		ERROR: 0,
	}
});