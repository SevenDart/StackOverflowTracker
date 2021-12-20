//main listener
chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.url.match(/https://*.stackoverflow.com/*/)) {
        console.log('Catched!');
        updateTotalVisits();
        updateTodayVisits();
    }
})

function updateTotalVisits() {
    chrome.storage.sync.get(['totalVisits'], (result) => {
        let totalVisits = result.totalVisits;
        totalVisits += 1;
        chrome.storage.sync.set({totalVisits: totalVisits});
    });
}

function updateTodayVisits() {
    chrome.storage.sync.get(['todayVisits', 'lastVisit'], (result) => {
        let currentDate = new Date();
        let todayVisits = result.todayVisits;
        let lastVisit = new Date(result.lastVisit);
        if (lastVisit.getFullYear() !== currentDate.getFullYear()
            || lastVisit.getMonth() !== currentDate.getMonth()
            || lastVisit.getDate() !== currentDate.getDate()) {
            todayVisits = 0;
            chrome.storage.sync.set({lastVisit: Date.now()});
        }
        todayVisits += 1;
        chrome.storage.sync.set({todayVisits: todayVisits, lastVisit: Date.now()});
    });
}

{
    chrome.storage.sync.get(null, (result) => {
        if (!result.totalVisits || !result.todayVisits || !result.lastVisit) {
            chrome.storage.sync.set({totalVisits: 0, todayVisits: 0, lastVisit: Date.now()});
        }
    });
}
