setTimeout(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText, TextPlugin);
  // use a script tag or an external JS file

  let screens = 4;
  const currentScreen = 0;
  let infos = {
    stage: 0,
    progress: 0,
  };
  let initPos = [
    {
      posX: -10,
      posY: 15,
      posZ: 30,
      lookX: -10,
      lookY: 10,
      lookZ: 10,
    },
    {
      posX: 20,
      posY: 20,
      posZ: 30,
      lookX: 0,
      lookY: 10,
      lookZ: 15,
    }
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
    gsap.set(screen, { xPercent: -100 });
    gsap.to(screen, {
      xPercent: 0,
      id: "example",
      scrollTrigger: {
        trigger: screen,
        end: "top",
        onUpdate: (self) => {
          animate(self);
        },
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
    }
  }
  let textos = SplitText.create(".text", {
    type: "words"
  });
  let highlight = SplitText.create(".highlight", {
    type: "chars"
  });

  gsap.from(textos.words, {
    x: -100,
    y: 0,
    opacity: 0,
    stagger: {
      amount: 0.1,
      from: "random",
    }
  });
  gsap.from(highlight.chars, {
    y: 100,
    opacity: 0,
    stagger: {
      amount: 0.5,
      from: "start",
    }
  });

}, 1000);
