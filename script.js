/* =========================================================
   THE SHIKSHA EXPERIMENT — script
   Organized by feature. Search for "EDIT HERE" to customize.
   ========================================================= */

/* ---------------------------------------------------------
   EDIT HERE: text content you can freely change
   --------------------------------------------------------- */
const LOAD_MESSAGES = [
  "Calibrating personality...",
  "Analyzing chaos...",
  "Detecting intelligence...",
  "Checking chemistry...",
  "Scanning birthday energy..."
];

const REACTIONS = {
  "chemistry,intelligence": "GENIUS REACTION 🧠🧪",
  "friendship,chaos": "UNSTABLE BUT BEAUTIFUL 💀",
  "confidence,courage": "UNSTOPPABLE ENERGY 👑",
  "dreams,courage": "FUTURE LOADING... 🚀",
  "birthday,confidence": "LEGENDARY BIRTHDAY REACTION 🎂✨"
};
const FINAL_COMBO = ["chemistry","chaos","intelligence","confidence","birthday"];
const FINAL_RESULT_TITLE = "SHIKSHA";
const FINAL_RESULT_SUB = "THE RAREST ELEMENT DISCOVERED.";
const DEFAULT_REACTION = "INTERESTING... BUT INCONCLUSIVE 🧪";

const QUIZ_QUESTIONS = [
  { q: "H + H + O → ?", choices: ["CO₂","H₂O","NaCl","Chaos"], answer: 1, right: "Correct! Your chemistry privileges have been restored. 🧪" },
  { q: "Na + Cl → ?", choices: ["Table salt","Rocket fuel","Sunshine","A poem"], answer: 0, right: "Correct! Basic, but essential. Like her patience with you." },
  { q: "Fe + O₂ → ?", choices: ["Gold","Rust","Glitter","Confidence"], answer: 1, right: "Correct! Iron oxidizes. Shiksha does not." },
  { q: "Confidence + Courage → ?", choices: ["Nervous energy","Unstoppable energy","Static","Silence"], answer: 1, right: "Correct! Certified chemistry genius." }
];

const FILE_MESSAGES = [
  "Congratulations. You discovered absolutely nothing useful. But happy birthday anyway. 💀",
  "Scientific conclusion: Shiksha is impossible to replicate.",
  "Warning: excessive birthday emotions detected.",
  "You found the secret element.\n\nSHIKSHA + CHAOS = PURE CINEMA"
];

/* --------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  initLoadingScreen();
  initParticles();
  initNav();
  initMusic();
  initStatBars();
  initElementReactions();
  initSecretEgg();
  initQuiz();
  initFiles();
  initCertificate();
  initFinalReveal();
  initScrollReveal();
  initCursorGlow();
  initScanline();
  initHeroGlitch();
  initStartBurst();
});

/* ============ SCROLL REVEAL ============ */
function initScrollReveal(){
  const selectors = ".power-card,.timeline-item,.file-card,.element-card,.quiz-box,.certificate,.pick-el";
  const els = document.querySelectorAll(selectors);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => observer.observe(el));
}

/* ============ CURSOR GLOW (desktop only) ============ */
function initCursorGlow(){
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isTouch || reduceMotion || window.innerWidth < 900) return;

  const glow = document.createElement("div");
  glow.id = "cursor-glow";
  document.body.appendChild(glow);

  let targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
  let x = targetX, y = targetY;

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function loop(){
    x += (targetX - x) * 0.12;
    y += (targetY - y) * 0.12;
    glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();
}

/* ============ SCANLINE OVERLAY ============ */
function initScanline(){
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;
  const overlay = document.createElement("div");
  overlay.id = "scanline-overlay";
  document.body.appendChild(overlay);
}

/* ============ HERO TITLE GLITCH-IN ============ */
function initHeroGlitch(){
  const title = document.querySelector(".hero-title");
  const screen = document.getElementById("loading-screen");
  if (!title || !screen) return;
  const trigger = () => {
    title.classList.add("glitch-in");
  };
  // fire once the loading screen finishes fading
  const check = setInterval(() => {
    if (screen.classList.contains("done")){
      clearInterval(check);
      trigger();
    }
  }, 150);
}

/* ============ START BUTTON PARTICLE BURST ============ */
function initStartBurst(){
  const btn = document.getElementById("startBtn");
  if (!btn) return;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const rect = btn.getBoundingClientRect();
    burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2 + window.scrollY, 36);
    setTimeout(() => {
      document.getElementById("element").scrollIntoView({ behavior: "smooth" });
    }, 200);
  });
}

/* ============ LOADING SCREEN ============ */
function initLoadingScreen(){
  const screen = document.getElementById("loading-screen");
  const fill = document.getElementById("loadBarFill");
  const percent = document.getElementById("loadPercent");
  const msg = document.getElementById("loadMsg");

  let pct = 0;
  let msgIndex = 0;
  msg.textContent = LOAD_MESSAGES[0];

  const msgInterval = setInterval(() => {
    msgIndex = (msgIndex + 1) % LOAD_MESSAGES.length;
    msg.textContent = LOAD_MESSAGES[msgIndex];
  }, 500);

  const tick = setInterval(() => {
    pct += Math.random() * 14 + 6;
    if (pct >= 100){
      pct = 100;
      clearInterval(tick);
      clearInterval(msgInterval);
      msg.textContent = "SUBJECT FOUND: SHIKSHA";
      setTimeout(() => screen.classList.add("done"), 650);
    }
    fill.style.width = pct + "%";
    percent.textContent = Math.floor(pct) + "%";
  }, 160);
}

/* ============ BACKGROUND PARTICLES ============ */
function initParticles(){
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let w, h, particles;
  const isMobile = window.innerWidth < 640;
  const count = isMobile ? 30 : 65;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = document.documentElement.scrollHeight;
  }
  function makeParticles(){
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.6,
      vy: Math.random() * 0.25 + 0.06,
      vx: (Math.random() - 0.5) * 0.12,
      alpha: Math.random() * 0.5 + 0.15
    }));
  }
  resize();
  makeParticles();
  window.addEventListener("resize", () => { resize(); });

  let mouseX = w / 2, mouseY = h / 2;
  if (!isMobile){
    window.addEventListener("mousemove", (e) => { mouseX = e.clientX; mouseY = e.clientY + window.scrollY; });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function draw(){
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.y -= p.vy;
      p.x += p.vx;
      if (!isMobile){
        const dx = (mouseX - p.x) * 0.0006;
        p.x += dx;
      }
      if (p.y < -10) p.y = h + 10;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      ctx.beginPath();
      ctx.shadowBlur = isMobile ? 0 : 6;
      ctx.shadowColor = "rgba(183,148,246,0.8)";
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(210,170,255,${p.alpha})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    if (!reduceMotion) requestAnimationFrame(draw);
  }
  draw();
}

/* ============ NAVIGATION ============ */
function initNav(){
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll("[data-nav]").forEach(a => {
    a.addEventListener("click", () => { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); });
  });
}

/* ============ MUSIC TOGGLE ============ */
function initMusic(){
  const btn = document.getElementById("music-toggle");
  const audio = document.getElementById("bg-audio");
  btn.addEventListener("click", () => {
    const playing = btn.getAttribute("aria-pressed") === "true";
    if (playing){
      audio.pause();
      btn.setAttribute("aria-pressed", "false");
    } else {
      audio.play().catch(() => { /* no audio file provided yet — that's fine */ });
      btn.setAttribute("aria-pressed", "true");
    }
  });
}

/* ============ STAT BARS (animate on scroll into view) ============ */
function initStatBars(){
  const cards = document.querySelectorAll(".stat-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const card = entry.target;
        const fill = card.querySelector(".stat-fill");
        const num = card.querySelector(".stat-num");
        const target = parseFloat(card.dataset.value);
        const isInfinity = card.dataset.infinity === "1";
        fill.style.width = target + "%";
        let start = 0;
        const step = () => {
          start += target / 40;
          if (start >= target){
            num.textContent = isInfinity ? "∞%" : (card.dataset.max ? "MAXIMUM" : target + "%");
            return;
          }
          num.textContent = Math.floor(start) + "%";
          requestAnimationFrame(step);
        };
        step();
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.4 });
  cards.forEach(c => observer.observe(c));
}

/* ============ ELEMENT COMBINATION REACTIONS ============ */
function initElementReactions(){
  const picker = document.getElementById("elementPicker");
  const reactBtn = document.getElementById("reactBtn");
  const output = document.getElementById("reactionOutput");
  let selected = new Set();

  picker.addEventListener("click", (e) => {
    const btn = e.target.closest(".pick-el");
    if (!btn) return;
    const el = btn.dataset.el;
    if (selected.has(el)){
      selected.delete(el);
      btn.classList.remove("active");
    } else {
      selected.add(el);
      btn.classList.add("active");
    }
  });

  reactBtn.addEventListener("click", () => {
    if (selected.size < 2){
      output.innerHTML = `<p class="quiz-feedback">Select at least two elements first.</p>`;
      return;
    }
    const arr = [...selected].sort();
    const isFinal = FINAL_COMBO.length === arr.length && FINAL_COMBO.slice().sort().every((v,i) => v === arr[i]);

    let title = DEFAULT_REACTION;
    if (isFinal){
      title = FINAL_RESULT_TITLE;
    } else {
      for (const key in REACTIONS){
        const parts = key.split(",");
        if (parts.every(p => selected.has(p))){ title = REACTIONS[key]; break; }
      }
    }

    output.innerHTML = `
      <div class="result-card">
        <p class="result-title">${title}</p>
        ${isFinal ? `<p style="margin-top:8px;color:var(--ink-dim);font-size:0.85rem;">${FINAL_RESULT_SUB}</p>` : ""}
      </div>`;

    if (isFinal) burstConfetti();
  });
}

/* ============ SECRET EASTER EGG ============ */
function initSecretEgg(){
  const target = document.getElementById("secretTrigger");
  const reveal = document.getElementById("secretReveal");
  let clicks = 0;
  target.addEventListener("click", () => {
    clicks++;
    if (clicks >= 5){
      reveal.classList.remove("hidden");
      clicks = 0;
    }
  });
}

/* ============ MINI QUIZ ============ */
function initQuiz(){
  const progress = document.getElementById("quizProgress");
  const qEl = document.getElementById("quizQuestion");
  const choicesEl = document.getElementById("quizChoices");
  const feedback = document.getElementById("quizFeedback");
  const resultEl = document.getElementById("quizResult");
  const box = document.getElementById("quizBox");
  let i = 0;
  let locked = false;

  function render(){
    const item = QUIZ_QUESTIONS[i];
    progress.textContent = `Question ${i + 1} of ${QUIZ_QUESTIONS.length}`;
    qEl.textContent = item.q;
    feedback.textContent = "";
    choicesEl.innerHTML = "";
    locked = false;
    item.choices.forEach((c, idx) => {
      const b = document.createElement("button");
      b.className = "quiz-choice";
      b.textContent = c;
      b.addEventListener("click", () => handleAnswer(idx, b));
      choicesEl.appendChild(b);
    });
  }

  function handleAnswer(idx, btn){
    if (locked) return;
    locked = true;
    const item = QUIZ_QUESTIONS[i];
    const buttons = choicesEl.querySelectorAll(".quiz-choice");
    if (idx === item.answer){
      btn.classList.add("correct");
      feedback.textContent = item.right;
    } else {
      btn.classList.add("wrong");
      buttons[item.answer].classList.add("correct");
      feedback.textContent = "Not quite — but science rewards persistence.";
    }
    setTimeout(() => {
      i++;
      if (i >= QUIZ_QUESTIONS.length){
        box.classList.add("hidden");
        resultEl.classList.remove("hidden");
      } else {
        render();
      }
    }, 1200);
  }

  render();
}

/* ============ MYSTERY FILES ============ */
function initFiles(){
  const cards = document.querySelectorAll(".file-card");
  const modal = document.getElementById("fileModal");
  const modalText = document.getElementById("modalText");
  const closeBtn = document.getElementById("modalClose");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.dataset.file, 10);
      modalText.textContent = FILE_MESSAGES[idx];
      modal.classList.remove("hidden");
    });
  });
  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });
}

/* ============ CERTIFICATE DOWNLOAD ============ */
function initCertificate(){
  const btn = document.getElementById("claimBtn");
  const card = document.getElementById("certificateCard");
  btn.addEventListener("click", () => {
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    btn.textContent = "Certificate Claimed 💜 (right-click or screenshot to save)";
    burstConfetti();
    setTimeout(() => { btn.textContent = "Claim Certificate"; }, 3500);
  });
}

/* ============ FINAL REVEAL SEQUENCE ============ */
function initFinalReveal(){
  const section = document.getElementById("final");
  const seq = document.getElementById("finalSequence");
  const processing = document.getElementById("finalProcessing");
  const cake = document.getElementById("finalCake");
  const message = document.getElementById("finalMessage");
  let played = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !played){
        played = true;
        runSequence();
        observer.unobserve(section);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(section);

  function runSequence(){
    setTimeout(() => { processing.textContent = "Analysis complete."; }, 1000);
    setTimeout(() => { cake.classList.remove("hidden"); }, 1800);
    setTimeout(() => {
      seq.classList.add("hidden");
      message.classList.remove("hidden");
      burstConfetti();
    }, 2800);
  }
}

/* ============ CONFETTI BURST ============ */
function burstConfetti(){
  burstAt(window.innerWidth / 2, window.innerHeight / 2 + window.scrollY, 90);
}

function burstAt(originX, originY, count){
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";

  const originScreenY = originY - window.scrollY;
  const colors = ["#a855f7", "#f0abfc", "#8b5cf6", "#c4b5fd", "#fbbf24"];
  const pieces = Array.from({ length: count }, () => ({
    x: originX,
    y: originScreenY,
    vx: (Math.random() - 0.5) * 12,
    vy: (Math.random() - 1.4) * 12,
    size: Math.random() * 6 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * 360,
    vr: (Math.random() - 0.5) * 12,
    life: 0
  }));

  function frame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      p.life++;
      p.vy += 0.28;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      if (p.life < 90){
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - p.life / 90);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });
    if (alive) requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  frame();
}
