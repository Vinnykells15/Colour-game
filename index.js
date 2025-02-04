const colorBox = document.getElementById("colorBox");
const colorOptions = document.getElementById("colorOptions");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let score = 0;
let correctColor = "";

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateColors() {
  const colors = [];
  for (let i = 0; i < 6; i++) {
    colors.push(getRandomColor());
  }
  return colors;
}

function setupGame() {
  const colors = generateColors();
  correctColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = correctColor;

  colorOptions.innerHTML = "";
  colors.forEach((color) => {
    const button = document.createElement("button");
    button.classList.add("colorOption");
    button.style.backgroundColor = color;
    button.dataset.testid = "colorOption";
    button.addEventListener("click", () => checkGuess(color));
    colorOptions.appendChild(button);
  });

  gameStatus.textContent = "";
  gameStatus.className = "";
}

function checkGuess(selectedColor) {
  if (selectedColor === correctColor) {
    gameStatus.textContent = "Correct!";
    gameStatus.className = "correct";

    score++;
    scoreDisplay.textContent = `Score: ${score}`;

    setTimeout(() => {
      gameStatus.textContent = "";
      setupGame();
    }, 1000);
  } else {
    gameStatus.textContent = "Wrong! Try again.";
    gameStatus.className = "wrong";

    setTimeout(() => {
      gameStatus.textContent = "";
      gameStatus.className = "";
    }, 500);
  }
}

newGameButton.addEventListener("click", () => {
  score = 0;
  scoreDisplay.textContent = "Score: 0";
  setupGame();
});

setupGame();
