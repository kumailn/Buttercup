const lib = require('lib');

/**
* @param {string} name Intent Name to trigger
* @param {object} slots Slot Information
* @param {object} request Request Object (required)
* @returns {any}
*/

module.exports = (name = 'HelloWorld', slots = {}, request = {}, context, callback) => {
  console.log('name', name);
  console.log('slots', slots)
  console.log('request', request)

  request.intent = request.intent || {
    slots: Object.keys(slots).reduce((obj, key) => {
      obj[key] = (slots[key] && typeof slots[key] === 'object') ?
        slots[key] : {name: key, value: slots[key]};
      return obj[key];
    }, {})
  };

  if (!request.intent.name) {
    return callback(new Error('Intent name is required'));
  }

  let params = Object.keys(request.intent.slots || {}).reduce((params, key) => {
    params[key] = request.intent.slots[key].value;
    return params;
  }, {});

  console.log("AAAAAAAAA", params)

  lib[`${context.service.identifier}.intents.${request.intent.name}`](params, (err, result) => {
    console.log("PARAMS", params)
    console.log('results', result)
    return callback(null, {
      version: context.service.environment,
      sessionAttributes: {},
      response: {
        outputSpeech: {
          type: 'PlainText',
          text: err ? `Error: ${err.message}` : result
        },
        shouldEndSession: true
      }
    });

  });

};
