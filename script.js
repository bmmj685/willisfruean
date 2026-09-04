const menu = document.querySelector(".menu-button");
const nav = document.querySelector(".desktop-nav");

menu?.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!open));
  menu.textContent = open ? "☰" : "×";
  if (!open) {
    Object.assign(nav.style, {
      display: "flex", position: "fixed", inset: "68px 0 0",
      background: "rgba(243,240,232,.98)", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "30px",
      fontSize: "24px", zIndex: "99"
    });
  } else nav.removeAttribute("style");
});

document.querySelectorAll(".desktop-nav a").forEach(a => a.addEventListener("click", () => {
  if (window.innerWidth <= 900) {
    nav.removeAttribute("style");
    menu.setAttribute("aria-expanded", "false");
    menu.textContent = "☰";
  }
}));

// Subtle reveal animation — never changes the portrait or places elements over it.
const observer = new IntersectionObserver(items => {
  items.forEach(item => {
    if (item.isIntersecting) {
      item.target.style.opacity = "1";
      item.target.style.transform = "translateY(0)";
      observer.unobserve(item.target);
    }
  });
}, {threshold: .08});

document.querySelectorAll(".section-label,.profile-grid,.timeline-row,.skills-grid article,.hobby-grid").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(18px)";
  el.style.transition = "opacity .7s ease, transform .7s ease";
  observer.observe(el);
});
