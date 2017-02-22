
/*
    iMacros JavaScript macro for Steam collection organization
    Using iMacros 8.9.7 on Firefox

    SteamWorkshop_CollectionAllAndUnsub v1.0
*/

var appId = 255710;         // Cities: Skylines hard-coded appId
var userName = "";
var modCollectionId = 852323535;
var collectionId = 869286512;
var iterationCount = 3;

var initTime;
var finishTime;

var macroTextInit =
    "TAB T=1" + "\n" +
    "URL GOTO=http://steamcommunity.com/id/" + userName + "/myworkshopfiles/?appid=" + appId + "&browsefilter=mysubscriptions";
var macroText2 =
    "TAG POS=2 TYPE=SPAN ATTR=TXT:Añadir<SP>a<SP>colección" + "\n" +
    "TAG POS=1 TYPE=INPUT:CHECKBOX ATTR=ID:";
var macroText3 =
    " CONTENT=YES" + "\n" +
    "TAG POS=1 TYPE=SPAN ATTR=TXT:Aceptar" + "\n" +
    "TAG POS=1 TYPE=DIV ATTR=TXT:Anular<SP>suscripción" + "\n" +
    "WAIT SECONDS=1" + "\n" +
    "BACK" + "\n" +
    "REFRESH";

function isMod() {
    var items = window.content.document.getElementsByClassName("rightDetailsBlock");

    for (var i=0 ; i<items.length ; i++) {
        var item = items.item(i);
        var tagLink = item.getElementsByTagName("a")[0];
        if (tagLink != null && tagLink.innerHTML.toLowerCase().trim() === "mod")
            return true;
    }

    return false;
}

function run() {
    iimPlayCode("TAG POS=1 TYPE=DIV ATTR=CLASS:workshopItemTitle");
    var targetCollectionId = isMod() ? modCollectionId:collectionId;
    iimPlayCode(macroText2 + targetCollectionId + macroText3);
}

function calcTimeTaken(startedAt, finishedAt) {
    var takenSeconds = Math.round( (finishedAt - startedAt) / 1000 );
    return ( takenSeconds >= 60 ? (Math.round(takenSeconds/60) + " minutes"):(takenSeconds + " seconds") );
}

// Macro execution
iimPlayCode(macroTextInit);
initTime = new Date().getTime();
for (var i=0 ; i<iterationCount ; i++) {
    iimDisplay("Only [" + (iterationCount - i) + "] addons left.");
    run();
}
finishTime = new Date().getTime();
var timeTaken = calcTimeTaken(initTime, finishTime);
iimDisplay("Done! Processed " + iterationCount + " addons on this run.\nIt took about " + timeTaken + " to get it done.");
