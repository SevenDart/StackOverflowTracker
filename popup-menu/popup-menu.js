function retrieveInformation() {
    chrome.storage.sync.get(['todayVisits', 'totalVisits', 'lastVisit'], (result) => {
        let todayVisits = result.todayVisits;
        let totalVisits = result.totalVisits;
        let currentDate = new Date();
        let lastVisit = new Date(result.lastVisit);
        if (lastVisit.getFullYear() !== currentDate.getFullYear()
            || lastVisit.getMonth() !== currentDate.getMonth()
            || lastVisit.getDate() !== currentDate.getDate()) {
            todayVisits = 0;
            chrome.storage.sync.set({todayVisits: 0});
        }
        updatePopup(todayVisits, totalVisits);
    });
}

function updatePopup(todayVisits, totalVisits) {
    let todayCountElement = document.getElementById('today-count');
    let totalCountElement = document.getElementById('total-count');

    todayCountElement.textContent = todayVisits;
    totalCountElement.textContent = totalVisits;
}

function resetInformation() {
    chrome.storage.sync.set({totalVisits: 0, todayVisits: 0, lastVisit: Date.now()});
}

retrieveInformation();

document.getElementById("reset-button").addEventListener("click", resetInformation);
