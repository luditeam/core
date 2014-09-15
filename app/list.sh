#!/bin/sh
eval "declare -A MODEL="${1#*=}
eval "declare -A PROPS="${2#*=}
echo -e "<div class=\"widget\">"
echo -e "	<div class=\"navbar widget-teal\">"
echo -e "		<ul class=\"nav navbar-nav\">"
echo -e "			<li class=\"widget-icon\"><i class=\"fa fa-$WIDGET_ICON fa-2x\"></i></li>"
echo -e "			<li class=\"widget-title\">$WIDGET_NAME</li>"
echo -e "		</ul>"
echo -e "		<ul class=\"navbar-right\">"
if [[ "$SEARCH_ACTIVATED" == "y" ]] || [[ "$SEARCH_ACTIVATED" == "" ]];
		then 
		echo -e "			<li class=\"search-field\" ng-show=\"searchActivated\"><input type=\"text\" ng-model=\"search\"></li>"
		echo -e "			<li class=\"fa fa-search fa-lg widget-menu\" ng-class=\"{'activated': searchActivated}\" ng-click=\"toggleSearch()\"></li>"
fi
if [[ "$PARAMS_ACTIVATED" == "y" ]] || [[ "$PARAMS_ACTIVATED" == "" ]];
		then 
		echo -e "	      	<li class=\"fa fa-cog fa-lg widget-menu\"></li>"
fi

echo -e "	      	<li class=\"fa fa-plus fa-lg widget-menu\" ng-click=\"new()\"></li>"
echo -e "	    </ul>"
echo -e "	</div>"
echo -e "	<div role=\"content\">"
echo -e "		<div class=\"widget-body\">"
echo -e "			<table class=\"table\">"
echo -e "				<tr>"
for ((j=0;j<${#MODEL[@]};j++)) do
	MODEL_NAME=${MODEL[$j]}
echo -e "					<th>{{'${PROPS["${MODEL_NAME}_label"]}' | translate}}</th>"
done
echo -e "					<th class=\"toolbar-button text-center\">View</th>"
echo -e "					<th class=\"toolbar-button text-center\">Edit</th>"
echo -e "				</tr>"
echo -e "				<tr ng-repeat=\"item in items | filter:search\">"
for ((j=0;j<${#MODEL[@]};j++)) do
echo -e "					<td class=\"\">{{item.${MODEL[$j]}}}</td>"
done

echo -e "					<td class=\"text-center\"><span class=\"fa fa-eye\" ng-click=\"view(item.id)\"></span></td>"
echo -e "					<td class=\"text-center\"><span class=\"fa fa-pencil\" ng-click=\"edit(item.id)\"></span></td>"
echo -e "				</tr>"
echo -e "				<tr ng-if=\"!items.universes.length\">"
echo -e "					<td colspan=\"3\">NO_UNIVERSE_TROUBLE</td>"
echo -e "				</tr>"
echo -e "			</table>"
echo -e "		</div>"

echo -e "	</div>"
echo -e "</div>"
