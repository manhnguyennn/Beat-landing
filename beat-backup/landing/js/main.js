$(document).ready(function () {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

    function allFunc() {

        const swiper = new Swiper('.swiper-text', {
            slidePerView: 1,
            loop: true,
            autoplay: {
                delay: 1200,
            },
            spaceBetween: 30,
            direction: 'vertical',
            centeredSlides: true,
            pauseOnMouseEnter: false,
            disableOnInteraction: false,
            simulateTouch: false,
        })

        Splitting();


        const fx16Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect16]')];
        const fx6Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect6]')];
        const fx8Titles = [...document.querySelectorAll('.content__title[data-splitting][data-effect8]')];

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

            // fx6Titles.forEach(title => {
            //
            //     const chars = title.querySelectorAll('.char');
            //
            //     gsap.fromTo(chars, {
            //             'will-change': 'opacity, transform',
            //             opacity: 0,
            //             yPercent: 40,
            //             scaleY: 1.2,
            //             scaleX: 0.7,
            //             transformOrigin: '50% 0%'
            //         },
            //         {
            //             duration: 1.5,
            //             ease: 'back.inOut(2)',
            //             opacity: 1,
            //             yPercent: 0,
            //             scaleY: 1,
            //             scaleX: 1,
            //             scrollTrigger: {
            //                 start: 'center bottom',
            //                 end: 'bottom top',
            //                 trigger: title,
            //             },
            //             stagger: {
            //                 amount: 0.15,
            //                 from: 'center'
            //             }
            //         });
            //
            // });

            // fx6Titles.forEach(title => {
            //
            //     const chars = title.querySelectorAll('.char');
            //
            //     gsap.fromTo(chars, {
            //             'will-change': 'opacity, transform',
            //             opacity: 0,
            //             scale: 0.6,
            //             rotationZ: () => gsap.utils.random(-20, 20)
            //         },
            //         {
            //             ease: 'power4',
            //             opacity: 1,
            //             scale: 1,
            //             rotation: 0,
            //             duration: 1.5,
            //             scrollTrigger: {
            //                 start: 'center bottom',
            //                 end: 'bottom top',
            //                 trigger: title,
            //             },
            //             stagger: {
            //                 amount: 0.15,
            //                 from: 0
            //             }
            //         });
            //
            // });


            // const lettersAndSymbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ','];
            // fx8Titles.forEach(title => {
            //
            //     const chars = title.querySelectorAll('.char');
            //
            //     chars.forEach((char, position) => {
            //         let initialHTML = char.innerHTML;
            //
            //         gsap.fromTo(char, {
            //                 opacity: 0
            //             },
            //             {
            //                 duration: 0.03,
            //                 innerHTML: () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
            //                 repeat: 1,
            //                 repeatRefresh: true,
            //                 opacity: 1,
            //                 repeatDelay: 0.015,
            //                 delay: (position + 1) * 0.18,
            //                 onComplete: () => gsap.set(char, {innerHTML: initialHTML, delay: 0.03}),
            //                 scrollTrigger: {
            //                     start: 'center bottom',
            //                     end: 'bottom top',
            //                     trigger: title,
            //                     onEnter: () => gsap.set(char, {opacity: 0})
            //                 },
            //                 stagger: {
            //                     amount: 0.15,
            //                     from: 'center'
            //                 }
            //             });
            //
            //     });
            //
            // });

            fx8Titles.forEach(title => {

                const chars = title.querySelectorAll('.char');

                chars.forEach(char => gsap.set(char.parentNode, {perspective: 2000}));

                gsap.fromTo(chars, {
                        'will-change': 'opacity, transform',
                        opacity: 0,
                        rotationY: 180,
                        xPercent: -40,
                        yPercent: 100
                    },
                    {
                        ease: 'power4.inOut()',
                        opacity: 1,
                        rotationY: 0,
                        xPercent: 0,
                        yPercent: 0,
                        scrollTrigger: {
                            start: 'center bottom',
                            end: 'bottom top',
                            trigger: title,
                        },
                        stagger: {
                            each: -0.03,
                            from: 'start'
                        }
                    });

            });
        };


        let vW = window.innerWidth / 100;
        let offsetX = 20 * vW;

        // gsap.fromTo('.beat-wrapper__info .info-numb', {
        //     opacity: 0,
        //     'will-change': 'opacity',
        // }, {
        //     opacity: 1,
        //     ease: 'easeOutIn',
        //     scrollTrigger: {
        //         trigger: '.beat-wrapper__info .info-numb',
        //         start: '+=' + offsetX / 5 + ' bottom',
        //         end: '+=' + offsetX / 2 + 'bottom',
        //         scrub: true,
        //         toggleActions: "play none none none",
        //         // markers: true,
        //     }
        // });

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




        let me = $(window).width();

        if (me > 768) {
            const scrollWeb = () => {


                fx6Titles.forEach(title => {

                    const chars = title.querySelectorAll('.char');

                    gsap.fromTo(chars, {
                            'will-change': 'opacity, transform',
                            opacity: 0,
                            scale: 0.6,
                            rotationZ: () => gsap.utils.random(-20, 20)
                        },
                        {
                            ease: 'power4',
                            opacity: 1,
                            scale: 1,
                            rotation: 0,
                            stagger: 0.4,
                            scrollTrigger: {
                                trigger: title,
                                start: 'center+=20% bottom',
                                end: '+=50%',
                                scrub: true
                            },
                        });

                });


            };

            const smoother = ScrollSmoother.create({
                content: "#scrollsmoother-container",
                smooth: 1,
                speed: 0.8,
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

            gsap.fromTo('.videoBox', {
                yPercent: -10,
            }, {
                yPercent: 0,
                ease: 'easeOutIn',
                scrollTrigger: {
                    trigger: 'videoBox',
                    start: 'top top',
                    end: '+=100%',
                    scrub: true,
                    // toggleActions: "play none none none",
                    // duration: 3000,
                }
            });


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
                y: -offsetX / 1.2,
                scale: 0.96,
            }, {
                scale: 1,
                y: -offsetX * 1.02,
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

            const fadeWeb = document.querySelectorAll(".fade-web");

            fadeWeb.forEach(addTimeline);

            function addTimeline(fdmitem, index) {

                const tffm = gsap.timeline({
                    scrollTrigger: {
                        trigger: fdmitem,
                        start: "+=25% bottom",
                        ease: "power2",
                        toggleActions: "play none none reverse"
                    }
                })
                    .from(fdmitem, {
                        yPercent: 30,
                        opacity: 0,
                        duration: 0.5,
                        delay: 0.3,
                    })
            }

            scrollWeb();
        } else {

            gsap.fromTo('.beat-wrapper__info .info-numb', {
                y: -offsetX,
                scale: 0.96,
            }, {
                scale: 1,
                y: -offsetX * 2.2,
                ease: 'easeOutIn',
                scrollTrigger: {
                    trigger: '.beat-wrapper__info .info-numb',
                    start: '+=' + offsetX / 5 + ' bottom',
                    end: '+=100%',
                    scrub: true,
                    toggleActions: "play none none none",
                    // duration: 3000,
                }
            });

            const scrollMob = () => {


                fx6Titles.forEach(title => {

                    const chars = title.querySelectorAll('.char');

                    gsap.fromTo(chars, {
                            'will-change': 'opacity, transform',
                            opacity: 0,
                            scale: 0.6,
                            rotationZ: () => gsap.utils.random(-20, 20)
                        },
                        {
                            ease: 'power4',
                            opacity: 1,
                            scale: 1,
                            rotation: 0,
                            duration: 1.5,
                            scrollTrigger: {
                                start: 'center bottom',
                                end: 'bottom top',
                                trigger: title,
                            },
                            stagger: {
                                amount: 0.15,
                                from: 0
                            }
                        });

                });


            };

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

            // document.querySelectorAll(".list-nav .nav-link").forEach((btn, index) => {
            //     btn.addEventListener("click", () => {
            //         gsap.to(window, {duration: 2, scrollTo: {y: "#link-" + (index + 1), offsetY: 0}});
            //         $('.src-btn').removeClass('active');
            //         $('.menu-expand').removeClass('active');
            //     });
            // });

            let links = gsap.utils.toArray(".list-nav .nav-link");
            links.forEach(a => {
                let element = document.querySelector(a.getAttribute("href")),
                    linkST = ScrollTrigger.create({
                        trigger: element,
                        start: "top top"
                    });
                ScrollTrigger.create({
                    trigger: element,
                    start: "top center",
                    end: "bottom center",
                    onToggle: self => self.isActive && setActive(a)
                });
                a.addEventListener("click", e => {
                    e.preventDefault();
                    gsap.to(window, {duration: 1.5, scrollTo: linkST.start, overwrite: "auto"});
                    $('.menu-expand').removeClass('active');
                    $('.src-btn').removeClass('active');
                });
            });

            function setActive(link) {
                links.forEach(el => el.classList.remove("active"));
                link.classList.add("active");

            }

            const fadeMob = document.querySelectorAll(".fade-mob");

            fadeMob.forEach(addTimeline);

            function addTimeline(fdmitem, index) {

                const tffm = gsap.timeline({
                    scrollTrigger: {
                        trigger: fdmitem,
                        start: "+=25% bottom",
                        ease: "power2",
                        toggleActions: "play none none reverse"
                    }
                })
                    .from(fdmitem, {
                        yPercent: 10,
                        opacity: 0,
                        duration: 0.5
                    })
            }


            console.log('dang chay mobile')
            scrollMob();
        }

        scroll();
    }


    $('body').imagesLoaded({background: 'div'}, function () {
        console.log('all .item background images loaded');
        $('.loading-wrap').removeClass('loading')
        $('body').removeClass('loading-body')
        setTimeout(function () {
            allFunc();
        }, 100);


    });

});