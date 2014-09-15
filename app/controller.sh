#!/bin/sh
eval "declare -A MODEL="${1#*=}
eval "declare -A PROPS="${2#*=}
echo -e "app.controller('${CTRL_NAME}Ctrl', ['\$scope', 'crudService', function(\$scope, crudService){"
if [[ "$LIST_HAVE_PARAM" == "y" ]] || [[ "$LIST_HAVE_PARAM" == "" ]];
	then 
	echo -e "    var queryParam = {param: '${PARAM_NAME}', id: '${PARAM_VALUE}'};"
else
	echo -e "    var queryParam = {};"
fi
echo  -e "    var callbacks = {"
echo  -e "        query: function(){},"
echo  -e "        get: function(){},"
echo  -e "        save: function(){},"
echo  -e "        update: function(){},"
echo  -e "    };"
echo  -e "    \$scope = crudService.set(\$scope, queryParam, callbacks);"
echo  -e "}]);"
