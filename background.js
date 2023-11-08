importScripts('shiki/shiki.js');

chrome.runtime.onMessage.addListener(({ code, ext }, sender, sendResponse) => {
    shiki.getHighlighter({
        theme: 'dark-plus',
        langs: []
    }).then(highlighter => {
        highlighter.loadLanguage(ext).then(() => {
            sendResponse(highlighter.codeToHtml(code, { lang: ext }));
        });
    });
    return true;
});
