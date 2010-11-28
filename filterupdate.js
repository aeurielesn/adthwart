// This file (c) T. Joseph <ttjoseph@gmail.com>
// Everyone can use, modify and distribute this file without restriction.

// List of suggested filter lists
var filterFiles = {
    "easylist": "http://easylist.adblockplus.org/easylist.txt", // "easylist.txt",
    "germany": "http://easylist.adblockplus.org/easylistgermany.txt", // "easylistgermany.txt",
    "fanboy_es": "http://www.fanboy.co.nz/adblock/fanboy-adblocklist-esp.txt",
    "france": "http://adblockplus.mozdev.org/easylist/liste_fr+easylist.txt", // "liste_fr.txt",
    "china": "http://adblock-chinalist.googlecode.com/svn/trunk/adblock.txt", // "adblock.txt",
    "russia": "http://ruadlist.googlecode.com/svn/trunk/advblock.txt",
    "korea": "http://abp-corset.googlecode.com/hg/corset.txt", // "corset.txt",
    "romania": "http://www.zoso.ro/pages/rolist.txt", // "menetzrolist.txt",
    "italy": "http://mozilla.gfsolone.com/filtri.txt", // "filtri.txt",
    "vietnam": "http://adblockplus-vietnam.googlecode.com/svn/trunk/abpvn.txt",
    "poland": "http://www.niecko.pl/adblock/adblock.txt", // PLgeneral
    "hungary": "http://pete.teamlupus.hu/hufilter.txt", // hufilter
    "extras": "http://adthwart.qux.us/filters/recommended.txt"
};

var filterListTitles = {
    "easylist": '<a href="http://easylist.adblockplus.org/">EasyList</a>',
    "germany": 'EasyList Germany',
    "fanboy_es": "Fanboy's Español/Português supplement",
    "france": 'EasyList + Liste FR (Français)',
    "china": '<a href="http://code.google.com/p/adblock-chinalist/">ChinaList</a> (中文)',
    "russia": '<a href="http://code.google.com/p/ruadlist/">RuAdList</a> (Русский, Українська)',
    "korea": '<a href="http://corset.tistory.com">Corset</a> (한국어)',
    "romania": '<a href="http://www.picpoc.ro/">ROList</a> (Românesc)',
    "italy": '<a href="http://gfsolone.com/realizzazioni/altro/abp-x-files">X Files</a> (Italiano)',
    "vietnam": 'Việt Nam list',
    "poland": 'PLgeneral (Polski)',
    "hungary": 'hufilter (Magyar)',
    "extras": '<a href="' + filterFiles["extras"] + '">AdThwart recommended filters</a>'
};

var filterListAuthors = {
    "easylist": 'Ares2, Michael, and Erunno',
    "germany": 'Ares2 and Erunno',
    "france": 'Lian',
    "china": 'Gythialy',
    "korea": 'maybee',
    "romania": 'MenetZ',
    "italy": 'Gioxx',
    "vietnam": 'NGUYỄN Mạnh Hùng',
    "poland": 'Krzysztof Niecko',
    "hungary": 'Szabó Péter'
};

// Filter lists turned on by default, guessed based on i18n reported locale.
// "easylist" and "extras" should be on by default everywhere, so it isn't included here.
var defaultFilterListsByLocale = {
    "de": ['easylist', 'germany'],
    "es": ['easylist', 'fanboy_es'],
    "fr": ['france'],
    "hu": ['easylist', 'hungary'],
    "it": ['easylist', 'italy'],
    "ko": ['easylist', 'korea'],
    "po": ['easylist', 'poland'],
    "pt": ['easylist', 'fanboy_es'],
    "pt_BR": ['easylist', 'fanboy_es'],
    "ro": ['easylist', 'romania'],
    "ru": ['easylist', 'russia'],
    "vi": ['easylist', 'vietnam'],
    "zh": ['easylist', 'china'],
    "zh_CN": ['easylist', 'china'],
    "zh_TW": ['easylist', 'china']
};

// Default filter list expiration time is 3 days (specified in milliseconds)
// But, in case that is garbled in the filter list, clamp it to a predefined range
var DEFAULT_EXPIRE_TIME =  3 * 86400 * 1000;
var MIN_EXPIRE_TIME = 1 * 86400 * 1000;
var ADTHWART_MIN_EXPIRE_TIME = 4 * 3600 * 1000;
var MAX_EXPIRE_TIME = 14 * 86400 * 1000;

// Adds entries in filterFiles for any user filters. Other functions will
// reference filterFiles directly, even though global variables are evil.
function loadUserFilterURLs() {
    // Get rid of all user_* entries; we'll restore them from localStorage
    for(key in filterFiles) {
        if(key.match(/^user_/)) delete filterFiles[key];
    }
    // Read the user filter URLs from localStorage
    if(typeof localStorage["userFilterURLs"] != "string") return; // Nothing there
    var urls = JSON.parse(localStorage["userFilterURLs"]);
    for(key in urls) filterFiles[key] = urls[key];
}

// TODO: In case of error fetching a filter list, check to see whether
// we already have a copy cached, and leave it there.
// At present the cached copy can be deleted.
function FilterListFetcher(nameOrUrl, callback) {
    this.name = nameOrUrl;
    // Accept name as URL if it starts with http
    this.url = nameOrUrl.match(/^http/i) ? nameOrUrl : filterFiles[nameOrUrl];
    this.callback = callback;
    this.xhr = new XMLHttpRequest();
    this.error = false;
    var fetcher = this;
    this.xhr.onreadystatechange = function() {
        if(this.readyState != 4) return;
        if(this.status == 200) {
            // Check if it's actually a filter set and if so, save it along with its expiry information
            if(this.responseText.match(/\[Adblock/)) {
                var lastUpdated = this.responseText.match(/Last modified:\s+(.+)/i);
                var now = (new Date()).getTime();
                lastUpdated = lastUpdated ? Date.parse(lastUpdated[1]) : now;
                var expires = this.responseText.match(/Expires:\s+(\d+)\s+(\w+)/i);
                var unit = "day";
                var unitLength = 86400; // Default to units of days
                if(!expires) expires = ["", "3", "days"]; // Default to 3 days if Expires field is unparseable
                if(expires.length > 2) unit = expires[2]; // Is a unit specified? If so, grab it
                if(unit.match(/hour/)) unitLength = 3600; // in seconds
                expires = expires ? parseInt(expires[1]) * unitLength * 1000 : DEFAULT_EXPIRE_TIME; // in milliseconds

                // Min expire time is a day unless it's the AdThwart server. This is a really weak
                // authentication mechanism but the worst a lying server could do is
                // cause a DDoS on itself. Now that is limited as well.
                var myMinExpireTime = MIN_EXPIRE_TIME;
                if(this.getResponseHeader("X-AdThwart") != "") myMinExpireTime = ADTHWART_MIN_EXPIRE_TIME; // 4 hours
                expires = expires < myMinExpireTime ? myMinExpireTime : expires;
                expires = expires > MAX_EXPIRE_TIME ? MAX_EXPIRE_TIME : expires;
                // If the list we just downloaded is expired, mark its lastUpdated time as now or we will
                // think the list is too old on every update check and keep trying to download it, which would pound
                // that server, which wouldn't be very nice. Also, if the list claims it was updated in the
                // future, don't believe it.
                if((now - lastUpdated) > expires || lastUpdated > now)
                    lastUpdated = now;
                var synched = synchronizeList(fetcher.url, this.responseText);
                localStorage[fetcher.url] = JSON.stringify({lastDownloaded: now, lastUpdated: lastUpdated, expires: expires, text: synched.text, removed: synched.removed});
                fetcher.callback(fetcher);
                return;
            } else {
                fetcher.error = chrome.i18n.getMessage("not_a_filter_list");
                fetcher.callback(fetcher);
                return;
            }
        } else if(this.status == 404) {
            fetcher.error = chrome.i18n.getMessage("not_found_on_server");
            localStorage[fetcher.url] = JSON.stringify({lastUpdated: (new Date()).getTime(), error: fetcher.error});
            fetcher.callback(fetcher);
            return;
        } else if(this.status == 503) {
            // Most likely a 503 means quota exceeded on the server
            // XXX: We aren't signaling an error here because we don't want to disable checking of this filter list
        }
        // TODO: Doesn't actually do anything in case of other errors
    }
    try {
        // Send MD5 hash of what we have at the moment
        var currentFilters = null, md5hash = null;
        if(typeof localStorage[this.url] == "string") currentFilters = JSON.parse(localStorage[this.url]);
        if(currentFilters && currentFilters.text) md5hash = MD5.hash(currentFilters.text);
        // Have to call open() before setting the header for some reason
        this.xhr.open("GET", this.url, true);
        if(md5hash) {
            // console.log(md5hash, currentFilters.text.length);
            this.xhr.setRequestHeader("X-AdThwart-My-MD5", md5hash);
        }
        this.xhr.send(null);
    } catch(e) {
        fetcher.error = "Useless error message: " + e;
        fetcher.callback(fetcher);        
    }
}

function sanitizeContent(fetchedContent) {
	var ret = new Array();
	var filters = fetchedContent.split('\n');
	for (var i in filters) {
        // Remove any extra newline-type characters
        var filter = filters[i].replace(/[\r\n]/, '');
        // Ignore zero-length and commented-out lines
        if(filter.length == 0)
            continue;
        ret.push(filter);
	}
	return ret;
}

//This function synchronize the filter's selections from the updated list and
//the current setting of the user
function synchronizeList(filterName, fetchedContentText) {
	//console.log("Synchronizing " + filterName + ".");
	var sanitizedContentArray = sanitizeContent(fetchedContentText);

	// It's a completly new filter 
	if(typeof localStorage[filterName] == "undefined") {
		//console.log("Synchronization of " + filterName + " completed: it is a new filter list.");
		return { text: sanitizedContentArray.join("\n"), removed: "" };
	}

	var current = JSON.parse(localStorage[filterName]);

	if((typeof current.text == "undefined") || (typeof current.removed == "undefined")) {
		//console.log("Synchronization of " + filterName + " completed: migrating.");
		return { text: sanitizedContentArray.join("\n"), removed: "" };
	}
	
	var currentFilters = current.text ? current.text.split('\n') : new Array();
	var removedFilters = current.removed ? current.removed.split('\n') : new Array();
	var currentFiltersLength = currentFilters.length;
	var removedFiltersLength = removedFilters.length;

	sanitizedContentArray.sort();
	for (var i in sanitizedContentArray) {
		var filter = sanitizedContentArray[i];
		var cu = null, re = null;
		
		while(removedFiltersLength && (filter > removedFilters[0])) {
			removedFiltersLength = removedFiltersLength - 1;
			removedFilters.shift();
		}
		while(currentFiltersLength && (filter > currentFilters[0])) { 
			currentFiltersLength = currentFiltersLength - 1;
			currentFilters.shift();
		}
		
		if(currentFiltersLength) cu = currentFilters[0];
		if(removedFiltersLength) re = removedFilters[0];
		
		if((cu==null || filter < cu) && (re==null || filter < re)) {
			currentFilters.push(filter);
		} else if(filter == re) {
			removedFiltersLength = removedFiltersLength - 1;
			removedFilters.push(removedFilters.shift());
		} else if(filter == cu) {
			currentFiltersLength = currentFiltersLength - 1;
			currentFilters.push(currentFilters.shift());
		}
	}
	removedFilters.splice(0, removedFiltersLength);
	currentFilters.splice(0, currentFiltersLength);
	//console.log("Synchronization of " + filterName + " completed.");
	return {text: currentFilters.join("\n"), removed: removedFilters.join("\n")};
}
