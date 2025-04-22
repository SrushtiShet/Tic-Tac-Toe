const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset');

let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = 
[
  [0,1,2], [3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8], 
  [0,4,8], [2,4,6]           
];

function handleClick(e) 
{
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winInfo = checkWinner();
  if (winInfo) 
  {
    winInfo.forEach(i => cells[i].classList.add("win"));
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes("")) 
  {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() 
{
  for (let combo of winningCombinations) 
  {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) 
      {
        return combo;
      }
  }
  return null;
}

function resetGame() 
{
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => 
  {
    cell.textContent = "";
    cell.classList.remove("win");
  });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);
