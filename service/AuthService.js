'use strict';


/**
 * get auth token
 * get auth token
 *
 * returns String
 **/
exports.getToken = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

