const maxCells = 3;
let currentPlayer = "X";
let xScore = 0;
let zeroScore = 0;
let gameOver = false;

const winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function createBoard() {
	const gameBoard = document.querySelector(".game-board");
	for (let i = 0; i < maxCells; ++i) {
		for (let j = 0; j < maxCells; ++j) {
			const spanForCell = document.createElement("span");
			spanForCell.classList.add("cell-css");
			gameBoard.appendChild(spanForCell);
		}
	}
}
createBoard();

function handleCellClick() {
	const gridCells = document.querySelectorAll(".cell-css");
	const message = document.getElementById("message");

	gridCells.forEach((cell) => {
		cell.addEventListener("click", (event) => {
			if (gameOver) return;

			if (event.target.textContent !== "") {
				message.textContent =
					"This cell is already used, choose another one";
				setTimeout(() => {
					message.textContent = "";
				}, 2000);
				return;
			}
			event.target.textContent = currentPlayer;
			checkWinner();

			if (!gameOver) {
				checkDraw();
				switchPlayer();
			}
		});
	});
}
handleCellClick();

function switchPlayer() {
	if (currentPlayer === "X") {
		currentPlayer = "0";
	} else {
		currentPlayer = "X";
	}
}

function checkWinner() {
	const gridCells = document.querySelectorAll(".cell-css");
	winningCombinations.forEach((combination) => {
		const cellA = gridCells[combination[0]];
		const cellB = gridCells[combination[1]];
		const cellC = gridCells[combination[2]];

		if (
			cellA.textContent !== "" &&
			cellA.textContent === cellB.textContent &&
			cellA.textContent === cellC.textContent
		) {
			cellA.classList.add("winning-cell");
			cellB.classList.add("winning-cell");
			cellC.classList.add("winning-cell");

			const winningPlayer = cellA.textContent;
			const message = (document.getElementById(
				"message"
			).textContent = `Player ${winningPlayer} wins`);
			gameOver = true;
		}
	});
}

function checkDraw() {
	const gridCells = document.querySelectorAll(".cell-css");
	let isDraw = true;

	gridCells.forEach((cell) => {
		if (cell.textContent === "") {
			isDraw = false;
		}
	});

	if (isDraw) {
		const message = document.getElementById("message");
		message.textContent = "It's a draw!";
		gameOver = true;
	}
}

function resetGame() {
	const gridCells = document.querySelectorAll(".cell-css");
	gridCells.forEach((cell) => {
		cell.textContent = "";
		cell.classList.remove("winning-cell");
	});
	document.getElementById("message").textContent = "";
	currentPlayer = "X";
	gameOver = false;
}
