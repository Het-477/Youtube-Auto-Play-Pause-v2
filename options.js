const siteList = document.getElementById("siteList");
const siteInput = document.getElementById("siteInput");
const addSiteBtn = document.getElementById("addSiteBtn");

function refreshList(sites) {
    siteList.innerHTML = "";
    sites.forEach((site, i) => {
        const li = document.createElement("li");
        li.textContent = site + " ";
        const del = document.createElement("button");
        del.textContent = "Remove";
        del.onclick = () => {
            sites.splice(i, 1);
            chrome.storage.sync.set({ allowedSites: sites }, () => refreshList(sites));
        };
        li.appendChild(del);
        siteList.appendChild(li);
    });
}

chrome.storage.sync.get({ allowedSites: [] }, ({ allowedSites }) => {
    refreshList(allowedSites);
});

addSiteBtn.onclick = () => {
    const newSite = siteInput.value.trim();
    if (!newSite) return;
    chrome.storage.sync.get({ allowedSites: [] }, ({ allowedSites }) => {
        if (!allowedSites.includes(newSite)) {
            allowedSites.push(newSite);
            chrome.storage.sync.set({ allowedSites }, () => refreshList(allowedSites));
        }
    });
    siteInput.value = "";
};
