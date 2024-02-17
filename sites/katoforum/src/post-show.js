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
const postURL = mainURL + '/katoforum/posts/';
const urlContainer = document.getElementById('urlc');
urlContainer.setAttribute('url', mainURL);

let posts = [];

function load_post_cards() {
	fetch(postURL)
		.then(res => res.json())
		.then(data => {
			posts = data.map(post => {
				const card = resultCardTemplate.content.cloneNode(true).children[0]
				const header = card.querySelector("[data-header]")
				const description = card.querySelector("[data-description]")

				header.textContent = post.name
				description.textContent = post.description
				header.href = postURL + post.subdomain + '.html'
				description.href = postURL + post.subdomain + '.html'
				resultContainer.append(card)

				return { name: post.name, description: post.description, element: card }
			})
		})

	searchInput.addEventListener("input", (e) => {
		const value = e.target.value;
		posts.forEach(post => {
			const isVisible = post.name.includes(value) || post.description.includes(value)
			post.element.classList.toggle("hide", !isVisible)
		})
	})
}

load_post_cards();
export { load_post_cards }
