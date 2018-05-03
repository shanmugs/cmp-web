// Searches through a data structure for objects with the following structure:
// {local: '...', staging: '...', production: '...'} and returns a copy of the object that has
// these env dependent variables reduced to the passed envString key

// Verifies that a value is an object and that it contains all of the keys 
// for the possible environments
function isValueMultiEnv(value, possibleEnvs) {
    const isObject = typeof value === 'object' && value !== null;
    return isObject && possibleEnvs.every(function(env) { return env in value});
}

var envReducer = function(data, envString, possibleEnvs) {
    var strippedData = {};

    for(var key in data) {
        if(data.hasOwnProperty(key)) {
            var value = data[key];
            var isEnvValue = isValueMultiEnv(value, possibleEnvs);

            if(!isEnvValue && typeof value === 'object') {
                // if it's just a regular object traverse it with recursion
                strippedData[key] = envReducer(value, envString, possibleEnvs);
            } else if(isEnvValue) {
                // Could do a env dependent split on deep objects, gotta check if we keep going
                var envValIsEnvVal = isValueMultiEnv(data[key][envString], possibleEnvs);  
                strippedData[key] = (envValIsEnvVal) ? envReducer(data[key][envString], envString, possibleEnvs) :  data[key][envString];
            } else {
                // if it's just a standard value set it as the key
                strippedData[key] = data[key];
            }
        }
    }
    return strippedData;
}


module.exports = envReducer;
