const scripts = ["script.js", "scrapbook.js", "playeritems.js"];

const scriptElement = (document.head || document.documentElement);

const loadScript = (name) => {
    let script = document.createElement('script');
    script.src = chrome.runtime.getURL(name);
    script.onload = function() {
        console.log(`Script ${name} was loaded!`);

        if (name !== "interceptor.js") {
            this.remove();
        }
    };

    scriptElement.appendChild(script);
}

scripts.forEach(loadScript);
