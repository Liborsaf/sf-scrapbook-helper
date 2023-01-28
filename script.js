const panelId = "scrapbook-helper";
const counterClass = "counterView";
const nameClass = "nameView";
const maxClass = "maxView";

const lookAtRegex = /otherplayer.playerlookat:([^&]+)/g;
const nameRegex = /otherplayername.r:([^&]+)/g;
const scrapbookRegex = /scrapbook.r:([^$]+)/g;
const combatRegex = /combatloglist.s/g;

const interceptor = "(" +
    function() {
        // console.log("Interceptor injected!");

        const processResponse = async (response) => {
            if (response.url.includes("req.php") && response.url.includes("sfgame")) {
                let dataElement = document.createElement('div');
                dataElement.id = '__interceptedData';
                dataElement.innerText = await response.text();
                dataElement.style.height = "0";
                dataElement.style.overflow = 'hidden';

                document.body.appendChild(dataElement);
            }
        }

        const overrideFetch = () => {
            let originalFetch = window.fetch;

            window.fetch = async (... args) => {
                let [resource, config] = args;
                let response = await originalFetch(resource, config);

                if (!response.ok) {
                    return Promise.reject(response);
                }

                await processResponse(response.clone());

                return response;
            };
        }

        overrideFetch();
} + ")();";

const injectInterceptor = () => {
    let xhrOverrideScript = document.createElement('script');
    xhrOverrideScript.type = 'text/javascript';
    xhrOverrideScript.textContent = interceptor;

    document.head.prepend(xhrOverrideScript);
    xhrOverrideScript.remove();
}

const checkForDOM = () => {
    if (document.body && document.head) {
        injectInterceptor();
        init();
    } else {
        requestIdleCallback(checkForDOM);
    }
}

const init = () => {
    createPanel();
    scrapeData();
}

let scrapbook = {};
let maxUnowned = { count: -Infinity, playerName: null, playerRank: 0 };

const createPanel = () => {
    let panel = document.getElementById("panelId");

    if (panel) {
        document.body.removeChild(panel);
    }

    panel = document.createElement("div");

    panel.id = panelId;
    panel.style.zIndex = "1000";
    panel.style.fontSize = "50px";
    panel.style.width = "auto";
    panel.style.backgroundColor = "#FFFFFF33";
    panel.style.position = "fixed";
    panel.style.right = "0";
    panel.style.top = "0";

    panel.style.display = "flex";
    panel.style.flexDirection = "column";
    panel.style.alignItems = "center";

    document.body.appendChild(panel);

    let counterView = document.createElement("div");
    counterView.classList.add(counterClass);
    counterView.style.color = "white";
    counterView.textContent = "0";
    panel.appendChild(counterView);

    let nameView = document.createElement("div");
    nameView.classList.add(nameClass);
    nameView.style.color = "white";
    nameView.textContent = "";
    nameView.style.fontSize = "15px";
    panel.appendChild(nameView);

    let maxView = document.createElement("div");
    maxView.classList.add(maxClass);
    maxView.style.color = "white";
    maxView.textContent = "";
    maxView.style.fontSize = "15px";
    panel.appendChild(maxView);
}

const scrapeData = () => {
    let dataElement = document.getElementById('__interceptedData');

    if (dataElement) {
        let data = dataElement.innerHTML;
        processData(data).then();
        
        dataElement.remove();
    }

    requestIdleCallback(scrapeData);
}

const getView = (name) => {
    return document.getElementById(panelId).getElementsByClassName(name)[0];
}

const setCounter = (count) => {
    getView(counterClass).textContent = count;
}

const setPlayerName = (name) => {
    getView(nameClass).textContent = name;
}

const resetPlayerName = () => {
    getView(nameClass).textContent = '';
}

const setMax = (max) => {
    getView(maxClass).textContent = `Max: ${max.playerRank} - ${max.playerName} ${max.count}`;
}

const resetMax = () => {
    getView(maxClass).textContent = '';
}

const processData = async (data) => {
    // console.log(`Processing data: ${data}`);

    let lookAtMatch = data.match(lookAtRegex);
    let nameMatch = data.match(nameRegex);

    if (lookAtMatch && lookAtMatch.length !== 0 && nameMatch && nameMatch.length !== 0) {
        let items = parseLookAt(lookAtMatch[0].replace("otherplayer.playerlookat:", ""));

        let unownedCount = 0;

        for (let item of items) {
            if (item in scrapbook && !scrapbook[item]) {
                unownedCount++;
            }
        }

        let playerName = nameMatch[0].replace("otherplayername.r:", "");

        if (unownedCount === 0) {
            resetPlayerName();
        } else {
            setPlayerName(playerName);
        }

        setCounter(unownedCount);


        if (maxUnowned.count < unownedCount) {
            maxUnowned.count = unownedCount;
            maxUnowned.playerName = playerName;
            maxUnowned.playerRank = parseInt(lookAtMatch[0].replace("otherplayer.playerlookat:", "").split('/')[6]);

            setMax(maxUnowned);
        }
    }

    let scrapbookMatch = data.match(scrapbookRegex);

    if (scrapbookMatch && scrapbookMatch.length !== 0) {
        scrapbook = parseScrapbook(scrapbookMatch[0].replace("scrapbook.r:", ""));
    }

    let combatMatch = data.match(combatRegex);

    if (combatMatch) {
        maxUnowned = { count: -Infinity, playerName: null, playerRank: 0 };

        resetMax();
    }
}

requestIdleCallback(checkForDOM);
