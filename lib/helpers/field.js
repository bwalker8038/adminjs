var get = Ember.get, set = Ember.set, EmberHandlebars = Ember.Handlebars;

/**
  Renders a field based on the configuration.
*/
EmberHandlebars.registerHelper('field', function(name, options) {
  var config = options.data.keywords.controller.get('config'),
      view = options.data.view,
      field = config.getField(name);

  var fieldViewName = field.view || field.name + "_field";

  var FieldView = config.container.lookupFactory('view:' + fieldViewName);

  if(FieldView) {
    // normalize the path to be relative to the view
    var opts = {
      valueBinding: "_parentView.context." + field.name,
      field: field
    };
    view.appendChild(FieldView, opts);
  } else {
    return EmberHandlebars.helpers.bind.apply(this, arguments);
  }
});