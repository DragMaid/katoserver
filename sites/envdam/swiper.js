const swiper = new Swiper('.swiper', {
    // Default parameters
    slidesPerView: 1,
    spaceBetween: 0,

    // Responsive breakpoints
    breakpoints: {
        420: {
            slidesPerView: 1,
            spaceBetween: 0,
        },

        800: {
            slidesPerView: 3,
            spaceBetween: 0,
        }
    },

    // Optional parameters
    direction: 'horizontal',
    loop: true,
    effect: 'slide',

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Breakpoints
//window.addEventListener('resize', function() {
//var width = window.screen.width;
//if (width >= 800) {
//swiper.effect = 'cube';
//}

////swiper.onResize();
//}, true);
