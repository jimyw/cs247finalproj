this["Collage"] = this["Collage"] || {};
this["Collage"]["Templates"] = this["Collage"]["Templates"] || {};

this["Collage"]["Templates"]["templates/tileItem.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n    <div class=\"edit-tile\" >\n\n      <a data-reveal-id=\"tile-delete-warning-msg\"><img class = \"trash ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.isAdmin), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\" id=\"trash";
  if (helper = helpers.fb_tile_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.fb_tile_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" src=\"/images/trash_icon.png\"/></a>  \n    </div>    \n    <div class=\"flip-container wrapper tile\" id=\"wrapper";
  if (helper = helpers.fb_tile_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.fb_tile_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" ontouchstart=\"this.classList.toggle('hover');\">\n        <div class=\"flipper\">\n          \n            <div class=\"front crop\" id=\"front\">\n              <div class=\"wrapper tile relative\" id=\"photo";
  if (helper = helpers.fb_tile_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.fb_tile_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                    <img id=\"img_";
  if (helper = helpers.fb_tile_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.fb_tile_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" src=\"";
  if (helper = helpers.photo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.photo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"flipping stretch\">            \n                </div>\n            </div>\n            <div class=\"back\">\n              \n                <div class=\"wrapper tile crop\" id=\"";
  if (helper = helpers.fb_tile_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.fb_tile_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n                  ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.is_public), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    \n                </div>  \n              \n                \n            </div>\n          \n        </div>\n      </div>\n\n    ";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "hide_stuff";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <audio id=\"audio";
  if (helper = helpers.fb_tile_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.fb_tile_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" src=\"";
  if (helper = helpers.audio) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.audio); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></audio>\n                    <video class=\"videoMSG flipping\" id=\"replay";
  if (helper = helpers.fb_tile_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.fb_tile_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" src=\"";
  if (helper = helpers.video) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.video); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></video>\n                  ";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                    <img id=\"lock_";
  if (helper = helpers.fb_tile_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.fb_tile_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" src=\"/images/lock_icon.png\">\n                  ";
  return buffer;
  }

function program8(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n      <div class=\"wrapper tile\" id=\"";
  if (helper = helpers.fb_tile_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.fb_tile_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"> \n            <img id=\"img_";
  if (helper = helpers.fb_tile_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.fb_tile_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" src=\"";
  if (helper = helpers.photo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.photo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"overlay\">\n      </div>\n    ";
  return buffer;
  }

  buffer += "\n  <td class=\"template_art relative\">\n\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.filled), {hash:{},inverse:self.program(8, program8, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </td>";
  return buffer;
  });

this["Collage"]["Templates"]["templates/tileList.handlebars"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  ";
  stack1 = self.invokePartial(partials.tileItem, 'tileItem', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.tile_list), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });