if ( typeof String.prototype.startsWith != 'function' ) {
  String.prototype.startsWith = function( str ) {
    return str.length > 0 && this.substring( 0, str.length ) === str;
  }
};

if ( typeof String.prototype.endsWith != 'function' ) {
  String.prototype.endsWith = function( str ) {
    return str.length > 0 && this.substring( this.length - str.length, this.length ) === str;
  }
};
function time() {
	return (new Date()).getTime();
}
var timer = (function () {
	var start = time();
	return function () {
		if (arguments.length > 0)
			start = arguments[0];
		return time() - start;
	}
})()
function isDefined(value) {
	return typeof value !== 'undefined';
}
function quoted(str) {
	return "'" + str + "'";
}
function markup(tag) {
	var slash = arguments.length < 2 ? 0 : arguments[1];
	return String.fromCharCode(60) + 
		(slash == 1 ? "/" : "") + tag + (slash == 2 ? " /" : "") + 
			String.fromCharCode(62);
}
function imgMarkup(alt) {
	var img = "img alt=" + quoted(alt), src = " ";
	switch (alt) {
		case "up":
			src += "src=" + quoted("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gYJCi8YGk9IOAAAAgJJREFUOMvNk09Ik3EYxz/v9r7v1nS6uZpag/5g0vKQuVlgF8uDdojRIRLJ/alTVBAWdRlEEN3sVIdBpoNa0CEMgqD/BCErsEgUsaSwnC5905nT6dr76zDRQxLRyefyPIfv98PzPDwPrN0ITqzU/tH/hPjHLxCcvALACe0fTYff5fORIa+rLbmwLTz9i8BEPQChiT/k0moMubmv2CQbR874txd1vTIwPqotIMmV3CoZ+Tug4RHoqorFEm87XlU9PGvlzTBo01kWZ34MIRl2szAzh8kKnaUAGJbN+x/As4Ng0Nsvtm6tdpVbSWcEGwp11tsV1MLiSnS9g1gF6GLZlgfs7YIXPqi9F2qosZ2ury3loyZ439Of+fxhML3JJnDYzciq0ow/cZ5oGQTGlgCeCMSD4O7YuWeX/UYk7GVKwEDvJyYT2smfqXRAnvpKRTk4ykowKPJVWr95iZZDILHUhz1sdDXFxse0edGbEuJsbETguf/QeW4wv6MDr2NHrydFzTUhysI5YQiNzeEfNQPIADidjd4qR+mTviRftEVudvb14670fW/fkR/2+b6WbtvbzVvcUp2SM2NSjevmZzNNQLcEcPllSrp06vZjsrkCZFOGAvUYxRsTPG3Md+iLg55zoBvvoqiFKKasZClqElHXPHgiqx9U3Z2V+lDP6pqW4TXwc78BnXOvzJOHstwAAAAASUVORK5CYII=");
			break;
		case "down":
			src += "src=" + quoted("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gYJCjEVsL8LWgAAAhNJREFUOMvNkk1IkwEYx3/v3nfvanNaU1uuYaWolEiFmCRd0kIRhx9BhIQfq1PRJUG6RdSpY6e8mEstDx0U+rDoEMUIS0iQ2RerMdqH7qOcc3N7fWeH9UV58VS/08PD///8D/8H/j3VA+vv60Z/zbYX62s63QgAl58uCpfOjTxGUQ1IuhUM8inyLH6eNGaFrVOQUfPJiHfQyjlodYqgz21ac1iTAgAV15vbWirud9gq8ETSXLsx64qby/cxUqX+CNN1vHLu2rOzLqFuIvxlhWR8uZ3R3eMaABYWHk27IvPHqsy0HC3jTG9NJW8+TGzre5sNqHfebqsvrjPkF6JIBlJpNYkoTwKIVA/Ax/61mLb5wfN3i/bOxhItW/MIp6XyuemAh71nSw/VWq4sGy14QhAKhJWMsnqYYauXbj8igXtQOwQz9pBPtPld3mRrQ42FqGTC8zneJMq6VlNJqewJCYSDUdS0cpHhHXfpDoDDggiAbxyOTIDz+MynzScKrNsNB4uLcliSCyV5S4E8v6QhEl1BSSbGuFXUR3cQHEUA2RZ+0vAQMrKMXj91wV653x038tINka8K6Vj0PYLmAKlYAp0RbprXOfAd6eRsnk4Svee7ynKHnmkI+iIpBKmcQZP3T63mL3f7a1bHqhaXU1LDyGQ0rWdJJSM0MWjy0hva4Jd2BfvpCV8F4HRkg+ae39K6fPy/fAOuh8D882B2QwAAAABJRU5ErkJggg==");
			break;
	}
	return markup(img + src, 2);
}
function outerHtml(el) {
	el = el.clone();
	var func = arguments.length > 1 ? arguments[1] : null;
	if (func != null)
		el = func(el);
	return $(markup('div')).append(el).html();
}
function ancestry(el) {
	return el.parents()
		.map(function() {
			return this.tagName;
		})
		.get()
		.join( ", " );
}
function folderPath(el) {
	var str = arguments.length > 1 ? arguments[1] : ""; 
	if (el.length < 1 || !isDefined(el.prop("tagName"))) 
		return str;
	else {
		var s = el.prop("tagName");
		switch (s.toLowerCase()) {
			case "dt":
				s = el.children("h3").text();
				break;
			case "dd":
				s = el.prev().children("h3").text();
				break;
			default:
				s = "";
		}
		if (s.length > 0)
			str = s + (str.length > 0 ? "|" : "") + str;
		return folderPath(el.parent(), str);
	}
}
function fold(item) {
	var h3 = item.parent();
	var folder = h3.next(); 
	if (folder.length < 1)
		folder = h3.parent().next();
	item.prop("checked") ? 
		folder.show() : 
		folder.hide();
}
function folderDecoration(item, id, alt) {
	var id_str = quoted(alt + "_" + id);
	var ht_str = "input type='checkbox' id=" + id_str;
	ht_str += alt == "up" ? 
		" checked" : "";
	ht_str = markup(ht_str, 2);
	ht_str += markup("label for=" + id_str, 2);
	item.prepend(ht_str);
	id_str = "id_" + id;
	ht_str = "a href="; 
	ht_str += alt == "up" ? 
		quoted("#top") + " id=" + quoted(id_str) :
		quoted("#" + id_str);
	ht_str = markup(ht_str, 0);
	ht_str += imgMarkup(alt);
	ht_str += markup("a", 1);
	item.append(ht_str);
}
function idNumber(str) {
	return str.substring(1 + str.indexOf("_"));
}
function match(str, pattern, options) {
	if (options.rex) 
		return pattern.test(str);
	else {
		if (!options.sens)
			str = str.toLowerCase();
		return str.indexOf(pattern) > -1;
	}
}
function Search(options, msg) {
	var results = 0;
	var finding = (function () {
		timer(time());
		var found = $(markup('dl', 2));
		return function (html) {
			msg(timer() + " ms");
			return html == null ? found : found.append(html);
		}
	})()
    var found = undefined;
    if (options.pat.length >= (options.rex?1:2)) 
		try {
			var pattern = options.rex ? 
				new RegExp(options.pat, options.sens ? '' : 'i') : 
				options.sens ? options.pat : options.pat.toLowerCase();
			found = finding(null);
			switch (options.what) {
				case "folders":
					$("#bookmarks input[type='checkbox']").each(function(index,item) {
						var h3 = $(item).parent();
						if (match(h3.text(), pattern, options, index)) {
							var fp = folderPath(h3);
							var dt = h3.parent();
							found = finding(outerHtml(dt, function(dt) {
								var h3 = dt.children("h3");
								var a = h3.children("a");
								var id_str = a.attr("id");
								if (isDefined(id_str)) {
									h3.text(fp);
									folderDecoration(h3, idNumber(id_str), "down");
								}
								return dt;
							}));
							if (h3.next().length < 1) {
								var dd = dt.next();
								found = finding(outerHtml(dd));
							}
							results++;
						}
					});
					$("input[type='checkbox']", found).each(function(index,item) {
						item = $(item);
						var id_str = item.attr("id");
						if (id_str.startsWith("up")) {
							var h3 = item.parent();
							h3.text(h3.text());
							folderDecoration(h3, idNumber(id_str), "down");
							item = h3.children("input[type='checkbox']");
						}
						fold(item);
						item.click(function(){fold($(this))});
					});
					break;
				case "links":
					$('#bookmarks dt>a').each(function(index,item) {
					    if (match($(item).text(), pattern, options, index)) {
							var dt = $(markup('dt'));
							dt.append($(item).clone());
					        found = finding(outerHtml(dt));
							results++;
					    }
					});
	 				break;
			}
			found = finding(null);
		}
		catch(err) {
			msg(err.message);
		}
	this.found = found;
	this.results = results;
}
function injectFolding() {
	if ($("head>style[name='folding']").length < 1) {
		$("<style>")
			.prop("name", "folding")
			.prop("type", "text/css")
			.html("\
			.folding input[type='checkbox'] {\
				display: none;\
			}\
			.folding input[type='checkbox'] + label {\
				background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUAQMAAAC3R49OAAAALHRFWHRDcmVhdGlvbiBUaW1lAE1vbiAyOSBNYXIgMjAwNCAxMTo0Mjo0MSArMDgwMJ76WicAAAAHdElNRQfUAx0DLQiMH22PAAAACXBIWXMAAE4gAABOIAEWfZneAAAABGdBTUEAALGPC/xhBQAAAAZQTFRF////AAAAVcLTfgAAAAF0Uk5TAEDm2GYAAAAhSURBVHjaY2DAAtj/MTCwMAFxEgSz/oJgGB8kB1KDBQAA42AFrfCslS8AAAAASUVORK5CYII=');\
				background-repeat: no-repeat;\
				padding-left: 20px;\
			}\
			.folding input[type='checkbox']:checked + label {\
				background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUAQMAAAC3R49OAAAALHRFWHRDcmVhdGlvbiBUaW1lAE1vbiAyOSBNYXIgMjAwNCAxMTo0OTowMCArMDgwMEQnpJ4AAAAHdElNRQfUAx0DMTfcDh3vAAAACXBIWXMAAE4gAABOIAEWfZneAAAABGdBTUEAALGPC/xhBQAAAAZQTFRF////AAAAVcLTfgAAAAF0Uk5TAEDm2GYAAAAcSURBVHjaY2DAAtj/MTCwMCEw6y8IRhYDqcECAKdgBC3hNMB1AAAAAElFTkSuQmCC');\
				background-repeat: no-repeat;\
				padding-left: 20px;\
			}\
			.folding dl {\
				margin: 20px;\
			}")
			.appendTo("head");
	}
	var id = 0;
	$("#bookmarks dt>h3").each(function(index, item) {
		folderDecoration($(item), ++id, "up");
	});
	$("#bookmarks input[type='checkbox']")
		.click(function(){fold($(this))});
	$("#bookmarks").find("a[icon]").each(function(index,item) {
		var icon = $(item).attr("icon");
		$(item).css("background-image", "url('" + icon + "')")
			.css("background-repeat", "no-repeat")
				.css("padding-left", "40px");
    });
}

