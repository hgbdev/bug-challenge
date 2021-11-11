const _ = require("lodash");

const tag_cleaner = (tag, open_tag, close_tag) =>
  tag.replace(open_tag, "").replace(close_tag, "");

const tags = [
  {
    tag: /\{\{(.*?)\}\}/g,
    open_tag: /^\{\{/,
    close_tag: /\}\}$/,
    resolver: function (data) {
      return (tag) =>
        _.get(data, tag_cleaner(tag, this.open_tag, this.close_tag));
    },
  },
  /**
   * Edit here
   * Explain:
   * - Function replace(text, source_data) uses arrays
   *   of tags[] and the foreach handles the `text` parameter
   *   case by case in the tags[] array
   * - The first object element to get the data in
   *   `source_data` parameter and replace it with the key in curly braces.
   * - The second object element will change the characters " to /"
   */
  {
    tag: /"/g,
    resolver: () => {
      return '\\"';
    },
  },
];

/**
 *
 * @param {String} text the string to be processed
 * @param {Object} source_data {} object that contains the source data
 * @returns {String} processed string
 */
const replace = (text, source_data = {}) => {
  let new_text = text + "";
  tags.forEach((ftag) => {
    new_text = new_text.replace(ftag.tag, ftag.resolver(source_data));
  });

  return new_text;
};

module.exports = replace;
