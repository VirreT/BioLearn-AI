window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const response = urlParams.get('response');

    const responseContainer = document.getElementById('responseContainer');

    // Enforce output format: only allow <p>, <ul>, <ol>, <li>, <strong>, <em>
    // Wrap output between literal markers <!--BEGIN--> and <!--END-->
    function escapeHtml(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function sanitizeHtml(input) {
        if (!input) return '';
        const parser = new DOMParser();
        const doc = parser.parseFromString(input, 'text/html');
        const allowed = new Set(['p', 'ul', 'ol', 'li', 'strong', 'em']);

        function serialize(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                return escapeHtml(node.textContent);
            }
            if (node.nodeType !== Node.ELEMENT_NODE) return '';

            const tag = node.tagName.toLowerCase();
            let children = '';
            node.childNodes.forEach(child => {
                children += serialize(child);
            });

            if (allowed.has(tag)) {
                return `<${tag}>${children}</${tag}>`;
            }
            // For disallowed tags, unwrap and keep children text/allowed descendants
            return children;
        }

        let out = '';
        doc.body.childNodes.forEach(n => {
            out += serialize(n);
        });
        return out.trim();
    }

    let finalHTML = '<!--BEGIN--><!--END-->';

    if (response) {
        const decodedResponse = decodeURIComponent(response || '');
        const sanitized = sanitizeHtml(decodedResponse);
        if (sanitized) {
            finalHTML = '<!--BEGIN-->' + sanitized + '<!--END-->';
        }
    }

    // Insert the sanitized, wrapped HTML into the container
    responseContainer.innerHTML = finalHTML;
    // Store the wrapped HTML so the copy button can copy the exact content
    responseContainer.dataset.wrappedHtml = finalHTML;
        // Build a plain-text representation (preserve visible text/newlines)
        const tmp = document.createElement('div');
        tmp.innerHTML = sanitized || '';
        const plainText = (tmp.innerText || tmp.textContent || '').trim();
        // Include the literal markers in the plain-text copy
        responseContainer.dataset.wrappedText = '<!--BEGIN-->' + (plainText ? '\n' + plainText + '\n' : '') + '<!--END-->';
});

document.getElementById("copybtn").addEventListener("click", function() {
    var container = document.getElementById("responseContainer");
        var copyText = container.dataset.wrappedText || container.innerText || '';

    navigator.clipboard.writeText(copyText)
        .then(function() {
            alert("Copied To Clipboard!");
        })
        .catch(function(error) {
            alert("Failed to copy text: " + error);
        });
});

