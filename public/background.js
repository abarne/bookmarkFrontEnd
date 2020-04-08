/*global chrome*/

chrome.tabs.getCurrent(function(tab) {
	console.log('cl the tab url, ', tab.url);
});
