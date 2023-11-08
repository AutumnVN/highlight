if (document.contentType !== 'text/html' && (document.contentType.startsWith('text/') || document.contentType.startsWith('application/')) && document.body.firstChild.tagName === 'PRE') {
    let code = document.body.firstChild.textContent;
    let ext = location.pathname.split('.').pop().toLowerCase();
    if (ext.length > 9 || !/^\w+$/.test(ext)) ext = document.contentType.split('/').pop().toLowerCase();

    if (['cjs', 'mjs'].includes(ext)) ext = 'js';
    if (['cts', 'mts'].includes(ext)) ext = 'ts';

    switch (ext) {
        case 'html':
            code = html_beautify(code);
            break;
        case 'css':
        case 'less':
        case 'scss':
        case 'sass':
            code = css_beautify(code);
            break;
        case 'js':
        case 'jsx':
        case 'javascript':
        case 'ts':
        case 'tsx':
        case 'json':
            code = js_beautify(code);
            break;
    }

    const codeElement = document.createElement('code');
    codeElement.textContent = code;
    codeElement.classList.add(`language-${ext}`);
    document.body.firstChild.innerHTML = '';
    document.body.firstChild.appendChild(codeElement);
    hljs.highlightAll();
}
