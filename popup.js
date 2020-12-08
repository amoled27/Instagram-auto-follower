followAutomation = {
    init: function() {
        this.execute();
    },
    execute: function() {
        this.invokeFollowAutomationScript();
    },
    invokeFollowAutomationScript() {
        return chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
           chrome.tabs.executeScript(tabs[0].id, { file: "followAutomation.js" });
        });
     },
     getScriptInitBtn() {
         return document.getElementById('run_script_btn');
     }
}

followAutomation.getScriptInitBtn().onclick = function() {
    followAutomation.init();
}