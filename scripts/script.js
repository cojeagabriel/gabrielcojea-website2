// particlesJS("particles-js", { "particles": { "number": { "value": 50, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#9bdaed" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#40b0d6" }, "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 1, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0, "sync": false } }, "size": { "value": 5, "random": true, "anim": { "enable": false, "speed": 4, "size_min": 0.3, "sync": false } }, "line_linked": { "enable": false, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 0.3, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 600 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false, "mode": "bubble" }, "onclick": { "enable": false, "mode": "repulse" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 250, "size": 0, "duration": 2, "opacity": 0, "speed": 3 }, "repulse": { "distance": 400, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true }); var count_particles, update; count_particles = document.querySelector('.js-count-particles');;

window.onload = function () {

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
                navbar.classList.remove('open');
                hamburgers.forEach(burger => {
                    burger.classList.remove('is-active');
                });
                navbar.classList.add('closing');
            } else {
                navbar.classList.remove('closing');
                navbar.classList.add('open');
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