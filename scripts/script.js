function delay(n) {
    n = n || 2000;
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('finished delay');
            resolve();
        }, n);
    });
}

function loadImage() {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            console.log('finished loading image');
            resolve(image);
        });
        image.src = '../assets/images/background.jpeg';
    });
}

function ready() {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
    setTimeout(() => {
        document.body.classList.add('play');
    }, 600);
}

barba.init({
    views: [{
        namespace: 'home',

        async beforeEnter() {
            const resolve = this.async();
            document.body.classList.add('loading');
            Promise.all([delay(1000), loadImage()]).then((result) => {
                ready();
                resolve();
            });
        }
    }]
});

var rellax = new Rellax('.rellax', {
    breakpoints: [480, 600, 1200]
});

$(document).ready(function () {
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 5000,
        },
    })
});

window.onload = function () {

    const elements = document.querySelectorAll('.observe');
    const observer = new IntersectionObserver(elements => {
        elements.forEach(element => {
            if (element.intersectionRatio > 0) {
                element.target.classList.add('in-view');
            }
        });
    });
    elements.forEach(element => observer.observe(element))



    let viewHeight = 0;
    let viewWidth = 0;
    let breakpoints = [480, 600, 1200];
    let scrollTop = 0;
    let ticking = false;
    let collapsed = false;

    let face = document.querySelector('#face');
    let info = document.querySelector('#info');
    let homeContent = document.querySelector('#section-home .content');
    let socialMedia = document.querySelector('#social-media');
    let navbar = document.getElementById('sidenav');
    let hamburgers = document.querySelectorAll('.hamburger');


    let raf = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (callback) { return setTimeout(callback, 1000 / 60); };

    let init = function () {
        scrollTop = window.scrollY;
        viewHeight = window.innerHeight;
        viewWidth = window.innerWidth;

        animate();

        window.addEventListener('scroll', update, { capture: false, passive: true });
        window.addEventListener('touchmove', update, { capture: false, passive: true });
    }

    let update = function () {
        scrollTop = window.scrollY;
        requestTick();
    }

    let requestTick = function () {
        if (!ticking) {
            raf(animate);
            ticking = true;
        }
    }

    let animate = function () {
        face.style.transform = 'translate3d(' + 200 / viewHeight * scrollTop + '%, 0 , 0)';
        info.style.opacity = Math.max(0, -2 / viewHeight * scrollTop + 1);
        homeContent.style.opacity = Math.max(0, -1.5 / viewHeight * scrollTop + 1);
        socialMedia.style.opacity = Math.max(0, -2.5 / viewHeight * scrollTop + 1);

        if (viewWidth >= breakpoints[0]) {
            //tranzitii header
            if (scrollTop > 30 / 100 * viewHeight && !collapsed) {
                document.body.classList.add("collapse-menu");
                document.body.classList.remove("expand-menu");
                collapsed = true;
            }
            else if (scrollTop < 30 / 100 * viewHeight && collapsed) {
                document.body.classList.remove("collapse-menu");
                document.body.classList.add("expand-menu");
                collapsed = false;
            }
        }

        ticking = false;
    }

    init();
    window.addEventListener('resize', init);




    hamburgers.forEach(hamburger => {
        hamburger.addEventListener('click', () => {
            if (navbar.classList.contains('open')) {
                document.body.classList.remove('no-scroll');
                navbar.classList.remove('open');
                hamburgers.forEach(burger => {
                    burger.classList.remove('is-active');
                });
                navbar.classList.add('closing');
            } else {
                navbar.classList.remove('closing');
                navbar.classList.add('open');
                document.body.classList.add('no-scroll');
                hamburgers.forEach(burger => {
                    burger.classList.add('is-active');
                });
            }
        });
    });

    navbar.addEventListener('transitionend', () => {
        if (navbar.classList.contains('closing')) {
            navbar.classList.remove('closing');
        }
        if (navbar.classList.contains('opening')) {
            navbar.classList.add('open');
            navbar.classList.remove('opening');
        }
    });

};