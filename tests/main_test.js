define([
  'intern!object',
  'intern/chai!assert',
  'featuredPlacesWidget',
  'dojo/_base/array',
  'dojo/query',
  'dojo/dom-attr',
  'dojo/NodeList-manipulate'
], function (registerSuite, assert, FeaturedPlaces, array, dojoQuery, domAttr) {
  var config, createFixture, widget, clickEvent, ul;

  config = {
    place1: 12,
    place2: { item1: 34 },
    place3: 46
  };

  clickEvent = function () {
    var evt;

    evt = document.createEvent('MouseEvent');
    evt.initMouseEvent('click', true, false);
    return evt;
  };

  createFixture = function (id) {
    var ul, body;

    ul = document.createElement('ul');
    ul.id = id;
    body = document.getElementsByTagName('body')[0];

    body.appendChild(ul);
    return ul;
  };

  registerSuite({
    name: 'Featured Places Widget',

    beforeEach: function () {
      ul = createFixture('featuredPlaces');
      widget = new FeaturedPlaces({ featuredPlaces: config }, 'featuredPlaces');
    },

    afterEach: function () {
      widget.destroy();
      ul.remove();
    },

    'Must create featured places': function () {
      assert.lengthOf(widget.getChildren(), 3);
      array.forEach(widget.getChildren(), function (elt) {
        assert.isDefined(config[dojoQuery(elt.domNode).text()]);
      });
    },

    'Must pass on the itemOpts to the li children': function () {
      var widget;

      widget = new FeaturedPlaces({
        featuredPlaces: config,
        itemOpts: { 'data-dismiss': 'modal' }
      });

      dojoQuery('li', widget.domNode).forEach(function (node) {
        assert.strictEqual(domAttr.get(node, 'data-dismiss'), 'modal');
      }); 

      widget.destroy();
    },

    'Must emit an event on place selection': function () {
      var dfd;
      
      dfd = this.async(1000);

      widget.on('place-selected', dfd.callback(function (name) {
        assert.strictEqual(name, 'place2');
      }));
      
      dojoQuery('a', widget.domNode)[1].dispatchEvent(clickEvent());
    }
  });
});
