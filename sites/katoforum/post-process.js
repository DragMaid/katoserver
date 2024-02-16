function nthIndex(str, pat, n) {
    var L = str.length, i = -1;
    while (n-- && i++ < L) {
        i = str.indexOf(pat, i);
        if (i < 0) break;
    } return i;
}

const resultCardTemplate = document.querySelector("[result-card-template]");
const resultContainer = document.querySelector("[result-container]");
const searchInput = document.querySelector("[data-search]");

const pageURL = String(document.URL);
const mainURL = pageURL.substring(0, nthIndex(pageURL, '/', 3));
const sitesURL = mainURL + '/katoforum/posts';

let sites = [];
fetch(sitesURL)
    .then(res => res.json())
    .then(data => {
        sites = data.map(site => {
            const card = resultCardTemplate.content.cloneNode(true).children[0]
            const header = card.querySelector("[data-header]")
            const description = card.querySelector("[data-description]")

            header.textContent = site.name
            description.textContent = site.description
            header.href = mainURL + '/katoforum/' + site.subdomain
            description.href = mainURL + '/katoforum/' + site.subdomain
            resultContainer.append(card)

            return { name: site.name, description: site.description, element: card }
        })
    })

searchInput.addEventListener("input", (e) => {
    const value = e.target.value;
    sites.forEach(site => {
        const isVisible = site.name.includes(value) || site.description.includes(value)
        site.element.classList.toggle("hide", !isVisible)
    })
})
