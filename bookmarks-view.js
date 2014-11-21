if ( typeof String.prototype.format != 'function' ) {
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) { 
			return typeof args[number] != 'undefined'
				? args[number]
				: match;
		});
	};
}
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
	return String.fromCharCode(60)
		+ (slash == 1 ? "/" : "") 
		+ tag 
		+ (slash == 2 ? " /" : "") 
		+ String.fromCharCode(62);
}
function imgMarkup(alt) {
	var img = "img alt=" + quoted(alt), src = " ";
	switch (alt) {
		case "up":
			src += "src=" + quoted('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgxJREFUeNqkVL1rFEEU/83e7O7lUiQQUBMU0UoQG8dKTGHjKYKFghg5tLQStrWwErUVBMFCbeK/oWAq8QMCXk4iWETQ8+Mut3tu3J398r1J9o5cPC188ObNvDfvN+9rVxRFgf8hycvhW2/huC4kse04kFKiImWDTB7xvSxNF9M0RaI10jiGJm7ePGoArDHADXLyFuq7FEs+j4tgJ0BRNOg17/KZObW2FmPh9JziM+v/DUCXkiTxGmf3qZWVPoJAo9Xq41J9r2L9n0CsoS+9rLV35dxBtbzcQxynA242fVw8tV+xvRgBsUpnKpB39fwh1W5HmJmhYtoFfN9HGPaQZQGBfEL9+G6VjICYLmRaz3M7Hzx5+aY0nFB7VKezjtnZabx49WVL3zarEGKexOIAgJyv5XlepgKq/OtfuYCWNiII0zZq6zFy3AzbsrbPQUl5liHa2DD7wHIRODmqwoWOIqOr1mqwKpWdg8SUJglCyrmkjpxAd4IGypZIKAImlpNTU2botgF0lx4j7AdwjlwYGLoE0Ku6FLplUiip9/Q60nYTuF0MATpLjzZf+PwO7skbZu9XXPx06ALdoPYZXfz8LrJvrfGDxMbo2R0z87AEarZAQYXjM+tHnUeLyIkdyL+/n8TX1uqP+w+Hls6HVdIr2nEoH4nD0iS4bVvtYbBpYucvX29GvM5A5W/gtwADAPaeC0Xi4UgBAAAAAElFTkSuQmCC');
			break;
		case "down":
			src += "src=" + quoted('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAhBJREFUeNqkk79v00AUx78X26GJkzQqP4qKqLoQMWMhkBASLOyIAYQywVBGJv6OrFX5sUSoYoCpFagSVKpgac1SFmABofJDpE3t1Mn57LN5F+LEDoWFk55P9967z33P7x2L4xj/M3T1ufTwR8bJGFugyUq5bDpoPp2zdmt6BIikHAdb16/MWEEQQ9cZnqx+/beCMAz/CHiehOuGKJf1A+MZgNNqoVipZAKchwQQpCBGIEQm1nVd+s6OAJ7jIPA5zMrkMEkICd8PEQQaQt8fKXMdCO5nFaihTunstXGoUBwAQjgEZsyAGAD8Xhdy7Dp6eqGC3NuHpulo0bV2dtrI56sIOIeUIaIoOvgfUIkWEP0um4wkgSR6EYPQDXCwRMFmsonybZrmR1UQYp2c1rWbF6xPP7sqAdtegE7ehBQaaudrluq3qmng9YptU5+sJ7DcgNgkSGPp0Uu7OFXC1r6Gz/EEdgtlfEEB77mBuGxi7dkbW+Wp/AwggdCPbDxfXLbnTlaxN1Ea2uHpSWw8fmEHY5v7XavkVs7V+/dmR2rA1Kk6+e7O3qlbH6jccybwfbGpZDew+7Eptp4i+PYOwzc0/phyx05Dv3ivbly9vzmzGsdqVmvlTw+1T1lfAdGVzyA7TnZUKcuduX0ZJ87ewPbGUvT2wavBvjaZehg8OTgN0MhKZKqT2F9av0fWUYVLAL8EGAB/dRts9he48AAAAABJRU5ErkJggg==');
			break;
	}
	return markup(img + src, 2);
}
function matchMarkup(str, tag) {
//	popupCode(str);
	var rex = new RegExp("<" + tag + "[^<]*>", "ig");
	return str.match(rex) || [];
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
function popupCode(html) {
	var popup = window.open("", "html", 'scrollbars=1,height=200,width=600');
	popup.document.write(markup('pre')+markup('xmp')+html+markup('xmp',1)+markup('pre',1));
	if (window.focus) popup.focus();
	return popup;
}
function bookmarksSelector() {
	return "#bookmarks" 
		+ (arguments.length > 0 ? " " + arguments[0] : "")
}
var FOLD_SELECTOR = bookmarksSelector("input[type='checkbox']");
function folderPath(el) {
	var args = Array.prototype.slice.call(arguments, 1);
	if (el.length < 1 || !isDefined(el.prop("tagName"))) 
		return args.shift();
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
		if (s.length)
			args.unshift(s);
		el = el.parent();
		s = args.join("|");
		return s.length ? folderPath(el, s) : folderPath(el);
	}
}
function folder(el) {
	el = el.closest('dl');
	if (el.length) {
		el = el.closest('dt,dd');
		if (el.length && el.get(0).nodeName.toLowerCase() == 'dd')
			el = el.prev('dt');
	}
	return el;
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
function idNumber(str) {
	return str.substring(1 + str.indexOf("_"));
}
function folderId(h3) {
	var a = h3.children("a");
	return a.attr("id");
}
function linkDecoration(item, id, alt, tooltip) {
	var id_str = "id_" + id;
	var ht_str = "a href="; 
	ht_str += alt == "up"
		? quoted("#top") + " id=" + quoted(id_str)
		: quoted("#" + id_str);
	if (isDefined(tooltip))
		ht_str += " title=" + quoted(tooltip);
	ht_str = markup(ht_str, 0);
	ht_str += imgMarkup(alt);
	ht_str += markup("a", 1);
	return item.append(ht_str);
}
function folderDecoration(item, id, alt) {
	var id_str = quoted(alt + "_" + id);
	var ht_str = "input type='checkbox' id=" + id_str;
	ht_str += alt == "up"
		? " checked" 
		: "";
	ht_str = markup(ht_str, 2);
	ht_str += markup("label for=" + id_str, 2);
	item.prepend(ht_str);
	return linkDecoration(item, id, alt);
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
			return arguments.length > 0 ? found.append(html) : found;
		}
	})()
    var found = undefined;
	var pat = options.pat || '';
    if (pat.length >= (options.rex?1:2)) 
		try {
			var pattern = options.rex 
				? new RegExp(pat, options.sens ? '' : 'i')
				: options.sens ? pat : pat.toLowerCase();
			found = finding();
			switch (options.what || 'links') {
				case "folders":
					$(FOLD_SELECTOR).each(function(index,item) {
						var h3 = $(item).parent();
						if (match(h3.text(), pattern, options, index)) {
							var fp = folderPath(h3);
							var dt = h3.parent();
							found = finding(outerHtml(dt, function(dt) {
								var h3 = dt.children("h3");
								var id_str = folderId(h3);
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
					$(bookmarksSelector('dt>a')).each(function(index,item) {
					    if (match($(item).text(), pattern, options, index)) {
							var dt = $(markup('dt'));
							var clone = $(item).clone();
							dt.prepend(clone);
							var foldr = folder($(item));
							if (foldr.length) {
								var h3 = foldr.children("h3");
								var id_str = folderId(h3);
								if (isDefined(id_str)) 
									linkDecoration(dt, idNumber(id_str), "down", folderPath(h3));
							}
					        found = finding(outerHtml(dt));
							results++;
					    }
					});
	 				break;
			}
			found = finding();
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
	if ($(FOLD_SELECTOR).length < 1) {
		var id = 0;
		$(bookmarksSelector('dt>h3')).each(function(index, item) {
			folderDecoration($(item), ++id, "up");
		});
		$(FOLD_SELECTOR)
			.click(function(){fold($(this))});
		$(bookmarksSelector()).find("a[icon]").each(function(index,item) {
			var icon = $(item).attr("icon");
			$(item).css("background-image", "url('" + icon + "')")
				.css("background-repeat", "no-repeat")
					.css("padding-left", "40px");
		});
	}
}

