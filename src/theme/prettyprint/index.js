var prettify = function (el) {
  var Promise = require('promise');

  var hljs = require('highlight.js');

  return new Promise(function (fulfill, reject) {
    var list = el.getElementsByClassName('prettyprint');

    for (var i = 0; i < list.length; i++) {
      hljs.highlightBlock(list[i]);
    }

    fulfill();
  });
};

module.exports = prettify;