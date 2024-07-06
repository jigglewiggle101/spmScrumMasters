// src/menu.js

const leaderboard = [
    { username: 'User1', points: 1000, coins: 10 },
    { username: 'User2', points: 900, coins: 20 },
    { username: 'User3', points: 800, coins: 30 },
    // More users can be added dynamically
];

// Function to navigate to a different page
function navigateTo(page) {
    window.location.href = page;
}

// Function to load a saved game
function loadSavedGame() {
    alert("Loading saved game...");
    // Implement the logic to load a saved game
}

// Function to display high scores (leaderboard)
function displayHighScores() {
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('leaderboard').style.display = 'block';

    const leaderboardBody = document.getElementById('leaderboard-body');
    leaderboardBody.innerHTML = '';
    leaderboard.slice(0, 10).forEach(user => {  // Display only the top 10 users
        const row = document.createElement('tr');
        row.innerHTML = `<td>${user.username}</td><td>${user.points}</td><td>${user.coins}</td>`;
        leaderboardBody.appendChild(row);
    });
}

// Function to exit the game
function exitGame() {
    alert("Exiting game...");
    // Implement the logic to exit the game
}

// Function to navigate back to the main menu from the leaderboard
function goToMainMenu() {
    document.getElementById('leaderboard').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
}

// Initial setup: hide the leaderboard
document.getElementById('leaderboard').style.display = 'none';

