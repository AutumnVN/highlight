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

    highlightCode(code, ext);
}

async function highlightCode(code, ext) {
    const style = `<style>
        body {
            background-color: #1e1e1e;
        }

        code {
            counter-increment: step 0;
            counter-reset: step;
            font-family: Consolas, monospace;
            font-size: 0.875rem;
            line-height: 1.125rem;
            white-space: pre-wrap;
        }

        .line::before {
            display: inline-block;
            counter-increment: step;
            margin-right: 1rem;
            width: 2.5rem;
            content: counter(step);
            color: #6e7681;
            text-align: right
        }
    </style>`;
    if (location.hostname === 'raw.githubusercontent.com') {
        chrome.runtime.sendMessage({ code, ext }, response => {
            if (response) document.body.innerHTML = response + style;
        });
    } else {
        const highlighter = await shiki.getHighlighter({
            theme: 'dark-plus',
            langs: []
        });
        await highlighter.loadLanguage(ext);
        document.body.innerHTML = highlighter.codeToHtml(code, { lang: ext }) + style;
    }
}
