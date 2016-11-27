var path = require('path');
var fs = require('fs');
var deps = [];

var dataFilePath = path.resolve(path.join(__dirname, '../../demo/demo.data.js'));

delete require.cache[dataFilePath];

var data = require(dataFilePath);

deps.push (dataFilePath);

data.body = {}

data.languages.forEach(function(language) {
  var sectionContentFilePath = path.resolve(path.join(__dirname, '/data/section.content.en.html'));
  var sectionContent = fs.readFileSync(sectionContentFilePath);

  deps.push(sectionContentFilePath);

  data.body[language.code] = {
    sections: [
      {
        title: language.lorem.short,
        content: sectionContent
      },
      {
        title: language.lorem.short,
        content: sectionContent
      },
      {
        title: language.lorem.short,
        content: sectionContent
      },
      {
        title: language.lorem.short,
        content: sectionContent
      }
    ]
  };
});

module.exports = {
  deps: deps,
  data: data
};
