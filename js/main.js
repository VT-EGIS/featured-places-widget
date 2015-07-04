define([
  'dojo/_base/declare',
  'app/config',
  'featuredPlacesWidget'
], function (declare, config, FeaturedPlaces) {

  return declare([], {
    constructor: function () {
      this.featuredPlacesWidget = new FeaturedPlaces({
        featuredPlaces: config.featuredPlaces,
        itemOpts: { 'data-dismiss': 'modal' }
      }, 'featuredPlaces');

      this.featuredPlacesWidget.on('place-selected', function (name) {
        console.log(config.featuredPlaces[name]);
      });
    },
  });
});
