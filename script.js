const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("desktopNav");

menuBtn?.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
  if (document.body.classList.contains("menu-open")) {
    nav.style.display = "flex";
    nav.style.position = "fixed";
    nav.style.inset = "72px 0 0 0";
    nav.style.background = "rgba(244,240,232,.98)";
    nav.style.flexDirection = "column";
    nav.style.alignItems = "center";
    nav.style.justifyContent = "center";
    nav.style.gap = "30px";
    nav.style.fontSize = "24px";
    nav.style.zIndex = "99";
    menuBtn.textContent = "×";
  } else {
    nav.removeAttribute("style");
    menuBtn.textContent = "☰";
  }
});

document.querySelectorAll('#desktopNav a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      document.body.classList.remove("menu-open");
      nav.removeAttribute("style");
      menuBtn.textContent = "☰";
    }
  });
});

const playBtn = document.getElementById("playBtn");
const bars = [...document.querySelectorAll("#wave i")];
let playing = false;
let timer;

playBtn?.addEventListener("click", () => {
  playing = !playing;
  playBtn.textContent = playing ? "Ⅱ" : "▶";
  if (playing) {
    let t = 0;
    timer = setInterval(() => {
      bars.forEach((bar, i) => {
        const h = 10 + Math.abs(Math.sin((t + i) * .8)) * 28;
        bar.style.height = `${h}px`;
      });
      t++;
    }, 100);
  } else {
    clearInterval(timer);
  }
});

const revealItems = document.querySelectorAll(".section, .floating-card, .life-card");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: .08});
revealItems.forEach(el => observer.observe(el));
