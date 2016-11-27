var Vue = require('vue');

new Vue({
  el: '#app',
  mounted: function() {
    var prettyprint = require('.');

    return prettyprint(this.$el);
  },
  components: {
    demo: require('../../demo')
  }
});
