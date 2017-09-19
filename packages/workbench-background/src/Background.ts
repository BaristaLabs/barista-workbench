chrome.browserAction.onClicked.addListener((tab) => {
    console.dir('icon clicked.');

    chrome.tabs.create({ 'url': chrome.extension.getURL('index.html'), 'selected': true });
});