var Vue = require('vue');

new Vue({
  el: '#app',
  components: {
    demo: require('../demo'),
    'nightlycommit-article': require('.')
  }
});
