#!/bin/sh
eval "declare -A MODEL="${1#*=}
eval "declare -A PROPS="${2#*=}
for ((j=0;j<${#MODEL[@]};j++)) do
	MODEL_NAME=${MODEL[$j]}
	echo -e "<div class=\"row\">"
	echo -e "    <div class=\"col-md-6 col-lg-6 col-ms-6 col-xs-6\">{{'${PROPS["${MODEL_NAME}_label"]}' | translate}}</div>"
	echo -e "   <div class=\"col-md-6 col-lg-6 col-ms-6 col-xs-6\">{{item.${MODEL_NAME}}}</div>"
	echo -e "</div>"
done
