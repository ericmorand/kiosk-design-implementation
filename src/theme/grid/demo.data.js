var path = require('path');

var dataFilePath = path.resolve(path.join(__dirname, '../../demo/demo.data.js'));

delete require.cache[dataFilePath];

var data = require(dataFilePath);

data.content = "grid";

data.elements = [
  {
    class: 'tiny'
  },
  {
    class: 'small'
  },
  {
    class: 'medium'
  },
  {
    class: 'big'
  },
  {
    class: 'large'
  },
  {
    class: 'full'
  }
];

module.exports = {
  deps: [dataFilePath],
  data: data
};
