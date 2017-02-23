
/*
              Steam Workshop Utils - Collectionizer
    ----------------------------------------------------------
    iMacros JavaScript macro for Steam collection organization

    Tested using iMacros 8.9.7 on Firefox 51.0.1.
    iMacros version 8.9.7 is required. The macro will not work
    on 9.0.3 and later due to the inability to access window.content 
    on more recent versions.

    Author: Gabriel Rodríguez (github.com/gabrielrf96)
    Version: v1.0 (2017-02-22)

    CAUTION - This macro has been tested under very specific
    circumstances, for very specific purposes. Use at your own risk.

    This macro will be updated in the future to allow further and 
    easier personalization. Until then, any use of this macro for 
    purposes other than initially intended, might yield unexpected 
    results to other users.

    Therefore, no instructions on its use will be given until said
    improvements are made.
*/


var appId = 255710;                 // Steam game appId
var userName = "";                  // Steam user name
var modCollectionId = 852323535;    // Mod collection id
var collectionId = 869286512;       // General collection id
var iterationCount = 500;           // Number of subscribed items to process

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
