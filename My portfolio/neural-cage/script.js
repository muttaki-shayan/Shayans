document.addEventListener("DOMContentLoaded", () => {
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$∆∇%&*";

  const readingProgress = document.getElementById("reading-progress");
  const syncRate = document.getElementById("sync-rate");
  const hudWarning = document.getElementById("hud-warning");
  const audio = document.getElementById("bg-audio");
  const audioBtn = document.getElementById("audio-toggle");
  const sidePanel = document.getElementById("sidePanel");
  const panelToggle = document.getElementById("panel-toggle");
  const toggleIcon = document.getElementById("toggle-icon");

  // Reading progress
  const updateReadingProgress = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    const percent = Math.min(100, Math.max(0, scrollPercent));

    if (readingProgress) {
      readingProgress.style.width = `${percent}%`;
    }

    if (syncRate) {
      syncRate.innerText = `${Math.round(percent)}%`;
    }

    if (hudWarning && percent > 80) {
      hudWarning.innerHTML = "CRITICAL:<br>Cartel forces engaged!";
      hudWarning.style.color = "#ff0000";
    }
  };

  window.addEventListener("scroll", updateReadingProgress);
  updateReadingProgress();

  // Random BPM fluctuation
  setInterval(() => {
    const bpm = document.getElementById("bpm-monitor");
    if (!bpm) return;

    const base = 72;
    const fluctuation = Math.floor(Math.random() * 15) - 5;
    bpm.innerText = base + fluctuation;
  }, 2000);

  // Audio toggle
  if (audio && audioBtn) {
    audioBtn.addEventListener("click", async () => {
      if (audio.paused) {
        try {
          await audio.play();
          audioBtn.innerText = "[ AUDIO ON ]";
          audioBtn.style.color = "#050505";
          audioBtn.style.background = "#00ffcc";
        } catch (error) {
          console.error("Audio playback failed:", error);
        }
      } else {
        audio.pause();
        audioBtn.innerText = "[ AUDIO OFF ]";
        audioBtn.style.color = "#00ffcc";
        audioBtn.style.background = "transparent";
      }
    });
  }

  // Text decryption effect
  const triggerDecryption = (el) => {
    const originalText = el.getAttribute("data-text");
    if (!originalText) return;

    let iterations = 0;

    const interval = setInterval(() => {
      el.innerText = originalText
        .split("")
        .map((char, index) => {
          if (index < iterations) return originalText[index];
          return LETTERS[Math.floor(Math.random() * LETTERS.length)];
        })
        .join("");

      if (iterations >= originalText.length) {
        clearInterval(interval);
        el.innerText = originalText;
      }

      iterations += 1 / 3;
    }, 30);
  };

  const decryptObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";

        entry.target.querySelectorAll(".decrypt-text").forEach((el) => {
          triggerDecryption(el);
          el.classList.remove("decrypt-text");
        });

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".chapter").forEach((chapter) => {
    decryptObserver.observe(chapter);
  });

  // Side panel toggle
  if (panelToggle && sidePanel && toggleIcon) {
    panelToggle.addEventListener("click", () => {
      sidePanel.classList.toggle("active");

      const isActive = sidePanel.classList.contains("active");
      toggleIcon.innerText = isActive ? "❌" : "📂";
      panelToggle.style.background = isActive ? "#ff0055" : "#00ffcc";
    });
  }

  // Chapter content toggle
  document.querySelectorAll(".show-chapter-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const content = this.parentElement?.nextElementSibling;
      if (!content) return;

      const isHidden = content.classList.contains("hidden");

      if (isHidden) {
        content.classList.remove("hidden");
        content.classList.add("show");

        this.innerHTML = "[ CLOSE DATA ]";
        this.style.color = "#ff0055";
        this.style.borderColor = "#ff0055";

        content.querySelectorAll(".decrypt-text").forEach((el) => {
          triggerDecryption(el);
          el.classList.remove("decrypt-text");
        });
      } else {
        content.classList.add("hidden");
        content.classList.remove("show");

        this.innerHTML = "[ ACCESS DATA ]";
        this.style.color = "#00ffcc";
        this.style.borderColor = "#00ffcc";
      }
    });
  });
});