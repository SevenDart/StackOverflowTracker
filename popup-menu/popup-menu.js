function retrieveInformation() {
    chrome.storage.sync.get(['todayVisits'], (result) => {
        let todayVisits = result.todayVisits;
        if (!todayVisits) {
            chrome.storage.sync.set({todayVisits: 0});
            todayVisits = 0;
        }

        chrome.storage.sync.get(['totalVisits'], (result) => {
            let totalVisits = result.totalVisits;
            if (!totalVisits) {
                chrome.storage.sync.set({totalVisits: 0});
                totalVisits = 0;
            }
            updatePopup(todayVisits, totalVisits);
        });
    });
}

function updatePopup(todayVisits, totalVisits) {
    let todayCountElement = document.getElementById('today-count');
    let totalCountElement = document.getElementById('total-count');

    console.log(totalVisits);

    todayCountElement.textContent = todayVisits;
    totalCountElement.textContent = totalVisits;
}

retrieveInformation();
