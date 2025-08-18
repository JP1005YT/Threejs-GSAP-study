setTimeout(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);
  // use a script tag or an external JS file

  let screens = 4;
  const currentScreen = 0;
  let infos = {
    stage: 0,
    progress: 0,
  };
  let initPos = [
    {
      posX: 0,
      posY: 25,
      posZ: 20,
      lookX: 0,
      lookY: 10,
      lookZ: 10,
    },
    {
      posX: 20,
      posY: 25,
      posZ: 20,
      lookX: 0,
      lookY: 10,
      lookZ: 10,
    },
    {
      posX: 0,
      posY: 15,
      posZ: 0,
      lookX: 0,
      lookY: 10,
      lookZ: 0,
    },
  ];

  let smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#ui",
    smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
    effects: true, // looks for data-speed and data-lag attributes on elements
    smoothTouch: 0.1,
  });

  screensEls = gsap.utils.toArray(".screen");

  screensEls.forEach((screen, i) => {
    const id = screen.id;
    if (i % 2 === 0) {
      gsap.set(screen, { xPercent: -100 });
    } else {
      gsap.set(screen, { xPercent: 100 });
    }
    gsap.to(screen, {
      xPercent: 0,
      id: "example",
      scrollTrigger: {
        trigger: screen,
        end: "top",
        onUpdate: (self) => {
          if (self.start >= 0 && self.start <= 957) {
            infos.stage = 0;
          }
          if (self.start >= 957 && self.start <= 1914) {
            infos.stage = 1;
          }
          if (self.start >= 1914 && self.start <= 2871) {
            infos.stage = 2;
          }
          console.log(infos.stage);
          infos.progress = self.progress.toFixed(2) * 100;
          newvalue = { ...initPos[infos.stage]};
          newvalue.posX = initPos[infos.stage].posX + (infos.progress * 0.2);
          window.scene.onSwitchCamera(newvalue);
        },
        // markers: true,
        scrub: true,
      },
    });
  });
}, 1000);
// console.clear();

// gsap.set(".split", { opacity: 1 });

// document.fonts.ready.then(() => {
//   let containers = gsap.utils.toArray(".container");

//   containers.forEach((container) => {
//     let text = container.querySelector(".split");
//     let animation;

//     SplitText.create(text, {
//       type: "words,lines",
//       mask: "lines",
//       linesClass: "line",
//       autoSplit: true,
//       onSplit: (instance) => {
//         console.log("split");
//         return gsap.from(instance.lines, {
//           yPercent: 120,
//           stagger: 0.1,
//           scrollTrigger: {
//             trigger: container,
//             markers: true,
//             scrub: true,
//             start: "clamp(top center)",
//             end: "clamp(bottom center)",
//           },
//         });
//       },
//     });
//   });
// });
