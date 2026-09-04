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


// Real featured song player.
const song = document.getElementById("songAudio");
const audioPlay = document.getElementById("audioPlay");
const audioProgress = document.getElementById("audioProgress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const formatTime = seconds => {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};

song?.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(song.duration);
});

song?.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(song.currentTime);
  if (song.duration) audioProgress.value = (song.currentTime / song.duration) * 100;
});

audioProgress?.addEventListener("input", () => {
  if (song.duration) song.currentTime = (audioProgress.value / 100) * song.duration;
});

audioPlay?.addEventListener("click", async () => {
  if (song.paused) {
    try {
      await song.play();
      audioPlay.textContent = "Ⅱ";
      audioPlay.setAttribute("aria-label", "Pause song");
    } catch (err) {
      console.error("Audio playback failed:", err);
    }
  } else {
    song.pause();
  }
});

song?.addEventListener("pause", () => {
  audioPlay.textContent = "▶";
  audioPlay.setAttribute("aria-label", "Play song");
});

song?.addEventListener("ended", () => {
  audioProgress.value = 0;
  currentTimeEl.textContent = "0:00";
});
