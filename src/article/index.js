module.exports = {
  name: 'nightlycommit-article',
  data: function() {
    return {
      parallax: {
        speed: 0.5
      }
    }
  },
  mounted: function() {
    var prettyprint = require('../theme/prettyprint');

    return prettyprint(this.$el);
  },
  components: {
    parallax: require('vue-parallax')
  }
};