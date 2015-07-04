define([
  'dojo/_base/declare',
  'dijit/_WidgetBase',
  'dijit/_Container',
  'dojo/on',
  'dojo/query',
  'dojo/_base/lang',
  'dojo/Evented',
  './item',
  'dijit/_TemplatedMixin',
  'dojo/NodeList-manipulate'
], function (declare, _WidgetBase, _Container, on, query, lang, Evented,
             Item, _TemplatedMixin) {
  return declare([_WidgetBase, Evented, _Container, _TemplatedMixin], {
    templateString: '<ul></ul>',

    postCreate : function () {
      for(var name in this.featuredPlaces) {
        this.addChild(new Item(lang.mixin({ name: name }, this.itemOpts)));
      }
      this._attachEventHandlers();
    },

    _attachEventHandlers : function () {
      on(this.domNode, 'a:click', lang.hitch(this, function (evt) {
        var name;
        evt.preventDefault();

        name = query.NodeList([evt.target]).text().trim();
        this.emit('place-selected', name, this.featuredPlaces[name]);
      })); 
    },
  });
});
