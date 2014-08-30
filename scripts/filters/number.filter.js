app.filter('number', function() {
    return function(input) {
        if (input && !isNaN(input))
            return input;
        return 0;
    };
});