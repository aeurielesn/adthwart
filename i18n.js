// Loads and inserts i18n strings into matching elements. Any inner HTML already in the
// element is parsed as JSON and used as parameters to substitute into placeholders in the
// i18n message.
function loadI18nStrings() {
    var nodes = document.querySelectorAll("[class^='i18n_']");
    for(var i = 0; i < nodes.length; i++) {
		var arguments = JSON.parse("[" + nodes[i].innerHTML + "]");
		if(arguments.length > 0)
		    nodes[i].innerHTML = chrome.i18n.getMessage(nodes[i].className.substring(5), arguments);
		else
		    nodes[i].innerHTML = chrome.i18n.getMessage(nodes[i].className.substring(5));
    }
}

function i18n_time(h, m) {
    var locale = chrome.i18n.getMessage("@@ui_locale");
    if(m < 10) m = "0" + m;
    if(locale == "fr") {
        return h + "h" + m;
    } else {
        var ampm = "a.m.";
    	if(h >= 12) {
            h -= 12;
            ampm = "p.m.";
    	}
    	if(h == 0) h = 12;
    	return(h + ":" + m + " " + ampm);
    }
}

// Provides a more readable string of the current date and time
function i18n_timeDateStrings(when) {
	var monthNames = JSON.parse(chrome.i18n.getMessage("month_names"));
	var d = new Date(when);
	var timeString = i18n_time(d.getHours(), d.getMinutes());
	var now = new Date();
	if(d.getDate() == now.getDate() && d.getMonth() == now.getMonth() && d.getFullYear() == now.getFullYear())
            dateString = chrome.i18n.getMessage("today");
	else
            dateString = chrome.i18n.getMessage("date_format", [d.getDate(), monthNames[d.getMonth()], d.getFullYear()]);
	
	return [timeString, dateString];
}

