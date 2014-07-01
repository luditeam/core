app.filter('hourFilter', function() {
    return function(inputs, value, direction) {
        var result = [];
        if(!value || isNaN(value))
            return inputs;
        value = parseInt(value);
        direction = direction ||  "strict";

        for (var i = 0; i < inputs.length; i++){
            if(inputs[i].cost){
                result.push(inputs[i]);
            }
            else{
                if (direction == "minus" && inputs[i].available_hours >= value)
                    result.push(inputs[i]);
                else if(direction == "plus" && inputs[i].available_hours <= value)
                    result.push(inputs[i]);
                else if (inputs[i].available_hours == value)
                    result.push(inputs[i]);
            }
        }
        return result;
    };
});