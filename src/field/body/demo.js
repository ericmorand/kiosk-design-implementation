var Vue = require('vue');

new Vue({
  el: '#app',
  components: {
    demo: require('../../demo'),
    'kiosk-field-body': require('.')
  }
});
