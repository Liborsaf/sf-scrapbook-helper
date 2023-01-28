function createPanel()
{
    let panel = document.getElementById("krtekpanel");
    if (panel)
        document.body.removeChild(panel);

    panel = document.createElement("div");

    panel.id = "krtekpanel";
    panel.style.zIndex = 1000;
    panel.style.fontSize = "50px";
    panel.style.width = "auto";
    panel.style.backgroundColor = "#FFFFFF33";
    panel.style.position = "fixed";
    panel.style.right = 0;
    panel.style.top = 0;

    panel.style.display = "flex";
    panel.style.flexDirection = "column";
    panel.style.alignItems = "center";

    document.body.appendChild(panel);

    let counter = document.createElement("div");
    counter.id = "krtekcounter";
    counter.style.color = "white";
    counter.textContent = "0";
    panel.appendChild(counter);

    let nameview = document.createElement("div");
    nameview.id = "krteknametag";
    nameview.style.color = "white";
    nameview.textContent = "";
    nameview.style.fontSize = "15px";
    panel.appendChild(nameview);

    let maxview = document.createElement("div");
    maxview.id = "krtekmax";
    maxview.style.color = "white";
    maxview.textContent = "";
    maxview.style.fontSize = "15px";
    panel.appendChild(maxview);
}

createPanel();

function setCounter(count)
{
    let counter = document.getElementById("krtekcounter");
    counter.textContent = count;
}

function setPlayerName(name)
{
    let nameview = document.getElementById("krteknametag");
    nameview.textContent = name;
}

function setMax(max)
{
    let maxview = document.getElementById("krtekmax");
    maxview.textContent = `Max: ${max.playerRank} - ${max.playerName} ${max.count}`;
}

function resetMax()
{
    let maxview = document.getElementById("krtekmax");
    maxview.textContent = '';
}

function interceptData() {
    var xhrOverrideScript = document.createElement('script');
    xhrOverrideScript.type = 'text/javascript';
    xhrOverrideScript.innerHTML = `
        (function() {
            var XHR = XMLHttpRequest.prototype;
            var send = XHR.send;
            var open = XHR.open;
            XHR.open = function(method, url) {
                this.url = url; // the request url
                return open.apply(this, arguments);
            }
            XHR.send = function() {
                this.addEventListener('load', function() {
                    if (this.url.includes('req.php') && this.url.includes('sfgame')) {
                        var dataDOMElement = document.createElement('div');
                        var decoder = new TextDecoder("utf-8");
                        var decoded = decoder.decode(this.response);
                        dataDOMElement.id = '__interceptedData';
                        dataDOMElement.innerText = decoded;
                        dataDOMElement.style.height = 0;
                        dataDOMElement.style.overflow = 'hidden';
                        document.body.appendChild(dataDOMElement);
                    }
                });
                return send.apply(this, arguments);
            };
        })();
    `;
    document.head.prepend(xhrOverrideScript);
}

function checkForDOM() {
    if (document.body && document.head) {
        interceptData();
    } else {
        requestIdleCallback(checkForDOM);
    }
}

function scrapeData() {
    var responseContainingEle = document.getElementById('__interceptedData');
    if (responseContainingEle) {
        var response = responseContainingEle.innerHTML;
        onRequest(response);
        responseContainingEle.remove();
        requestIdleCallback(scrapeData);
    } else {
        requestIdleCallback(scrapeData);
    }
}

let scrapbook = {};
let maxUnowned = { count: -Infinity, playerName: null, playerRank: 0 };

async function onRequest(text)
{
    let lookatRegex = /otherplayer.playerlookat:([^&]+)/g;
    let nameRegex = /otherplayername.r:([^&]+)/g;

    let lookatMatch = text.match(lookatRegex);
    let nameMatch = text.match(nameRegex);
    if (lookatMatch && lookatMatch.length != 0 && nameMatch && nameMatch.length != 0)
    {
        let items = parseLookat(lookatMatch[0].replace("otherplayer.playerlookat:", ""));

        let unownedCount = 0;
        for (item of items) {
            if (item in scrapbook && !scrapbook[item]) {
                ++unownedCount;
            }
        }

        setCounter(unownedCount);

        let playerName = nameMatch[0].replace("otherplayername.r:", "");
        setPlayerName(playerName);
        if (maxUnowned.count < unownedCount) {
            maxUnowned.count = unownedCount;
            maxUnowned.playerName = playerName;
            maxUnowned.playerRank = parseInt(lookatMatch[0].replace("otherplayer.playerlookat:", "").split('/')[6]);
            setMax(maxUnowned);
        }
    }

    let scrapbookRegex = /scrapbook.r:([^$]+)/g;
    let scrapbookMatch = text.match(scrapbookRegex);
    if (scrapbookMatch && scrapbookMatch.length != 0)
    {
        scrapbook = parseScrapbook(scrapbookMatch[0].replace("scrapbook.r:", ""));
    }

    let combatRegex = /combatloglist.s/g;
    let combatMatch = text.match(combatRegex);
    if (combatMatch)
    {
        maxUnowned = { count: -Infinity, playerName: null, playerRank: 0 };
        resetMax();
    }
}

requestIdleCallback(scrapeData);
requestIdleCallback(checkForDOM);
