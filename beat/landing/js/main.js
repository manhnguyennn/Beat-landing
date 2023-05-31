$(document).ready(function () {
    $('.header-content .src-btn').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parent().parent().removeClass('active');
        } else {
            $(this).addClass('active');
            $(this).parent().parent().addClass('active');
        }
    })

    $('body').on('click touchstart', function () {
        const videoElement = document.getElementsByClassName('video-init');
        if (videoElement.playing) {
            // video is already playing so do nothing
        } else {
            // video is not playing
            // so play video now
            videoElement.play();
        }
    });

    gsap.registerPlugin(ScrollTrigger);

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

            // gsap.fromTo(title.querySelectorAll('.word'), {
            //         'will-change': 'opacity',
            //         opacity: 0.1
            //     },
            //     {
            //         ease: 'none',
            //         opacity: 1,
            //         stagger: 0.05,
            //         scrollTrigger: {
            //             trigger: title,
            //             start: 'top bottom-=20%',
            //             end: 'center top+=20%',
            //             scrub: true,
            //         }
            //     });

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
    gsap.fromTo('.beat-wrapper__info .info-numb', {
        y: 0,
        scale: 0.7,
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
        tl.from(wrapreveal, 0.5, {
            opacity: 0,
            yPercent: 15,
            ease: "power2",
            delay: 0,
        });

        wrapreveal.animation = tl; // record it on each element so we can reference the timeline later
    });

    ScrollTrigger.batch(revealContainers, {
        start: 'top bottom',
        markers: true,
        onEnter: elements => elements.forEach((e, i) => e.animation.delay(i * 0.05).restart(true)),
        once: true
    });

    let hozW = document.querySelector(".content-hoz").offsetWidth;
    let windowW = document.documentElement.clientWidth;
    console.log(hozW);
    console.log(windowW);
    console.log('offset scroll ngang' + (hozW - windowW));
    gsap.fromTo('.content-hoz', {
        x: 0,
    }, {
        x: -(hozW - windowW),
        ease: 'none',
        scrollTrigger: {
            trigger: ".beat-wrapper__info",
            pin: true,
            scrub: 1,

            duration: '100%',
            invalidateOnRefresh: true,
            anticipatePin: 1,
        },
    });

    //Sequence
    const canvas = document.querySelector("#tablr-hero");
    const context = canvas.getContext("2d");
    const resolution = window.devicePixelRatio || 1;


    var vw, vh;
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
        "(min-width: 1201px)": function () {
            // setup animations and ScrollTriggers for screens 800px wide or greater (desktop) here...
            // These ScrollTriggers will be reverted/killed when the media query doesn't match anymore.

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
        },
        // mobile
        "(max-width: 768px)": function () {
            // The ScrollTriggers created inside these functions are segregated and get
            // reverted/killed when the media query doesn't match anymore.

        },

        // all
        "all": function () {

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
        let x = (canvas.width / 2) - (newWidth / 2);
        let y = (canvas.height / 2) - (newHeight / 2);

        // When drawing the image, we have to scale down the image
        // width and height in order to fit within the canvas
        context.drawImage(images[heroFrames.frame], x, y, newWidth, newHeight);
    }

    function resize() {

        vw = document.body.clientWidth; //user document.body.clientWidth to get the window viewport without the vertical scrollbar
        vh = window.innerHeight;

        canvas.width = vw * resolution;
        canvas.height = vh * resolution;

        canvas.style.width = vw + "px";
        canvas.style.height = vh + "px";

        context.scale(resolution, resolution);

        render();
    }

    //End Sequence

    scroll();

});