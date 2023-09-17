var currentIndex = 1;
var slideLength = 3;

function changeBackground(index) {
    currentIndex += index;
    if (currentIndex != 0 && currentIndex <= slideLength) {
        let moveDis = (-100 * (currentIndex - 1));
        document.getElementById("slide-show").style.marginLeft = moveDis + "%";
    } else {
        currentIndex -= index;
    }
}

const cardSlider = document.getElementById("cardsContainer");
const cardNumber = cardSlider.children.length;
var cardIndex = 1;

cardSlider.style.setProperty('--card-number', cardNumber);
cardSlider.style.setProperty('--card-index', cardIndex);

let x0 = null;
let locked = true;

function lock(e) {
    x0 = unify(e).clientX;
    cardSlider.classList.toggle('smooth', !(locked = true));
};

function move(e) {
    if (locked) {
        let dx = unify(e).clientX - x0
        let s = Math.sign(dx);

        if ((cardIndex > 0 || s < 0) && (cardIndex < cardNumber || s > 0))
            if (cardIndex != 1 || s < 0) {
                cardSlider.style.setProperty('--card-index', cardIndex -= s);
                changeBrightness(cardIndex);
            }
        cardSlider.style.setProperty('--tx', '0px');
        cardSlider.classList.toggle('smooth', !(locked = false));
        x0 = null;
    }
};

document.getElementById("ic-1").style.filter = "brightness(100%)";

function changeBrightness(index) {
    for (let i = 1; i <= cardNumber; i++) {
        let lIndex = index;
        let elementId = "ic-" + i.toString();
        if (i === lIndex) {
            document.getElementById(elementId).style.filter = "brightness(100%)";
        } else {
            document.getElementById(elementId).style.filter = "brightness(60%)";
        }
    }

};

function unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e
};

function drag(e) {
    e.preventDefault();

    if (locked) {
        cardSlider.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`)
    }
};

cardSlider.addEventListener('mousedown', lock, false);
cardSlider.addEventListener('touchstart', lock, false);

cardSlider.addEventListener('mouseup', move, false);
cardSlider.addEventListener('touchend', move, false);

cardSlider.addEventListener('mousemove', drag, false);
cardSlider.addEventListener('touchmove', drag, false);
