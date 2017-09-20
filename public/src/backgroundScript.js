var worker = new SharedWorker(chrome.runtime.getURL('src/worker.js'));
worker.port.start();

chrome.browserAction.onClicked.addListener((tab) => {
    
    chrome.tabs.create({ 'url': chrome.extension.getURL(`index.html#/fiddle?source=${tab.id}`), 'selected': true }, (fiddleTab) => {
        if (!tab.id || !fiddleTab.id) {
            console.error('The tab upon which the browser action was pressed did not have an id');
            return;
        }

        chrome.tabs.executeScript(tab.id, {file: 'src/contentScript.js'}, (response) => {
            // Demo: Print the message to the console, and remember the last result
            worker.port.onmessage = function(event) {
                console.log('Received message', event.data);
                window.lastMessage = event.data;
            };
            
            // Demo: send a message
            worker.port.postMessage('Hello');    
        });
    });

});