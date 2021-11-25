//main listener
chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.url.startsWith('https://stackoverflow.com/')) {
        console.log('catched!', details.timeStamp);
        updateTotalVisits();
    }
})

function updateTotalVisits() {
    chrome.storage.sync.get(['totalVisits'], (result) => {
        let totalVisits = result.totalVisits;
        if (!totalVisits) {
            chrome.storage.sync.set({totalVisits: 0});
            totalVisits = 0;
        }
        totalVisits += 1;
        chrome.storage.sync.set({totalVisits: totalVisits});
    });
}
