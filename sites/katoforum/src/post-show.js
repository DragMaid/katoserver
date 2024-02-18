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
    resultContainer.innerHTML = '';
	fetch(postURL)
		.then(res => res.json())
		.then(data => {
			posts = data.map(post => {
				const card = resultCardTemplate.content.cloneNode(true).children[0]
				const header = card.querySelector("[data-header]")
				const description = card.querySelector("[data-description]")
                const thumbnail = card.querySelector("[thumbnail-container]");
                const redirect = postURL + post.title + '.html'; 
                const urlcover = card.querySelector('[url-cover]');

                thumbnail.src = post.thumbnail;
				header.textContent = post.title;
				description.textContent = post.description
                urlcover.href = redirect;

                card.setAttribute('thumbnail', post.thumbnail);
                card.setAttribute('title', post.title);
                card.setAttribute('description', post.description);

				resultContainer.append(card)


				return { thumbnail: post.thumbnail, name: post.name, description: post.description, element: card }
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
