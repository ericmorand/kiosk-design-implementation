var path = require('path');

var dataFilePath = path.resolve(path.join(__dirname, '../../demo/demo.data.js'));

delete require.cache[dataFilePath];

var data = require(dataFilePath);

data.content = "color";

data.backgroundColors = [
  {
    title: 'Light background color',
    class: 'background-color-light'
  },
  {
    title: 'Dark background color',
    class: 'background-color-dark'
  }
];

data.textColors = [
  {
    title: 'On-light text color',
    class: 'text-color-on-light'
  },
  {
    title: 'On-dark text color',
    class: 'text-color-on-dark'
  }
];

module.exports = {
  deps: [dataFilePath],
  data: data
};
