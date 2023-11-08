chrome.webRequest.onHeadersReceived.addListener(details => {
    details.responseHeaders.forEach(header => {
        if (header.name.toLowerCase() === 'content-security-policy') header.value = ""
    });
    return { responseHeaders: details.responseHeaders };
}, { urls: ['*://raw.githubusercontent.com/*'] }, ['blocking', 'responseHeaders']);
