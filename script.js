// my game configuration
const GOAL_CANS = 20;

let score = 0;
let timeLeft = 30;
let gameActive = false;
let spawnInterval;
let timerInterval;

// spawn grid
function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    grid.appendChild(cell);
  }
}

// spawn the water can
function spawnWaterCan() {
  if (!gameActive) return;

  const cells = document.querySelectorAll('.grid-cell');

  // reset the cells
  cells.forEach(cell => (cell.innerHTML = ''));

  const randomCell = cells[Math.floor(Math.random() * cells.length)];

  // pick dirty water or clean
  const isClean = Math.random() < 0.7;

  const typeClass = isClean ? "clean" : "dirty";

  randomCell.innerHTML = `
    <div class="water-can-wrapper ${typeClass}">
      <div class="water-can"></div>
    </div>
  `;

  const can = randomCell.querySelector('.water-can-wrapper');

  can.onclick = function () {
    if (!gameActive) return;

    if (isClean) {
      score++;
    } else {
      score--;
    }

    document.getElementById('current-cans').textContent = score;

    randomCell.innerHTML = '';

    checkWin();
  };
}

// timer? doesnt really work but it should NOW!
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame("⏰ Time’s up!");
    }
  }, 1000);
}

// start da game
function startGame() {
  if (gameActive) return;

  score = 0;
  timeLeft = 30;
  gameActive = true;

  document.getElementById('current-cans').textContent = score;
  document.getElementById('timer').textContent = timeLeft;
  document.getElementById('achievements').textContent = "";

  createGrid();

  spawnInterval = setInterval(spawnWaterCan, 800);
  startTimer();
}

// check the win
function checkWin() {
  if (score >= GOAL_CANS) {
    endGame("🎉 You provided clean water to a community!");
  }
}

// end the game
function endGame(message) {
  gameActive = false;
  clearInterval(spawnInterval);
  clearInterval(timerInterval);

  document.getElementById('achievements').textContent = message;
}

// reset game
function resetGame() {
  gameActive = false;
  clearInterval(spawnInterval);
  clearInterval(timerInterval);

  score = 0;
  timeLeft = 30;

  document.getElementById('current-cans').textContent = score;
  document.getElementById('timer').textContent = timeLeft;
  document.getElementById('achievements').textContent = "";

  createGrid();
}

// the event listeners
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('reset-game').addEventListener('click', resetGame);

// start grid on load
createGrid();