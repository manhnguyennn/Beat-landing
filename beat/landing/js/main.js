$(document).ready(function () {

    // $('body').on('click touchstart', function () {
    //     const videoElement = document.getElementsByClassName('video-init');
    //     if (videoElement.playing) {
    //         // video is already playing so do nothing
    //     } else {
    //         // video is not playing
    //         // so play video now
    //         videoElement.play();
    //     }
    // });


    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);


    Splitting();


    const fx16Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect16]')];
    // GSAP Scroll Triggers
    const scroll = () => {

        fx16Titles.forEach(title => {

            // gsap.fromTo(title, {
            //     transformOrigin: '0% 50%',
            //     rotate: 3
            // }, {
            //     ease: 'none',
            //     rotate: 0,
            //     scrollTrigger: {
            //         trigger: title,
            //         start: 'top bottom',
            //         end: 'top top',
            //         scrub: true,
            //     }
            // });

            gsap.fromTo(title.querySelectorAll('.word'), {
                    'will-change': 'opacity',
                    opacity: 0.1
                },
                {
                    ease: 'none',
                    opacity: 1,
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: title,
                        start: 'top bottom-=20%',
                        end: 'center top+=20%',
                        scrub: true,
                    }
                });

        });

    };


    let vW = window.innerWidth / 100;
    let offsetX = 20 * vW;

    gsap.fromTo('.beat-wrapper__info .info-numb', {
        opacity: 0,
        'will-change': 'opacity',
    }, {
        opacity: 1,
        ease: 'easeOutIn',
        scrollTrigger: {
            trigger: '.beat-wrapper__info .info-numb',
            start: '+=' + offsetX / 5 + ' bottom',
            end: '+=' + offsetX / 2 + 'bottom',
            scrub: true,
            toggleActions: "play none none none",
            // markers: true,
        }
    });

    gsap.utils.toArray(".animCounter").forEach(box => {
        var tler = gsap.from(box, {
            textContent: "0",
            duration: 2,
            ease: "power1.inOut",
            modifiers: {
                textContent: value => formatNumber(value, 0)
            },
            scrollTrigger: {
                trigger: box,
                start: '+=' + offsetX / 5 + ' bottom',
                end: '+=' + offsetX * 1.5 + 'top',
                toggleActions: "play none none none",

            }
        });
    })


    function formatNumber(value, decimals) {
        let s = (+value).toLocaleString('en-US').split(".");
        return decimals ? s[0] + "." + ((s[1] || "") + "00000000").substr(0, decimals) : s[0];
    }

    tl = gsap.timeline({paused: true});

    let revealContainers = gsap.utils.toArray(".reveal");
    revealContainers.forEach((wrapreveal) => {
        tl.set(wrapreveal, {autoAlpha: 1});
        tl.from(wrapreveal, 0.3, {
            opacity: 0,
            yPercent: 15,
            ease: "power2",
            delay: 0,
        });

        wrapreveal.animation = tl; // record it on each element so we can reference the timeline later
    });

    ScrollTrigger.batch(revealContainers, {
        start: 'top bottom',
        // markers: true,
        onEnter: elements => elements.forEach((e, i) => e.animation.delay(i * 0.02).restart(true)),
        once: true
    });


    //Sequence
    const canvas = document.querySelector("#tablr-hero");
    const context = canvas.getContext("2d");


    var wwidth, wheight;
    var img_counter = 0;

    const frameCount = 179;
    const currentFrame = index => (
        `../landing/web_images/sequence/TuDo_${index.toString().padStart(3, '')}.webp`
    );

    const images = []
    const heroFrames = {
        frame: 0
    };

    ScrollTrigger.matchMedia({

        // desktop - large screens for now
        "(min-width: 1150px)": function () {
            // setup animations and ScrollTriggers for screens 800px wide or greater (desktop) here...
            // These ScrollTriggers will be reverted/killed when the media query doesn't match anymore.


        },
        // mobile
        "(max-width: 768px)": function () {
            // The ScrollTriggers created inside these functions are segregated and get
            // reverted/killed when the media query doesn't match anymore.

        },

        // all
        "all": function () {
            preloadFrames();

            ScrollTrigger.defaults({
                // markers: true,
                // anticipatePin: 1
            });

            gsap.to(heroFrames, {
                frame: frameCount - 1,
                snap: "frame",
                scrollTrigger: {
                    scrub: 1,
                    trigger: '#canvas-wrap',
                    pin: '#tablr-hero',
                    pinSpacing: true,
                    start: 'top top'
                    // end: () => 'bottom top+=' + (window.innerHeight-200)
                },
                onUpdate: render
            });

            resize();
            images[0].onload = render;
            window.addEventListener("resize", resize);
        }
    });

    function preloadFrames() {

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();

            img.src = currentFrame(i);
            images.push(img);

            if (img.complete)
                incrementCounter();
            else
                img.addEventListener('load', incrementCounter, false);
        }

    }

    function incrementCounter() {
        img_counter++;

    }

    function render() {

        context.save();
        context.clearRect(0, 0, canvas.width, canvas.height);
        // context.drawImage(images[heroFrames.frame], 0, 0, vw, vh);
        context.restore();

        let loadedImageWidth = images[heroFrames.frame].width;
        let loadedImageHeight = images[heroFrames.frame].height;

        // get the scale
        // it is the min of the 2 ratios
        let scaleFactor = Math.max(canvas.width / images[heroFrames.frame].width, canvas.height / images[heroFrames.frame].height);

        // Finding the new width and height based on the scale factor
        let newWidth = images[heroFrames.frame].width * scaleFactor;
        let newHeight = images[heroFrames.frame].height * scaleFactor;

        // get the top left position of the image
        // in order to center the image within the canvas
        let x = Math.floor(canvas.width / 2) - (newWidth / 2);
        let y = Math.floor(canvas.height / 2) - (newHeight / 2);


        // When drawing the image, we have to scale down the image
        // width and height in order to fit within the canvas
        context.drawImage(images[heroFrames.frame], x, y, newWidth, newHeight);
    }

    function resize() {

        wwidth = document.body.clientWidth; //user document.body.clientWidth to get the window viewport without the vertical scrollbar
        wheight = window.innerHeight;

        canvas.width = wwidth;
        canvas.height = wheight;

        canvas.style.width = wwidth + "px";
        canvas.style.height = wheight + "px";

        render();
    }

    //End Sequence


    const menusrc = document.querySelectorAll(".src-btn");
    const triggermenu = document.querySelectorAll(".trigger-menu");


    // tl.addLabel("Start");
    //
    // tl.from(
    //     menusrc,
    //     {
    //         background: '#111111', // Move the heading up by 100 pixels
    //         duration: 0.15, // Animation duration
    //         ease: "power2.out" // Easing function
    //     },
    //     "<"
    // );
    // tl.addLabel(`label`);
    // tl.to(menusrc, {
    //     background: '#EA0029', // Move the heading up by 100 pixels
    //     duration: 0.15, // Animation duration
    //     ease: "power2.out" // Easing function
    // });
    //
    // tl.addLabel("end");
    //
    // // We can then use ScrollTrigger to trigger the animation when each group comes into view
    // triggermenu.forEach((grouptrigger) => {
    //     ScrollTrigger.create({
    //         trigger: grouptrigger, // The element that triggers the animation
    //         start: "top top", // When the top of the group reaches 75% of the viewport height
    //         end: "bottom bottom", // When the bottom of the group reaches 25% of the viewport height
    //         onEnter: () => tl.tweenTo(tl.nextLabel(menusrc)), // Play the animation when the group comes into view
    //         onLeaveBack: () => tl.tweenTo(tl.previousLabel(menusrc)), // Reverse the animation when the group leaves the view
    //         markers: true // Show markers on the page to help with debugging
    //     });
    // });

    // gsap.fromTo(menusrc, {
    //
    //     background: '#111111',
    //     'will-change': 'background',
    // }, {
    //     background: '#EA0029',
    //     ease: 'easeOutIn',
    //     scrollTrigger: {
    //         trigger: triggermenu,
    //         start: 'top top',
    //         end: 'bottom bottom',
    //         scrub: true,
    //         toggleActions: "play none none reverse",
    //         // markers: true,
    //     }
    // });

    // gsap.from(menusrc, {
    //     scrollTrigger: {
    //         start: 'top top',
    //         end: 'bottom bottom',
    //         trigger: triggermenu,
    //         toggleActions: "play none none reverse",
    //         onEnter() {
    //             $(menusrc).addClass('active')
    //         },
    //         onLeaveBack() {
    //             $(menusrc).removeClass('active')
    //         },
    //         onLeave() {
    //             $(menusrc).removeClass('active')
    //         },
    //         onEnterBack() {
    //             $(menusrc).addClass('active')
    //         },
    //     }
    // });
    triggermenu.forEach((grouptrigger) => {
        ScrollTrigger.create({
            start: 'top top',
            end: 'bottom bottom',
            trigger: grouptrigger,
            // markers: true,
            onEnter() {
                $(menusrc).addClass('active')
            },
            onLeaveBack() {
                $(menusrc).removeClass('active')
            },
            onLeave() {
                $(menusrc).removeClass('active')
            },
            onEnterBack() {
                $(menusrc).addClass('active')
            },
        });
    });


    scroll();


    let me = $(window).width();

    if (me > 768) {


        const smoother = ScrollSmoother.create({
            content: "#scrollsmoother-container",
            smooth: 2,
            normalizeScroll: true,
            ignoreMobileResize: true,
            effects: true,
            //preventDefault: true,
            //ease: 'power4.out',
            //smoothTouch: 0.1,
        });

        gsap.utils.toArray(".list-nav .nav-link").forEach(function (button, i) {
            button.addEventListener("click", (e) => {
                var id = e.target.getAttribute("href");
                console.log(id);
                smoother.scrollTo(id, true, "top top");
                e.preventDefault();
                $('.menu-expand').removeClass('active');
                smoother.paused(false);
            });
        });
        window.onload = (event) => {
            let urlHash = window.location.href.split("#")[1];

            let scrollElem = document.querySelector("#" + urlHash);

            console.log(scrollElem, urlHash);

            if (urlHash && scrollElem) {
                gsap.to(smoother, {
                    scrollTop: smoother.offset(scrollElem, "top top"),
                    duration: 2,
                    // delay: 1
                });
            }
        };


        $('.src-btn').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.menu-expand').removeClass('active');
                smoother.paused(false);
            } else {
                $(this).addClass('active');
                $('.menu-expand').addClass('active');
                smoother.paused(true);
            }
        })
        $('.backdrop-menu').click(function () {

            $('.src-btn').removeClass('active');
            $('.menu-expand').removeClass('active');
            smoother.paused(false);
        })

        $('.contact-btn').click(function () {
            $('.popup-contact').addClass('active');
            smoother.paused(true);
        })

        $('.close-popup').click(function () {
            $('.popup-contact').removeClass('active');
            smoother.paused(false);
        })

        $('.popup-backdrop').click(function () {
            $('.popup-contact').removeClass('active');
            smoother.paused(false);
        })

        gsap.fromTo('.beat-wrapper__info .info-numb', {
            y: 0,
            scale: 0.9,
        }, {
            scale: 1,
            y: -offsetX,
            ease: 'easeOutIn',
            scrollTrigger: {
                trigger: '.beat-wrapper__info .info-numb',
                start: '+=' + offsetX / 5 + ' bottom',
                end: '+=' + offsetX * 1.5 + 'top',
                scrub: true,
                toggleActions: "play none none none",
                // duration: 3000,
            }
        });

        let hozW = document.querySelector(".content-hoz").offsetWidth;
        let windowW = document.documentElement.clientWidth;
        // console.log(hozW);
        // console.log(windowW);
        // console.log('offset scroll ngang' + (hozW - windowW));
        gsap.fromTo('.content-hoz', {
            x: 0,
        }, {
            x: -(hozW - windowW),
            ease: 'none',
            scrollTrigger: {
                trigger: ".beat-wrapper__info",
                pin: true,
                scrub: 1,
                end: '+=300%',
                invalidateOnRefresh: true,
                anticipatePin: 1,
            },
        });

        $('.marquee-box').marquee({
            duration: 11000,
            duplicated: true,
            pauseOnHover: true,
            gap: 0,
            startVisible: true
        });

        gsap.fromTo('.slide-card-1', {
            yPercent: -30,
            scale: 1.1,
        }, {
            scale: 1,
            yPercent: 0,
            ease: 'easeOutIn',
            scrollTrigger: {
                trigger: '.slide-wrap',
                start: ' top+=60% top',
                end: '+=50%',
                scrub: true,
                // markers:  {endColor: "#E2B410"}
                // duration: 3000,
            }
        });
        // let wheight = window.innerHeight;
        let itemsSU = document.querySelectorAll(".slide-box");
        itemsSU.forEach((item, i) => {
            const slides = gsap.utils.toArray(".slide-up-tl", item);
            gsap.set(slides, {
                yPercent: 100
            });
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: itemsSU,
                    pin: true,
                    scrub: true,
                    start: () => "top top",
                    // markers: {endColor: "fuchsia"},
                    end: "+=500%"
                }
            });
            tl.addLabel("initial");
            tl.to(slides, {
                ease: "none",
                yPercent: 0,
                stagger: 0.5
            });
        });

    } else {

        // gsap.utils.toArray(".list-nav .nav-link").forEach(function (button, i) {
        //     button.addEventListener("click", (e) => {
        //         var id = e.target.getAttribute("href");
        //         console.log(id);
        //         smoother.scrollTo(id, true, "top top");
        //         e.preventDefault();
        //         $('.menu-expand').removeClass('active');
        //         smoother.paused(false);
        //     });
        // });

        $('.src-btn').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.menu-expand').removeClass('active');
            } else {
                $(this).addClass('active');
                $('.menu-expand').addClass('active');
            }
        })
        $('.backdrop-menu').click(function () {

            $('.src-btn').removeClass('active');
            $('.menu-expand').removeClass('active');
        })

        $('.contact-btn').click(function () {
            $('.popup-contact').addClass('active');
        })

        $('.close-popup').click(function () {
            $('.popup-contact').removeClass('active');
        })

        $('.popup-backdrop').click(function () {
            $('.popup-contact').removeClass('active');
        })

        document.querySelectorAll(".list-nav .nav-link").forEach((btn, index) => {
            btn.addEventListener("click", () => {
                gsap.to(window, {duration:2, scrollTo: {y: "#link-" + (index + 1), offsetY: 0}});
                $('.src-btn').removeClass('active');
                $('.menu-expand').removeClass('active');
            });
        });

        console.log('dang chay mobile')

    }
});