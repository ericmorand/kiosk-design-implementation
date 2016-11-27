var path = require('path');
var fs = require('fs');
var deps = [];

var dataFilePath = path.resolve(path.join(__dirname, '../demo/demo.data.js'));

deps.push(dataFilePath);

delete require.cache[dataFilePath];

var data = require(dataFilePath);

data.content = "article";

data.article = {};

data.languages.forEach(function(language) {
  var sectionContentFilePath = path.resolve(path.join(__dirname, '/data/section.content.en.html'));
  var sectionContent = fs.readFileSync(sectionContentFilePath);

  deps.push(sectionContentFilePath);

  data.article[language.code] = {
    title: language.lorem.short,
    author: 'Eric MORAND',
    date: '24 nov. 2016',
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
    ],
    image: {
      source: '//placehold.it/1920x1920/ff6347'
    }
  };
});

module.exports = {
  deps: deps,
  data: data
};
