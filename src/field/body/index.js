module.exports = {
  name: 'kiosk-field-body',
  data: function() {
    return {
    }
  },
  mounted: function() {
    var prettyprint = require('../../theme/prettyprint');

    return prettyprint(this.$el);
  }
};