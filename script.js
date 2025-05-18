//  for scroll smoothly
const lenis = new Lenis({
    duration: 1.2,
    smooth: true,
});

//  for scroll smoothly
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

         // for horizontal scrolling section

gsap.registerPlugin(ScrollTrigger);

const contents = gsap.utils.toArray("#horizontal .content");
    gsap.to(contents, {
         xPercent : -100 * (contents.length - 1),
         scrollTrigger : {
            trigger : "#horizontal",
            pin : true,
            scrub : 1,
            snap: 1 / (contents.length - 1),
            end: "+=3000",
           
         }

        });
        // for Thank you! section
  
        var tl = gsap.timeline({scrollTrigger: {
         trigger: "#chacha",
         markers: false,
            start: "50% 50%",
            end: "100% 50%",
            scrub: 2,
            pin : true,               
         }});
         tl.to("#top", {
            top: "-50%",
         }, 'a').to("#btm", {
            top: "60%",
         }, 'a')
         .to("#mmm", {
            marginTop: "0%", 
         })


document.addEventListener("DOMContentLoaded", function () {
    const cards = [
        {id :"#card1" , endTranslateX: -2000, rotate:45},
        {id :"#card2" , endTranslateX: -1000, rotate:-30},
        {id :"#card3" , endTranslateX: -2000, rotate:45},
        {id :"#card3" , endTranslateX: -1500, rotate:-30},
    ]

          
})