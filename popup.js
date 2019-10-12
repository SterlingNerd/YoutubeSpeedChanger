let slider = document.getElementById("speedSlider");
let speedLabel = document.getElementById("speedLabel");

window.onload = function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: "var e = document.getElementsByTagName('video');if(e) {var v = e[0];if (v){v.playbackRate;}}"},
            function (result) { slider.value=result[0]; slider.oninput(); }
        )


    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //     chrome.tabs.sendMessage(tabs[0].id, { action: "getPlaybackSpeed" }, function (response) {
    //         if (response) {
    //             slider.value = response;
    //             slider.onchange();
    //         }
    //     });
    // });
    });
}

slider.oninput = function (element) { speedLabel.innerHTML = slider.value; };
slider.onchange = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: "var e = document.getElementsByTagName('video'); if(e) {var v = e[0]; if (v){ v.playbackRate = " + slider.value + ";}}" }
        );
    });
};