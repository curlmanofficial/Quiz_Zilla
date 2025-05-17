// Initialize Lenis
const lenis = new Lenis({
    duration: 1.2,
    smooth: true,
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


document.querySelectorAll(".elem").forEach((elem) => {
    let image = elem.querySelector("img");
    let tl = gsap.timeline()

    let Xtransfom = gsap.utils.random(-100, 100);
    
    tl 
        .set(image, { 
          transformOrigin: `${Xtransfom < 0 ? 0 : '100%' }`,
         },"start")
         .to(image, {
            scale:0,
            ease: "none",
            scrollTrigger: {
                trigger: image,
                start: "top top",
                end: "bottom  top ",
                scrub: true,  
            }
        

            },"start")
        .to(elem, {
            xPercent: Xtransfom,
            ease: "power3.inOut",
            scrollTrigger: {
                trigger: elem,
                start: "top bottom",
                end: "bottom  top ",
                scrub: true,  
            }

        })
         })

         // Quiz functionality

