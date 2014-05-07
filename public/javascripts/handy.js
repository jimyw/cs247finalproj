// handy functions


// append handlebars partial template
// e.g.

function includeHandlebarsTemplate(partial, wrapper, inner_item, data, append_id) {
  Handlebars.registerPartial(inner_item,partial);
  var template = Handlebars.compile(wrapper); 
  var htmltext = template(data);
  console.log(htmltext)
  $(append_id).html(htmltext);
}