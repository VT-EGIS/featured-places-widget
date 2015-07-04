define([
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/_base/declare',
], function (_WidgetBase, _TemplatedMixin, declare) {
  return declare([_WidgetBase, _TemplatedMixin], {
    templateString: '<li><a href="#">${name}</a></li>',
  });
});
