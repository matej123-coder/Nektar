document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    const smoother = ScrollSmoother.create({
        wrapper: "#wrapper",
        content: "#content",
        smooth: 2,
        smoothTouch: 0.2,

    })


    const mainLink = document.querySelector(".main-link");
    const overlay = document.querySelector(".overlay");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const items = document.querySelectorAll(".dropdown-menu li");
    let isOpen = false;
    const trigger = document.querySelector(".menu-items")
    let tl = gsap.timeline({ paused: true });
    tl.to(trigger, {
        width: "min(600px,90vw)",
        minWidth: "285px",
        duration: 0.15,
        ease: "power2.out",
        pointerEvents: "auto",

    });

    tl.to(items, {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.15,
        ease: "power2.out"
    },);
    function openMenu() {
        mainLink.classList.add("nav-open");
        overlay.classList.add("active");
        dropdownMenu.classList.add("show");
        isOpen = true;
        tl.play();
    }

    function closeMenu() {
        mainLink.classList.remove("nav-open");
        overlay.classList.remove("active");
        dropdownMenu.classList.remove("show");
        isOpen = false;
        tl.reverse();
    }

    trigger.addEventListener("click", (e) => {
        e.preventDefault();
        isOpen ? closeMenu() : openMenu();
    });

    overlay.addEventListener("click", closeMenu);

    const slides = [
        {
            videos: [
                'assets/videos/7EMA_Robert_Anil_Nektar_Header3.mp4',
                'assets/videos/7EMA_Robert_Anil_Nektar_Header3.mp4',
                'assets/videos/7EMA_Robert_Anil_Nektar_Header3.mp4'
            ]
        },
        {
            videos: [
                'assets/videos/FCSG_Trikot_Leo_Graf_Nektar_Thumbnail.mp4',
                'assets/videos/FCSG_Trikot_Leo_Graf_Nektar_Thumbnail.mp4',
                'assets/videos/FCSG_Trikot_Leo_Graf_Nektar_Thumbnail.mp4'
            ]
        },
        {
            videos: [
                'assets/videos/vernisage_header.mp4',
                'assets/videos/vernisage_header.mp4',
                'assets/videos/vernisage_header.mp4'
            ]
        },
        {
            videos: [
                'assets/videos/Lipton_Sommerlier_Header.mp4',
                'assets/videos/Lipton_Sommerlier_Header.mp4',
                'assets/videos/Lipton_Sommerlier_Header.mp4'
            ]
        },
        {
            videos: [
                'assets/videos/Stella_Coconut_Rouven_Niedermaier_header.mp4',
                'assets/videos/Stella_Coconut_Rouven_Niedermaier_header.mp4',
                'assets/videos/Stella_Coconut_Rouven_Niedermaier_header.mp4'
            ]
        }
    ];

    let currentIndex = 0;
    let isAnimating = false;
    const totalSlides = slides.length;
    const slideNumber = document.querySelector('.slide-number');

    function updateSlideNumber() {
        slideNumber.textContent = `0${currentIndex + 1}/0${totalSlides}`;
    }

    const panelInners = document.querySelectorAll('.panel-inner');

    function getFaces(panelInner) {
        return Array.from(panelInner.querySelectorAll('.panel-face'));
    }
    panelInners.forEach(inner => {
        getFaces(inner).forEach((face, i) => {
            gsap.set(face, {
                rotateY: i === 0 ? 0 : 90,
                transformOrigin: 'right center',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            });
            if (i === 0) {
                const vid = face.querySelector('video');
                if (vid) vid.play();
            }
        });
    });

    function flipPanels(direction) {
        if (isAnimating) return;

        let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        if (nextIndex < 0) nextIndex = totalSlides - 1;
        else if (nextIndex >= totalSlides) {
            nextIndex = 0;
        }
        isAnimating = true;

        const rotateOut = direction === 'next' ? -90 : 90;
        const rotateIn = direction === 'next' ? 90 : -90;
        const origin = direction === 'next' ? 'right center' : 'left center';

        const tl = gsap.timeline({
            onComplete: () => {
                currentIndex = nextIndex;
                isAnimating = false;
                updateSlideNumber();
            }
        });

        panelInners.forEach(inner => {
            const faces = getFaces(inner);
            

            const currentFace = faces[currentIndex];
            const nextFace = faces[nextIndex];

            // update per panel
            // Make sure next face starts in correct rotated position
            gsap.set(nextFace, { rotateY: rotateIn, transformOrigin: origin, });
            gsap.set(currentFace, { transformOrigin: origin })
            // Play next video
            const nextVid = nextFace.querySelector('video');
            if (nextVid) nextVid.play();

            tl.to(currentFace, {
                rotateY: rotateOut,
                duration: 0.5,
                ease: 'power2.inOut',
                transformOrigin: origin,
            }, 0)
                .to(nextFace, {
                    rotateY: 0,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    transformOrigin: origin,
                    onComplete: () => {
                        const oldVid = currentFace.querySelector('video');
                    }
                }, 0);
        });
    }

    document.getElementById('nextBtn').addEventListener('click', () => flipPanels('next'));
    document.getElementById('prevBtn').addEventListener('click', () => flipPanels('prev'));

    updateSlideNumber();
})