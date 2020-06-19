const startGameBtn = document.getElementById('start-game-btn');
const ROCK = 'ROCK';
const SCISSORS = 'SCISSORS';
const PAPER = 'PAPER';
const RESULT_DRAW = 'Draw';
const RESULT_COMPUTER_WINS = 'Computer wins';
const RESULT_PLAYER_WINS = 'Player wins';
const DEFAULT_CHOICE = ROCK;
let gameIsRunning = false;
const getPlayerChoice = () => {
  const selection = prompt(
    `Do you choose ${ROCK}, ${PAPER} or ${SCISSORS}`,
    ''
  ).toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(
      `You have given an invalid input, not to worry we have chosen your default as ${DEFAULT_CHOICE}!!`
    );
    return;
  }
  return selection;
};

const getWinner = (cChoice, pChoice = DEFAULT_CHOICE) =>
  cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoice === PAPER) ||
      (cChoice === PAPER && pChoice === SCISSORS) ||
      (cChoice === SCISSORS && pChoice === ROCK)
    ? RESULT_PLAYER_WINS
    : RESULT_COMPUTER_WINS;

const computerChoice = () => {
  let randomNumber = Math.random();
  if (randomNumber < 0.34) {
    return ROCK;
  } else if (randomNumber < 0.72) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};
startGameBtn.addEventListener('click', () => {
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  console.log('Game is starting...');
  const playerSelection = getPlayerChoice();
  const computerSelection = computerChoice();
  let winner;
  if (playerSelection) {
    winner = getWinner(computerSelection, playerSelection);
  } else {
    winner = getWinner(computerSelection);
  }
  let message = `You chose ${(playerSelection) || DEFAILT_CHOICE} and the computer chose ${computerSelection}, so you `;
  if (winner === RESULT_DRAW) {
    message = message + `have a draw.`;
  } else if (winner === RESULT_PLAYER_WINS) {   
    message = message + `won.`;
  } else {
    message = message + `lost.`;
  }
  alert(message);
  gameIsRunning = false;
});
