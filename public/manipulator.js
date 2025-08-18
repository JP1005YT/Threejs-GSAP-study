const navBar = document.querySelector("nav ul")

// navBar.querySelectorAll("li").forEach((li) => {
//     li.addEventListener("click", (event) => {
//         // Remove 'active' class and set icon class for all li
//         navBar.querySelectorAll("li").forEach((item) => {
//             item.classList.remove("active");
//             const icon = item.querySelector("i");
//             if (icon) icon.className = "bx bx-circle";
//         });
//         // Add 'active' class and set icon class for clicked li
//         li.classList.add("active");
//         const clickedIcon = li.querySelector("i");
//         if (clickedIcon) clickedIcon.className = "bx bxs-circle";
//     });
// });

document.querySelectorAll("nav li").forEach((btn, i) => {
  btn.addEventListener("click", () => {
    gsap.to(window, {
      duration: 0.1,
      scrollTo: { y: `#s${i+1}` },
      ease: "power2.inOut"
    });
  });
});

document.addEventListener("scroll",() => {
    let vezes = Math.floor(window.scrollY / window.innerHeight);
    
    document.querySelectorAll("nav li")[vezes].classList.add("active");
    document.querySelectorAll("nav li").forEach((li, index) => {
        if (index !== vezes) {
            li.classList.remove("active");
            const icon = li.querySelector("i");
            if (icon) icon.className = "bx bx-circle";
        }else {
            const icon = li.querySelector("i");
            if (icon) icon.className = "bx bxs-circle";
        }
    });
})