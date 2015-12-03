function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      __renderer = __helpers.r,
      ______node_modules_marko_layout_placeholder_tag_js = __renderer(require("marko-layout/placeholder-tag")),
      __tag = __helpers.t,
      escapeXml = __helpers.x,
      forEach = __helpers.f,
      escapeXmlAttr = __helpers.xa;

  return function render(data, out) {
    out.w('<!doctype html> <html lang="en"><head><meta charset="UTF-8"><title>');
    __tag(out,
      ______node_modules_marko_layout_placeholder_tag_js,
      {
        "name": "title",
        "content": data.layoutContent
      });

    out.w('</title></head><body><h1>Hello ' +
      escapeXml(data.name) +
      '</h1>');

    if (notEmpty(data.colors)) {
      out.w('<ul>');

      forEach(data.colors, function(color) {
        out.w('<li style="color: ' +
          escapeXmlAttr(color) +
          '">' +
          escapeXml(color) +
          '</li>');
      });

      out.w('</ul>');
    }
    else {
      out.w('<div>No colors!</div>');
    }

    out.w('<script type="text/javascript" src="scripts/vendors.js"></script><script type="text/javascript" src="scripts/bundle.js"></script></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);