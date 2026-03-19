
document.addEventListener("DOMContentLoaded",()=>{
    
    gsap.registerPlugin(ScrollTrigger,ScrollSmoother);
   const smoother = ScrollSmoother.create({
    wrapper:"#wrapper",
    content:"#content",
    smooth:2,
    smoothTouch:0.2,    
   })
    const navTrigger = document.querySelector(".dropdown-toggle");
    const overlay = document.querySelector(".overlay");
    const dropdown = document.querySelector(".dropdown");
   
    
    dropdown.addEventListener("show.bs.dropdown", () => {
        navTrigger.classList.add("nav-open");
        overlay.classList.add("active");
    });

    dropdown.addEventListener("hide.bs.dropdown", () => {
        navTrigger.classList.remove("nav-open");
        overlay.classList.remove("active");
    });
    
    document.querySelectorAll(".dropdown-item").forEach(item => {
        item.addEventListener("click", () => {
            navTrigger.classList.remove("nav-open");
            overlay.classList.remove("active");
        });
    });
    let color="red";
})