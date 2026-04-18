let score = 0;
let timeLeft = 30;
let gameActive = false;
let spawnInterval;
let timerInterval;
let difficulty = "normal";
let scoreGoal = 20;

// Create grid
function createGrid() {
  const grid = document.querySelector(".game-grid");
  grid.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "grid-cell";
    grid.appendChild(cell);
  }
}

createGrid();

// Difficulty system
function setDifficulty(level) {
  difficulty = level;

  if (level === "easy") {
    timeLeft = 40;
    scoreGoal = 15;
  }

  if (level === "normal") {
    timeLeft = 30;
    scoreGoal = 20;
  }

  if (level === "hard") {
    timeLeft = 20;
    scoreGoal = 25;
  }

  document.getElementById("timer").textContent = timeLeft;
}

// Update score display
function updateScore() {
  document.getElementById("current-cans").textContent = score;
  checkWin();
  checkMilestones();
}

// the milestone
function checkMilestones() {
  const message = document.getElementById("achievements");

  if (score === 5) message.textContent = "good start yo!";
  if (score === 10) message.textContent = "yo halfway there!";
  if (score === 15) message.textContent = "cmon almost there!";
}

// win condition statement
function checkWin() {
  if (score >= scoreGoal) {
    endGame();
    document.getElementById("achievements").textContent =
      "🎉 You completed your water mission!";
  }
}

// spawn the items
function spawnItem() {
  if (!gameActive) return;

  const cells = document.querySelectorAll(".grid-cell");

  cells.forEach(cell => (cell.innerHTML = ""));

  const randomCell = cells[Math.floor(Math.random() * cells.length)];

  // Random chance for da doo doo waterrrr i shouldve made it harder
  const isDirty = Math.random() < 0.2;

  const item = document.createElement("div");
  item.className = "water-can";

  if (isDirty) {
    item.style.backgroundColor = "red";
    item.dataset.type = "dirty";
  } else {
    item.dataset.type = "clean";
  }

  item.addEventListener("click", () => {
    if (item.dataset.type === "clean") {
      score++;
    } else {
      score--;
    }

    updateScore();
    item.remove();
  });

  randomCell.appendChild(item);
}

// timer works now woooo!
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// start the game
function startGame() {
  if (gameActive) return;

  gameActive = true;
  score = 0;

  updateScore();

  createGrid();

  spawnInterval = setInterval(spawnItem, 800);
  startTimer();
}

// the end of game
function endGame() {
  gameActive = false;

  clearInterval(spawnInterval);
  clearInterval(timerInterval);

  document.getElementById("achievements").textContent =
    "Game Over! Your final score: " + score;
}

// reset the game
function resetGame() {
  endGame();
  score = 0;
  timeLeft = 30;

  document.getElementById("timer").textContent = timeLeft;
  document.getElementById("current-cans").textContent = score;
  document.getElementById("achievements").textContent = "";
  createGrid();
}

// going to be listener
document.getElementById("start-game").addEventListener("click", startGame);