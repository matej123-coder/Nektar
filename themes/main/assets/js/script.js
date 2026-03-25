

document.addEventListener("DOMContentLoaded",()=>{
    
    gsap.registerPlugin(ScrollTrigger,ScrollSmoother);
   const smoother = ScrollSmoother.create({
    wrapper:"#wrapper",
    content:"#content",
    smooth:2,
    smoothTouch:0.2,    
   })
  

    const mainLink = document.querySelector(".main-link");
    const overlay = document.querySelector(".overlay");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const items = document.querySelectorAll(".dropdown-menu li");
    let isOpen = false;
    const trigger = document.querySelector(".menu-items")
    let tl = gsap.timeline({paused:true});
    tl.to(trigger , {
        width:"min(600px,90vw)",
        minWidth:"285px",
        duration: 0.15,
        ease: "power2.out",
        pointerEvents: "auto"
    });

    tl.to(items, {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.15,
        ease: "power2.out"
    }, );
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

    const swiper = new Swiper('.swiper',   {
             height: '100%',
        navigation: {
            nextEl: '.arrow-right',
            prevEl: '.arrow-left',
        },
         effect: 'slide',
    })    
})