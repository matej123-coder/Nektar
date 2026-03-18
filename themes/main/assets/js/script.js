
document.addEventListener("DOMContentLoaded",()=>{
    
    gsap.registerPlugin(ScrollTrigger,ScrollSmoother);
   const smoother = ScrollSmoother.create({
    wrapper:"#wrapper",
    content:"#content",
    smooth:2,
    smoothTouch:0.2,    
   })
})