const scripts = ["script.js", "scrapbook.js", "playeritems.js"];

const scriptsElement = (document.head || document.documentElement);

const loadScript = (name) => {
    let script = document.createElement('script');
    script.src = chrome.runtime.getURL(name);
    script.onload = function() {
        console.log(`Script ${name} was loaded!`);

        this.remove();
    };

    scriptsElement.appendChild(script);
}

scripts.forEach(loadScript);
