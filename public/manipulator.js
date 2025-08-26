const navBar = document.querySelector("nav ul");

document.querySelectorAll("nav li").forEach((btn, i) => {
  btn.addEventListener("click", () => {
    gsap.to(window, {
      duration: 0.1,
      scrollTo: { y: `#s${i + 1}` },
      ease: "power2.inOut",
    });
  });
});

document.addEventListener("scroll", () => {
  let vezes = Math.floor(window.scrollY / window.innerHeight);

  document.querySelectorAll("nav li")[vezes].classList.add("active");
  document.querySelectorAll("nav li").forEach((li, index) => {
    if (index !== vezes) {
      li.classList.remove("active");
      const icon = li.querySelector("i");
      if (icon) icon.className = "bx bx-circle";
    } else {
      const icon = li.querySelector("i");
      if (icon) icon.className = "bx bxs-circle";
    }
  });
});
