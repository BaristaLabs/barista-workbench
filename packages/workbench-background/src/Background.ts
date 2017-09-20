chrome.browserAction.onClicked.addListener((tab) => {
    
    chrome.tabs.create({ 'url': chrome.extension.getURL(`index.html#/fiddle?source=${tab.id}`), 'selected': true }, (fiddleTab) => {
        if (!tab.id || !fiddleTab.id) {
            console.error('The tab upon which the browser action was pressed did not have an id');
            return;
        }

        const port = chrome.tabs.connect(fiddleTab.id);
        chrome.tabs.executeScript(tab.id, {file: 'src/contentScript.js'}, (response) => {
            
        });
    });

});