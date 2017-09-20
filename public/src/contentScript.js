var f = document.createElement('iframe');
f.src = chrome.runtime.getURL('trampoline.html');
f.hidden = true;
(document.body || document.documentElement).appendChild(f);