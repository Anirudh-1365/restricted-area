const grid = document.getElementById("grid");
const tiles = [...grid.children];
const verifyBtn = document.getElementById("verifyBtn");
const loginBox = document.getElementById("loginBox");
const loginBtn = document.getElementById("loginBtn");
const secretInput = document.getElementById("secretInput");
const loginMessage = document.getElementById("loginMessage");

const puzzleBox = document.getElementById("puzzleBox");
const questionBox = document.getElementById("questionBox");
const resultBox = document.getElementById("resultBox");


const nameInput = document.getElementById("nameInput");
const nameBtn = document.getElementById("nameBtn");
const secretSection = document.getElementById("secretSection");

const SECRET_NAME = "devanjali deb";

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const secretHint = document.getElementById("secretHint");
let wrongAttempts = 0;

const correctOrder = [
  "tile_1.jpg","tile_2.jpg","tile_3.jpg",
  "tile_4.jpg","tile_5.jpg","tile_6.jpg",
  "tile_7.jpg","tile_8.jpg","tile_9.jpg",
  "tile_10.jpg","tile_11.jpg","tile_12.jpg"
];

let firstTile = null;

nameBtn.onclick = () => {
  const enteredName = nameInput.value.trim().toLowerCase();

  if (!enteredName) {
    loginMessage.textContent = "You have to type your name first 😝";
    return;
  }

  if (enteredName === SECRET_NAME) {
    loginMessage.textContent = "Name verified 😌 Of course it’s you 💕";
    nameInput.classList.add("hidden");
    nameBtn.classList.add("hidden");
    secretSection.classList.remove("hidden");
  } else {
    loginMessage.textContent = "Hmm… that’s not my favorite person’s name 😏";
  }
};


const SECRET_WORD = "sharvari"; // change this to anything you want

loginBtn.onclick = () => {
  const value = secretInput.value.trim().toLowerCase();

  if (!value) {
    loginMessage.textContent = "You have to type something 😏";
    return;
  }

  if (value === SECRET_WORD) {
    loginMessage.textContent = "Access granted, my love 💖";
    launchConfetti(60);

    setTimeout(() => {
      loginBox.classList.add("hidden");
      puzzleBox.classList.remove("hidden");
    }, 1200);

  } else {
    wrongAttempts++;
    loginMessage.textContent = "Wrong password 😝 Try again cutie!";
    if (wrongAttempts >= 1) {
    secretHint.classList.remove("hidden");
    }
  }
};

/* ================= TAP & SWAP ================= */
tiles.forEach(tile => {
  tile.addEventListener("click", () => {
    if (!firstTile) {
      firstTile = tile;
      tile.classList.add("selected");
      return;
    }

    if (tile === firstTile) {
      tile.classList.remove("selected");
      firstTile = null;
      return;
    }

  const secondTile = tile;
const first = firstTile;

// swap sources
const temp = secondTile.src;
secondTile.src = first.src;
first.src = temp;

// force reflow (important for consistent animation)
void secondTile.offsetWidth;
void first.offsetWidth;

// add snap animation
secondTile.classList.add("snap");
first.classList.add("snap");

setTimeout(() => {
  secondTile.classList.remove("snap");
  first.classList.remove("snap");
}, 220);

first.classList.remove("selected");
firstTile = null;

  });
});

/* ================= VERIFY ================= */
verifyBtn.onclick = () => {
  const current = tiles.map(t => t.src.split("/").pop());
  if (JSON.stringify(current) === JSON.stringify(correctOrder)) {
  showSuccess();
}

  else {
    showWarning();
  }
};

/* ================= WRONG WARNING ================= */
function showWarning() {
  // 📳 vibration
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200]);
  }

  // 🔊 buzzer
  const buzzer = new Audio("sounds/buzzer.mp3");
  buzzer.play();

  // ❌ cross
  const cross = document.createElement("div");
  cross.className = "wrong-cross";
  cross.textContent = "✖";
  document.body.appendChild(cross);

  setTimeout(() => cross.remove(), 800);

  // 💋 cute text
  setTimeout(() => {
    const warning = document.createElement("div");
    warning.textContent = "You owe me 2 kisses now 😂💋";

    warning.style.position = "fixed";
    warning.style.bottom = "30px";
    warning.style.left = "50%";
    warning.style.transform = "translateX(-50%)";
    warning.style.background = "#ff4f8b";
    warning.style.color = "white";
    warning.style.padding = "14px 22px";
    warning.style.borderRadius = "30px";
    warning.style.fontFamily = "'Pacifico', cursive";
    warning.style.fontSize = "1.3rem";
    warning.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
    warning.style.zIndex = "9999";

    document.body.appendChild(warning);
    setTimeout(() => warning.remove(), 2500);
  }, 850);
}
function launchConfetti(amount = 80) {
  for (let i = 0; i < amount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.background =
      `hsl(${Math.random() * 360}, 100%, 60%)`;

    confetti.style.animationDuration =
      (2 + Math.random() * 2) + "s";

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 4000);
  }
}

function showSuccess() {

  // 🌈 Curved Great Job text using SVG
  const popup = document.createElement("div");
  popup.className = "success-popup";

  popup.innerHTML = `
    <svg viewBox="0 0 500 200">
      <path id="curve" d="M 50 150 Q 250 20 450 150" fill="transparent"/>
      <text text-anchor="middle" font-size="48" font-family="Pacifico" fill="red">
        <textPath href="#curve" startOffset="50%">
          Great Job!
        </textPath>
      </text>
    </svg>
  `;

  document.body.appendChild(popup);

  // 🎊 Confetti
  launchConfetti(80);


  // After 2 seconds move to question screen
  setTimeout(() => {
    popup.remove();
    puzzleBox.classList.add("hidden");
    questionBox.classList.remove("hidden");
  }, 2000);
}

/* ================= YES ================= */
yesBtn.onclick = () => {
  questionBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  launchConfetti(120);
};

/* ================= NO RUNS ================= */
noBtn.addEventListener("pointerenter", () => {
  const x = Math.random() * (window.innerWidth - 120);
  const y = Math.random() * (window.innerHeight - 60);
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
});

/* ================= HEART SPAWNER ================= */
const heartBox = document.querySelector("#questionBox .heart-confetti");

setInterval(() => {
  if (!heartBox || questionBox.classList.contains("hidden")) return;

  const heart = document.createElement("span");
  heart.textContent = "💗";

  const edge = Math.floor(Math.random() * 4);
  if (edge === 0) { heart.style.top = "0%"; heart.style.left = Math.random()*100+"%"; }
  else if (edge === 1) { heart.style.top = "100%"; heart.style.left = Math.random()*100+"%"; }
  else if (edge === 2) { heart.style.left = "0%"; heart.style.top = Math.random()*100+"%"; }
  else { heart.style.left = "100%"; heart.style.top = Math.random()*100+"%"; }

  heart.style.setProperty("--x", Math.random());
  heart.style.setProperty("--y", Math.random());

  heartBox.appendChild(heart);
  setTimeout(() => heart.remove(), 6500);
}, 350);
