function listener(details)
{
    if (!details.url.includes("sfgame") || !details.url.includes("req.php") || details.type != "xmlhttprequest")
        return {};

    let filter = browser.webRequest.filterResponseData(details.requestId);
    let decoder = new TextDecoder("utf-8");
    let encoder = new TextEncoder();

    let data = [];

    filter.ondata = event =>
    {
        data.push(event.data);
    };

    filter.onstop = event => {
        let str = "";
        if (data.length == 1) {
          str = decoder.decode(data[0]);
        }
        else {
          for (let i = 0; i < data.length; i++) {
            let stream = (i == data.length - 1) ? false : true;
            str += decoder.decode(data[i], {stream});
          }
        }

        filter.write(encoder.encode(str));
        filter.close();
        
        onRequest(str, details.tabId);
    };
}

browser.webRequest.onBeforeRequest.addListener(
    listener,
    { urls: ["<all_urls>"] },
    ["blocking"]
);

var scrapbooksByTabId = {};

async function onRequest(text, tabId)
{
    let lookatRegex = /otherplayer.playerlookat:([^&]+)/g;
    let nameRegex = /otherplayername.r:([^&]+)/g;

    let lookatMatch = text.match(lookatRegex);
    let nameMatch = text.match(nameRegex);
    if (lookatMatch && lookatMatch.length != 0 && nameMatch && nameMatch.length != 0)
    {
        let items = parseLookat(lookatMatch[0].replace("otherplayer.playerlookat:", ""));
        let scrapbook = scrapbooksByTabId[tabId];

        let unownedCount = 0;
        if (!scrapbook)
        {
            unownedCount = "NOPE";
        }
        else
        {
            items.forEach(item =>
            {
                if (item in scrapbook && !scrapbook[item])
                {
                    ++unownedCount;
                }
            });
        }

        await browser.tabs.executeScript(tabId, { code: `setCounter(\"${unownedCount}\");` });

        let playerName = nameMatch[0].replace("otherplayername.r:", "");
        await browser.tabs.executeScript(tabId, { code: `setPlayerName(\"${playerName}\");` });
    }

    let scrapbookRegex = /scrapbook.r:([^$]+)/g;
    let scrapbookMatch = text.match(scrapbookRegex);
    if (scrapbookMatch && scrapbookMatch.length != 0)
    {
        let scrapbook = parseScrapbook(scrapbookMatch[0].replace("scrapbook.r:", ""));
        scrapbooksByTabId[tabId] = scrapbook;
    }
}