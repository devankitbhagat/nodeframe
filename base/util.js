'use strict'
let util = {}

util.buildCamelString = function(string, separator) {
    let str =  string
    .toLowerCase()
    .split(separator)
    .map(function(word) {
        return word[0].toUpperCase() + word.substr(1);
    })
    .join("");

    return str.charAt(0).toLowerCase() + str.slice(1);
}

module.exports = util