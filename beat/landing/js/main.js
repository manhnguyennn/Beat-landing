$(document).ready(function () {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);



    function allFunc() {
        const videoElement = document.getElementsByClassName('video-init');
        checkCallVideo();
        //console.log(videoElement.length);
        function checkCallVideo() {
            for (let i = 0; i < videoElement.length; i++) {
                videoElement[i].addEventListener('suspend', () => {
                    //console.log("suspend");
                });
                videoElement[i].addEventListener('play', () => {
                    //$("#testlowmode").html("play");
                    //console.log("play");
                    var parentBoxVideo = videoElement[i].parentNode;
                    parentBoxVideo.removeChild(parentBoxVideo.getElementsByClassName('bg-img')[0]);
                    videoElement[i].classList.remove("hidden-video");
                });
            }
        }


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
                smooth: 1.8,
                speed: 1,
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
                    $('.src-btn').removeClass('active');

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

        $('body').removeClass('loading-body')
        allFunc();
        setTimeout(function () {
            $('.loading-wrap').removeClass('loading')
        }, 300);


    });

});