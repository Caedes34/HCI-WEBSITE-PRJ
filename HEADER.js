let lastScrollTop = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down - Hide header
    header.classList.add("hidden-header");
  } else {
    // Scrolling up - Show header
    header.classList.remove("hidden-header");
  }

  lastScrollTop = scrollTop;
});
