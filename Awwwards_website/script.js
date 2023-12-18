const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var timeout;
function circlesqueeze(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(details){
        this.clearTimeout(timeout);
        xscale = gsap.utils.clamp(.8,1.2,details.clientX - xprev);
        yscale = gsap.utils.clamp(.8,1.2,details.clientY - yprev);

        xprev = details.clientX;
        yprev = details.clientY;
        circleMouseFollower(xscale,yscale)

        setTimeout(function(){
        timeout = document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`;
        }, 100);
    })
}

function firstPageAnim(){
    var tl = gsap.timeline();
    tl.from("#nav",{
        y:'-10',
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut
    })
    .to(".boundingelem",{
        y:0,
        ease:Expo.easeInOut,
        duration:2,
        delay:-1,
        stagger:.2
    })
    .from("#herofooter",{
        y:-10,
        opacity:0,
        duration:1.5,
        delay:-1,
        ease:Expo.easeInOut
    })
}

function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove", function(details){
        document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;
    })
}
circleMouseFollower();
circlesqueeze();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffroot = 0;

    elem.addEventListener("mouseleave", function(details){
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power3,
            duration:0.5,
        });
    });

    elem.addEventListener("mousemove", function(details){
        var diff = details.clientY - elem.getBoundingClientRect().top;
        diffroot = details.clientX - rotate;
        rotate = details.clientX

        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top : diff,
            left : details.clientX,
            rotate : gsap.utils.clamp(-20,20,diffroot*0.5)
        });
    });
});

window.onload = function() {
    setInterval(function(){
        var date = new Date();
        // var displayDate = date.toLocaleDateString();
        var displayTime = date.toLocaleTimeString();

        document.getElementById('datetime').innerHTML = displayTime;
    }, 1000);
}