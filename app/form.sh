#!/bin/sh
eval "declare -A MODEL="${1#*=}
eval "declare -A PROPS="${2#*=}

echo -e "<form class=\"form-horizontal\"  name=\"model\" ng-submit=\"process(params.method, model.\$valid)\" novalidate>"


for ((j=0;j<${#MODEL[@]};j++)) do
	MODEL_NAME=${MODEL[$j]}
	
	echo -e "	<div class=\"form-group\" ng-class=\"{'has-error': model.$MODEL_NAME.\$invalid && !model.$MODEL_NAME.\$pristine}\">"
	echo -ne "	  <label class=\"col-md-4 control-label\" for=\"name\">{{'"
	echo -ne ${PROPS["${MODEL_NAME}_label"]}
	echo -e "' | translate}}</label> " 
	echo -e "	  <div class=\"col-md-8\">"
	echo -ne "	  <input id=\"name\" name=\"name\" type=\"${PROPS["${MODEL_NAME}_type"]}\" placeholder=\"\" class=\"form-control input-md\""
	
	if [[ "${PROPS["${MODEL_NAME}_required"]}" ]];
		then 
		echo -ne " ng-required=\"true\""
	fi

	if [[ "${PROPS["${MODEL_NAME}_min"]}" ]];
		then 
		echo -ne " ng-minlength=\"${PROPS["${MODEL_NAME}_min"]}\""
	fi

	if [[ "${PROPS["${MODEL_NAME}_max"]}" ]];
		then 
		echo -ne " ng-maxlength=\"${PROPS["${MODEL_NAME}_max"]}\""
	fi
	echo -e " ng-model=\"item.$MODEL_NAME\">"
	echo -e "	  <span class=\"help-block\"></span>"
	if [[ "${PROPS["${MODEL_NAME}_required"]}" ]] || [[ "${PROPS["${MODEL_NAME}_min"]}" ]] || [[ "${PROPS["${MODEL_NAME}_max"]}" ]];
		then 
		
	echo -e "	  	<p class=\"help-block error-block\" ng-if=\"model.$MODEL_NAME.\$invalid && !model.$MODEL_NAME.\$pristine\">{{'${PROPS["${MODEL_NAME}_label"]}_BAD' | translate}}</p>"
	fi
	if [[ "${PROPS["${MODEL_NAME}_min"]}" ]];
		then 
		echo -e "	    <p class=\"help-block error-block\" ng-if=\"model.$MODEL_NAME.\$error.minlength && !model.$MODEL_NAME.\$pristine\">{{'TOO_SHORT' | translate:'{min:${PROPS["${MODEL_NAME}_min"]}}'}}</p>"
	fi

	if [[ "${PROPS["${MODEL_NAME}_max"]}" ]];
		then 
		
		echo -e "	    <p class=\"help-block error-block\" ng-if=\"model.$MODEL_NAME.\$error.maxlength\">{{'TOO_LONG' | translate:'{max:${PROPS["${MODEL_NAME}_max"]}}'}}</p>"
	fi
	echo -e "	  </div>"
	echo -e "	</div>"
    echo 
done

echo -e "	<div class=\"form-group\">"
echo -e "	  <label class=\"col-md-4 control-label\" for=\"\"></label>"
echo -e "	  <div class=\"col-md-4\">"
echo -e "	    <button type=\"submit\" id=\"\" name=\"\" class=\"btn btn-primary\" ng-if=\"params.method == 'new'\">{{'CREATE' | translate}}</button>"
echo -e "	    <button type=\"submit\" id=\"\" name=\"\" class=\"btn btn-primary\" ng-if=\"params.method == 'edit'\">{{'EDIT' | translate}}</button>"
echo -e "	    <button type=\"button\" id=\"\" name=\"\" class=\"btn btn-cancel\" ng-if=\"params.method == 'edit'\">{{'CANCEL' | translate}}</button>"
echo -e "	  </div>"
echo -e "	</div>"
echo -e "</form>"