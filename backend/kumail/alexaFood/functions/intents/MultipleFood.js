const lib = require('lib');

/**
* Basic "Hello World" intent, can receive a `food` parameter
* @param {string} number Your food
* @param {string} food Your food
* @param {string} time Your food
* @returns {string}
*/
module.exports = ( number = '3', food = 'World', time = 'Mon',  callback) => {

    var output = ''

    output = `Okay, I've recorded you ate ${number} ${food} on ${time}`

    return callback(null, output);

};
