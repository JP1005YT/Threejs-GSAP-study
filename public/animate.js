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
      posY: 20,
      posZ: 30,
      lookX: 0,
      lookY: 10,
      lookZ: 15,
    },
    {
      posX: 20,
      posY: 20,
      posZ: 30,
      lookX: 0,
      lookY: 10,
      lookZ: 15,
    },
    {
      posX: 20,
      posY: 20,
      posZ: 30,
      lookX: 0,
      lookY: 10,
      lookZ: 15,
    },
    {
      posX: 16,
      posY: 18,
      posZ: 30,
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
          animate(self);
        },
        // markers: true,
        scrub: true,
      },
    });
  });

  function animate(self) {
    infos.progress = self.progress.toFixed(2) * 100;
    switch (self.trigger.id) {
      case "s1":
        break;
        case "s2":
        infos.stage = 0;
        newvalue = { ...initPos[infos.stage] };
        newvalue.posX = initPos[infos.stage].posX + infos.progress * 0.2;
        window.scene.onSwitchCamera(newvalue);
        infos.stage = 1;
        break;
      case "s3":
        infos.stage = 2;
        newvalue = { ...initPos[infos.stage] };
        newvalue.posX = initPos[infos.stage].posX + infos.progress * -0.4;
        window.scene.onSwitchCamera(newvalue);
        break;
      case "s4":
        infos.stage = 3;
        newvalue = { ...initPos[infos.stage] };
        newvalue.posY = initPos[infos.stage].posY + infos.progress * -0.4;
        newvalue.posX = initPos[infos.stage].posX + infos.progress * -0.4;
        newvalue.posZ = initPos[infos.stage].posZ + infos.progress * -0.4;
        window.scene.onSwitchCamera(newvalue);
        break;
    }
  }
}, 1000);
