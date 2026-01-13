window.addEventListener("DOMContentLoaded", () => {

const isDesktop = window.matchMedia("(pointer: fine)").matches;

const lenis = new Lenis({
  lerp: isDesktop ? 0.08 : 0.18,  
  smoothWheel: true,
  smoothTouch: true,
  wheelMultiplier: isDesktop ? 0.8 : 0.6,
  touchMultiplier: 0.9,   
  normalizeWheel: true,
  infinite: false,
  overscroll: false,
});


lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


const c = document.querySelector("#cursor");
let mx = innerWidth/2, my = innerHeight/2, px = mx, py = my;

addEventListener("mousemove", e => (mx = e.clientX, my = e.clientY));

const xTo = gsap.quickTo(c, "x", { duration: 0.7, ease: "power4.out" });
const yTo = gsap.quickTo(c, "y", { duration: 0.7, ease: "power4.out" });

gsap.ticker.add(() => {
  xTo(mx);
  yTo(my);

  const dx = mx - px, v = Math.hypot(dx, my - py);

  gsap.to(c, {
    skewX: gsap.utils.clamp(-8, 8, dx * 0.25),
    scaleX: 1 + v * 0.01,
    scaleY: 1 - v * 0.01,
    rotate: dx * 0.15,
    duration: 0.55,
    ease: "power4.out"
  });

  px = mx; py = my;
});

  const marquee = document.querySelector(".marquee-track");
  if (marquee) {
    const width = marquee.scrollWidth / 2;
    gsap.to(".marquee-track", {
      x: -width,
      duration: 12,
      ease: "none",
      repeat: -1
    });
  }

  gsap.to("#above-intro", {
    clipPath: "inset(0 0 0% 0)",
    ease: "none",
    scrollTrigger: {
      trigger: "#intro-container",
      start: "top 80%",
      end: "top 30%",
      scrub: 2
    }
  });

  gsap.to("#above-intro-1", {
    clipPath: "inset(0 0 0% 0)",
    ease: "none",
    scrollTrigger: {
      trigger: "#intro-container-1",
      start: "top 80%",
      end: "top 30%",
      scrub: 2
    }
  });

  const scrollLine = document.querySelector("#scroll-line line");
  if (scrollLine) {
    const length = scrollLine.getTotalLength();
    gsap.set(scrollLine, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    gsap.to(scrollLine, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#scroll-line",
        start: "top 80%",
        end: "top 40%",
        scrub: 4,
        once: true
      }
    });
  }

  gsap.to("#page3", {
    backgroundColor: "#F7F7F7",
    duration: 1.5,
    ease: "none",
    scrollTrigger: {
      trigger: "#page3",
      start: "top -120%",
      end: "bottom bottom",
      scrub: 2
    }
  });

  const wave = document.querySelectorAll("#page4-wave-div div");
  if (wave.length) {
    gsap.from(wave, {
      y: 60,
      autoAlpha: 0,
      duration: 1,
      ease: "power4.out",
      stagger: {
        each: 0.3,
        from: "center"
      },
      scrollTrigger: {
        trigger: "#page4-wave-div",
        start: "top 90%",
        end: "bottom 40%",
        scrub: 2
      }
    });
  }

  const hoverImage = document.querySelector("#hover-img");
  const hoverItem = document.querySelectorAll(".hover-item");

  if (hoverImage) {
    gsap.set(hoverImage, { xPercent: -50, yPercent: -50 });

    window.addEventListener("mousemove", (e) => {
      gsap.to(hoverImage, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
      });
    });

    hoverItem.forEach(item => {
      item.addEventListener("mouseenter", () => {
        hoverImage.style.backgroundImage = `url(${item.dataset.img})`;
        hoverImage.style.opacity = 1;
      });

      item.addEventListener("mouseleave", () => {
        hoverImage.style.opacity = 0;
      });
    });
  }

  document.fonts.ready.then(() => {
    const wrapper = document.querySelector(".Horizontal");
    const text = document.querySelector(".Horizontal__text");

    if (wrapper && text) {
      const split10 = SplitText.create(text, { type: "chars,words" });

      const scrollTween = gsap.to(text, {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          end: "+=5000px",
          scrub: true
        }
      });

      split10.chars.forEach((char) => {
        gsap.from(char, {
          yPercent: "random(-200,200)",
          rotation: "random(-20,20)",
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: "left 100%",
            end: "left 30%",
            scrub: 1
          }
        });
      });
    }

    document.querySelectorAll(".split-heading").forEach((heading) => {
      const split5 = new SplitText(heading, {
        type: "lines",
        linesClass: "line"
      });

      gsap.from(split5.lines, {
        yPercent: 60,
        autoAlpha: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          end: "top 30%",
          scrub: 1.5,
          once: true
        }
      });

const split6 = new SplitText(".split-heading-1", { type: "chars" });

gsap.set(split6.chars, {
  yPercent: 60,
  rotateX: -35,
  skewX: -7,
  autoAlpha: 0,
});

gsap.to(split6.chars, {
  yPercent: 0,
  rotateX: 0,
  skewX: 0,
  autoAlpha: 1,
  duration: 1.4,
  ease: "power4.out",
  stagger: {
    amount: 0.55,
    from: "start"
  },
  scrollTrigger: {
    trigger: ".split-heading-1",
    start: "top 90%",
    end: "top 0%",
    scrub: 3.8,
    once: true,                           
    markers: false
  }
});
    });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 800px)", () => initLoader(false));
    mm.add("(max-width: 767px)", () => initLoader(true));

    function initLoader(isMobile) {
      const counterEl = document.querySelector("#loader-counter");
      const stairs = document.querySelectorAll("#loader div");
      const line2 = document.querySelector("#loader-line line");

      if (!counterEl || !line2) return;

      const length2 = line2.getTotalLength();
      let counter = { value: 0 };

      gsap.set(line2, {
        strokeDasharray: length2,
        strokeDashoffset: length2
      });

      gsap.set("#loader-line", {
        scaleX: -1,
        transformOrigin: "center"
      });

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out"
        }
      });

      tl.to(counter, {
        value: 100,
        duration: 2.2,
        ease: "none",
        onUpdate: () => {
          counterEl.textContent = Math.floor(counter.value);
        }
      }, "start");

      tl.to(line2, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: "none"
      }, "start");

      tl.call(() => {
        const split = new SplitText(counterEl, { type: "chars" });
        gsap.to(split.chars, {
          xPercent: 80,
          autoAlpha: 0,
          stagger: { amount: 0.35, from: "end" },
          duration: 0.8,
          ease: "expo.inOut"
        });
      }, null, "start+=2.25");

      tl.to(line2, {
        autoAlpha: 0,
        duration: 0.45,
        ease: "sine.out"
      }, "start+=2.4");

      tl.to(stairs, {
        y: "-110%",
        duration: 1.25,
        stagger: 0.11,
        ease: "power3.inOut"
      }, "start+=2.7");

      const splitHeading = new SplitText("#heading1", { type: "chars" });

      tl.from(splitHeading.chars, {
        y: isMobile ? 120 : 80,
        autoAlpha: 0,
        duration: isMobile ? 1.05 : 1.2,
        stagger: { amount: 0.4 },
        ease: "power2.out"
      }, "start+=3.4");

      tl.from("#page1-img-1", {
        y: 150,
        scale: 0.97,
        autoAlpha: 0,
        duration: 0.85,
        ease: "power3.out"
      }, "start+=3.9");

      tl.from("nav", {
        y: -22,
        autoAlpha: 0,
        duration: 0.65,
        stagger: 0.07,
        ease: "power2.out"
      }, "start+=4");

      tl.call(() => {
        document.querySelector("#loader")?.remove();
      });
    }
  });
});


