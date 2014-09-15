#!/bin/bash

echo -e "\033[31mHello you are going to generate a CRUD MVC for luditeam\033[0m"
echo -e "\033[32mPlease enter the environement name (frontend/backend/admin)\033[0m"
read ENVIR
echo -e "\033[32mPlease enter the folder name (ex: fruit)\033[0m"
read FOLDER

echo -e "\033[32mPlease enter the controler name (ex: Fruit)\033[0m"
read CTRL_NAME
echo -e "\033[32mPlease enter the widget title (ex: Fruits)\033[0m"
read WIDGET_NAME
echo -e "\033[32mPlease enter the widget icon (ex: globe)\033[0m"
read WIDGET_ICON
echo -e "\033[32mIs items searchable? (y/n) [y]\033[0m"
read SEARCH_ACTIVATED
echo -e "\033[32mIs widget has params? (y/n) [y]\033[0m"
read PARAMS_ACTIVATED
echo -e "\033[32mIs your List action will have a param? (y/n) [y]\033[0m"
read LIST_HAVE_PARAM
if [[ "$LIST_HAVE_PARAM" == "y" ]] || [[ "$LIST_HAVE_PARAM" == "" ]];
then
  echo -e "     \033[33mParam name\033[0m"
  read PARAM_NAME
  echo -e "     \033[33mParam value\033[0m"
  read PARAM_VALUE
fi
MODEL=()
declare -A PROPS
echo -e "\033[31mNow we will define the model:\033[0m\033[32m"

while read -p "Write the name of your element in the model: (or to quit [ENTER])" MODEL_NAME; do
	if [[ "$MODEL_NAME" == "" ]];
		then 
		break
	fi
	echo -e "\033[0m"
	MODEL+=("$MODEL_NAME")
	


	echo -e "\033[32mTranslate Ident for Labels (will create XXXX and XXXX_BAD)\033[0m"
	read MODEL_LABEL
	PROPS["${MODEL_NAME}_label"]=$MODEL_LABEL

	echo -e "\033[33m\n\n $MODEL_LABEL:\"$MODEL_NAME\""
 	echo -e " ${MODEL_LABEL}_BAD:\"Choosen $MODEL_NAME is invalid\"\n\n\033[0m"


	echo -e "\033[32mElement filed type (text, hidden, number, email)\033[0m"
	read MODEL_TYPE
	PROPS["${MODEL_NAME}_type"]=$MODEL_TYPE 
	if [[ "$MODEL_TYPE" == "hidden" ]];
		then 
		echo -e "\033[33mSet the hidden field value\033[0m"
		read PROPS["${MODEL_NAME}_value"]
	fi
	
	echo -e "\033[32m"
	while read -p "Add constraints(min, max, required, email, number): (or to end [ENTER])" CONST_NAME; do
		if [[ "$CONST_NAME" == "" ]];
			then 
			break
		fi
		echo -e "\033[0m\033[33mSet constraint value:\033[0m\033[32m"
		read CONST_VALUE
		PROPS["${MODEL_NAME}_${CONST_NAME}"]=$CONST_VALUE
	done
	echo -e "\033[0m"


done

#read ttest;
export CTRL_NAME
export LIST_HAVE_PARAM
export WIDGET_NAME
export WIDGET_ICON
export SEARCH_ACTIVATED
export PARAMS_ACTIVATED
export PARAM_NAME
export PARAM_VALUE

echo -e "\033[31mRecap:"
echo -e "Controller name:  $CTRL_NAME"
echo -e "List param: $PARAM_NAME"
echo -e "List param value:  $PARAM_VALUE"
echo -e "Widget title: $WIDGET_NAME"
echo -e "Widget icon: $WIDGET_ICON"
echo -e "Has search: $SEARCH_ACTIVATED"
echo -e "Has param: $PARAMS_ACTIVATED"

echo -e "Model entries:"
printf -- '%s\n' "${MODEL[@]}"
echo -e "\033[0m"

echo -e "\033[32mOK? (y/n) [y]\033[0m"
read OK
if [[ "$OK" == "y" ]] || [[ "$OK" == "" ]];
then
	
	
	mkdir -p "views/${ENVIR}/${FOLDER}"
	mkdir -p "scripts/controllers/${ENVIR}/${FOLDER}/"

	if [ ! -e "views/${ENVIR}/${FOLDER}/_form.html" ]
	then
		echo -e "\033[31mWritting form.html\033[0m"
		./form.sh "$(declare -p MODEL)" "$(declare -p PROPS)"  > "views/${ENVIR}/${FOLDER}/_form.html"
		echo -e "\033[32mSuccess\033[0m"
	fi

	if [ ! -e "views/${ENVIR}/${FOLDER}/_list.html" ]
	then
		echo -e "\033[31mWritting list.html\033[0m"
		./list.sh "$(declare -p MODEL)" "$(declare -p PROPS)" > "views/${ENVIR}/${FOLDER}/_list.html"
		echo -e "\033[32mSuccess\033[0m"
	fi

	if [ ! -e "views/${ENVIR}/${FOLDER}/_view.html" ]
	then
		echo -e "\033[31mWritting view.html\033[0m"
		./view.sh "$(declare -p MODEL)" "$(declare -p PROPS)" > "views/${ENVIR}/${FOLDER}/_view.html"
		echo -e "\033[32mSuccess\033[0m"
	fi

	if [ ! -e "scripts/controllers/${ENVIR}/${CTRL_NAME}Ctrl.js" ]
	then
		echo -e "\033[31mWritting controller.js\033[0m"
		./controller.sh "$(declare -p MODEL)" "$(declare -p PROPS)" > "scripts/controllers/${ENVIR}/{CTRL_NAME}Ctrl.js"
		echo -e "\033[32mSuccess\033[0m"
	fi

fi