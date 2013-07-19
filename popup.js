// check jQuery
if (typeof (jQuery) === 'undefined') {
  throw 'jQuery not included.';
}
// need fuzzyset.js - https://github.com/Glench/fuzzyset.js
if (typeof (FuzzySet) === 'undefined') {
  throw 'FuzzySet please.';
}

// our fuzzy instance
var fuzzy_instance = FuzzySet(false);

// our data
var data;
data = {
  'hello-world':"Hello World",
  'gp-gmail':"gprasanth.1992@gmail.com",
  'omg':"Oh My God!?"
};

var tags = $.map(data, function(value, key) { return key; });

for (var key in tags) {
  var str = tags[key];
  fuzzy_instance.add(str);
}
$("#input").focus();

$(function () {
  $("#input").focus();
  $("#input").autocomplete({
    autoFocus: true,
    source: function (req, responseFn) {
      var str = req.term;
      var fuzzy_matches = fuzzy_instance.get(str);
      var resp = [];
      for (var fuzzy_match in fuzzy_matches) {
        var relv = fuzzy_matches[fuzzy_match][0];
        if (relv < 0.1) {
          if ($.inArray(str, tags) === -1) {
            resp.push('Add: '+str);
          }
        }
        resp.push('Copy: '+fuzzy_matches[fuzzy_match][1]);
        resp.push('Delete: '+fuzzy_matches[fuzzy_match][1]);
        if (relv > 0.1) {
          resp.push('Add: '+str);
        }
      }
      if (resp.length === 0) {
        resp = ['Add: '+str];
      }
      responseFn(resp);
    },
    select: function (event, ui) {
      var str = ui.item.value;
      var tag = "";
      if (str.indexOf('Copy: ') === 0) {
        var str2copy = "";
        tag = str.replace(/^Copy: /g, '');
        if ($.inArray(tag, tags) >= 0) {
          str2copy = data[tag];
        } else {
          $(this).val('');
        }
        // copy str to clipboard
        if (str2copy !== "") {
          $(this).val('Copied!');
        }
      } else if (str.indexOf('Delete: ') === 0) {
        tag = str.replace(/^Delete: /g, '');
        if ($.inArray(tag, tags) >= 0) {
          delete data.tag;
        } else {
          $(this).val('');
        }
        if (typeof(data.tag) === 'undefined') {
          $(this).val('Deleted!');
        }
      } else if (str.indexOf('Add: ') === 0) {
        tag = str.replace(/^Add: /g, '');
        data.tag = prompt('Type the text you want to associate with '+tag);
        // chrome.storageArea.set({"data": data});
        fuzzy_instance.add(tag);
        if (typeof(data.tag) != 'undefined') {
          $(this).val('Added!');
        }
      }
      event.preventDefault();
      setTimeout(function(){ window.close(); }, 100);
    }
  });
});