document.addEventListener('DOMContentLoaded', () => {
	// Get references to DOM elements
	const colorBox = document.getElementById('colorBox'); // The box showing the target color
	const options = document.querySelectorAll('.color-option'); // The color options (buttons) for the player to click
	const gameStatus = document.getElementById('gameStatus'); // The status text to display whether the guess is correct or not
	const scoreDisplay = document.getElementById('score'); // The element that displays the current score
	const newGameButton = document.getElementById('newGameButton'); // The button to start a new game

	let score = 0; // Initialize the score variable to 0
	let targetColor = ''; // This will store the randomly selected target color for the round

	// Function to generate a random color in the format rgb(r, g, b)
	function getRandomColor() {
		const r = Math.floor(Math.random() * 256); // Random red value (0-255)
		const g = Math.floor(Math.random() * 256); // Random green value (0-255)
		const b = Math.floor(Math.random() * 256); // Random blue value (0-255)
		return `rgb(${r}, ${g}, ${b})`; // Return the color in RGB format
	}

	// Function to start a new game by picking a new target color and setting up the color options
	function startNewGame() {
		targetColor = getRandomColor(); // Get a new random target color
		colorBox.style.backgroundColor = targetColor; // Set the target color to be displayed in the color box

		const randomIndex = Math.floor(Math.random() * options.length); // Select a random index to assign the target color

		options.forEach((button, index) => {
			const color = getRandomColor(); // Generate a random color for each button
			button.style.backgroundColor = color; // Set the background color of the button
			button.dataset.color = color; // Store the color value in a data attribute of the button
			if (index === randomIndex) {
				// If the button index matches the random index
				button.style.backgroundColor = targetColor; // Set this button's color to the target color
				button.dataset.color = targetColor; // Store the target color in the button's data attribute
			}
		});

		gameStatus.textContent = 'Make your guess!'; // Update the status text to prompt the player to guess
		gameStatus.style.color = 'black'; // Set the status text color back to black
	}

	// Event listener for each color option button
	options.forEach((button) => {
		button.addEventListener('click', () => {
			// Remove previous animation classes to restart animations
			gameStatus.classList.remove('fade-out', 'celebrate');

			if (button.dataset.color === targetColor) {
				// If the clicked button's color matches the target color
				gameStatus.textContent = 'Correct!';
				gameStatus.style.color = 'green';
				gameStatus.classList.add('celebrate'); // Add the celebration animation
				score++;
				scoreDisplay.textContent = score;

				setTimeout(() => {
					gameStatus.classList.remove('celebrate'); // Reset the animation class
					startNewGame(); // Start a new game
				}, 1000);
			} else {
				gameStatus.textContent = 'Wrong! Try again.';
				gameStatus.style.color = 'red';
				gameStatus.classList.add('fade-out'); // Add the fade-out animation

				setTimeout(() => {
					gameStatus.classList.remove('fade-out'); // Reset the animation class
					gameStatus.textContent = 'Make your guess'; // Reset to default message
					gameStatus.style.color = 'black'; // Reset text color
				}, 1000);
			}
		});
	});

	// Event listener for the "New Game" button to reset the score and start a fresh game
	newGameButton.addEventListener('click', () => {
		score = 0; // Reset the score to 0
		scoreDisplay.textContent = score; // Update the score display to reflect the reset
		startNewGame(); // Start a new game with a fresh color combination
	});

	startNewGame(); // Start the first game when the page loads
});
