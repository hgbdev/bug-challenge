const TextLoader = require("./TextLoader");

/**
 *
 * @param {String} path json path
 * @returns {Object} json object
 */
const ParseJSON = (path) => {
  const text = TextLoader(path);
  return JSON.parse(text);
};

module.exports = ParseJSON;
