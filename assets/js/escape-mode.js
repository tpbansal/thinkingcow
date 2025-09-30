class EscapeMode {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 400;
        this.canvas.height = 400;

        // Start with larger grid for easier first levels
        this.gridSize = 40;
        this.playerSize = this.gridSize / 2;

        // Game state
        this.gameState = 'menu'; // menu, playing, paused, gameOver
        this.level = 1;
        this.score = 0;
        this.moves = 0;
        this.bestMoves = localStorage.getItem('escapeMode_bestMoves') || null;
        this.optimalMoves = 0;
        this.showingHint = false;

        // Player and goal
        this.player = { x: 0, y: 0 };
        this.goal = { x: this.canvas.width - this.gridSize, y: this.canvas.height - this.gridSize };

        // Touch handling
        this.touchStartX = 0;
        this.touchStartY = 0;

        // Maze data
        this.maze = [];
        this.mazeWidth = this.canvas.width / this.gridSize;
        this.mazeHeight = this.canvas.height / this.gridSize;
        this.optimalPath = [];

        this.initializeElements();
        this.initializeEventListeners();
        this.generateMaze();
        this.startGame();
    }

    initializeElements() {
        this.scoreElement = document.getElementById('score');
        this.levelElement = document.getElementById('level');
        this.movesElement = document.getElementById('moves');
        this.bestMovesElement = document.getElementById('bestMoves');
        this.gridInfoElement = document.getElementById('gridInfo');
        this.difficultyElement = document.getElementById('difficulty');

        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.gameOverTitle = document.getElementById('gameOverTitle');
        this.movesUsedElement = document.getElementById('movesUsed');
        this.optimalMovesElement = document.getElementById('optimalMoves');
        this.moveBonusElement = document.getElementById('moveBonus');
        this.finalScoreElement = document.getElementById('finalScore');

        this.newGameBtn = document.getElementById('newGameBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.hintBtn = document.getElementById('hintBtn');
        this.playAgainBtn = document.getElementById('playAgainBtn');
    }

    initializeEventListeners() {
        // Keyboard controls
        window.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Touch controls
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        // Button controls
        this.newGameBtn.addEventListener('click', () => this.startNewGame());
        this.restartBtn.addEventListener('click', () => this.restartLevel());
        this.hintBtn.addEventListener('click', () => this.toggleHint());
        this.playAgainBtn.addEventListener('click', () => this.nextLevel());

        // Prevent default touch behavior
        this.canvas.addEventListener('touchmove', (e) => e.preventDefault());
    }

    generateMaze() {
        // Initialize maze grid
        this.maze = [];
        for (let y = 0; y < this.mazeHeight; y++) {
            this.maze[y] = [];
            for (let x = 0; x < this.mazeWidth; x++) {
                this.maze[y][x] = {
                    walls: { top: true, right: true, bottom: true, left: true },
                    visited: false
                };
            }
        }

        // Generate maze using recursive backtracking
        this.generateMazeRecursive(0, 0);

        // Clear additional paths for easier navigation on early levels
        if (this.level <= 5) {
            // Add more paths to make first 5 levels easier
            const extraPaths = Math.max(1, 6 - this.level);
            for (let i = 0; i < extraPaths; i++) {
                this.addRandomPaths();
            }
        } else if (this.level > 5) {
            // Add some complexity for later levels
            this.addRandomPaths();
        }

        // Calculate optimal path length
        this.calculateOptimalPath();
    }

    generateMazeRecursive(x, y) {
        this.maze[y][x].visited = true;
        const neighbors = this.getUnvisitedNeighbors(x, y);

        while (neighbors.length > 0) {
            const randomIndex = Math.floor(Math.random() * neighbors.length);
            const neighbor = neighbors[randomIndex];

            if (!this.maze[neighbor.y][neighbor.x].visited) {
                this.removeWall(x, y, neighbor.x, neighbor.y);
                this.generateMazeRecursive(neighbor.x, neighbor.y);
            }

            neighbors.splice(randomIndex, 1);
        }
    }

    getUnvisitedNeighbors(x, y) {
        const neighbors = [];

        // Check all four directions
        if (y > 0 && !this.maze[y - 1][x].visited) {
            neighbors.push({ x, y: y - 1, direction: 'top' });
        }
        if (x < this.mazeWidth - 1 && !this.maze[y][x + 1].visited) {
            neighbors.push({ x: x + 1, y, direction: 'right' });
        }
        if (y < this.mazeHeight - 1 && !this.maze[y + 1][x].visited) {
            neighbors.push({ x, y: y + 1, direction: 'bottom' });
        }
        if (x > 0 && !this.maze[y][x - 1].visited) {
            neighbors.push({ x: x - 1, y, direction: 'left' });
        }

        return neighbors;
    }

    removeWall(x1, y1, x2, y2) {
        if (x1 === x2) {
            if (y1 < y2) {
                this.maze[y1][x1].walls.bottom = false;
                this.maze[y2][x2].walls.top = false;
            } else {
                this.maze[y1][x1].walls.top = false;
                this.maze[y2][x2].walls.bottom = false;
            }
        } else {
            if (x1 < x2) {
                this.maze[y1][x1].walls.right = false;
                this.maze[y2][x2].walls.left = false;
            } else {
                this.maze[y1][x1].walls.left = false;
                this.maze[y2][x2].walls.right = false;
            }
        }
    }

    addRandomPaths() {
        const pathsToAdd = Math.floor(this.level / 2) + 1;

        for (let i = 0; i < pathsToAdd; i++) {
            const x = Math.floor(Math.random() * this.mazeWidth);
            const y = Math.floor(Math.random() * this.mazeHeight);
            const direction = Math.floor(Math.random() * 4);

            let targetX = x, targetY = y;

            switch (direction) {
                case 0: // top
                    if (y > 0) {
                        targetY = y - 1;
                        this.maze[y][x].walls.top = false;
                        this.maze[targetY][targetX].walls.bottom = false;
                    }
                    break;
                case 1: // right
                    if (x < this.mazeWidth - 1) {
                        targetX = x + 1;
                        this.maze[y][x].walls.right = false;
                        this.maze[targetY][targetX].walls.left = false;
                    }
                    break;
                case 2: // bottom
                    if (y < this.mazeHeight - 1) {
                        targetY = y + 1;
                        this.maze[y][x].walls.bottom = false;
                        this.maze[targetY][targetX].walls.top = false;
                    }
                    break;
                case 3: // left
                    if (x > 0) {
                        targetX = x - 1;
                        this.maze[y][x].walls.left = false;
                        this.maze[targetY][targetX].walls.right = false;
                    }
                    break;
            }
        }
    }

    drawMaze() {
        this.ctx.strokeStyle = "#ff00ff";
        this.ctx.lineWidth = 2;

        for (let y = 0; y < this.mazeHeight; y++) {
            for (let x = 0; x < this.mazeWidth; x++) {
                const cellX = x * this.gridSize;
                const cellY = y * this.gridSize;
                const cell = this.maze[y][x];

                if (cell.walls.top) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(cellX, cellY);
                    this.ctx.lineTo(cellX + this.gridSize, cellY);
                    this.ctx.stroke();
                }
                if (cell.walls.right) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(cellX + this.gridSize, cellY);
                    this.ctx.lineTo(cellX + this.gridSize, cellY + this.gridSize);
                    this.ctx.stroke();
                }
                if (cell.walls.bottom) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(cellX + this.gridSize, cellY + this.gridSize);
                    this.ctx.lineTo(cellX, cellY + this.gridSize);
                    this.ctx.stroke();
                }
                if (cell.walls.left) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(cellX, cellY + this.gridSize);
                    this.ctx.lineTo(cellX, cellY);
                    this.ctx.stroke();
                }
            }
        }
    }

    drawPlayer() {
        this.ctx.fillStyle = "#00ff00";
        this.ctx.fillRect(
            this.player.x + this.gridSize / 4,
            this.player.y + this.gridSize / 4,
            this.playerSize,
            this.playerSize
        );

        // Add player glow effect
        this.ctx.shadowColor = "#00ff00";
        this.ctx.shadowBlur = 10;
        this.ctx.fillRect(
            this.player.x + this.gridSize / 4,
            this.player.y + this.gridSize / 4,
            this.playerSize,
            this.playerSize
        );
        this.ctx.shadowBlur = 0;
    }

    drawGoal() {
        this.ctx.fillStyle = "#ff0000";
        this.ctx.fillRect(
            this.goal.x + this.gridSize / 4,
            this.goal.y + this.gridSize / 4,
            this.playerSize,
            this.playerSize
        );

        // Add goal pulse effect
        const pulse = Math.sin(Date.now() * 0.01) * 0.5 + 0.5;
        this.ctx.shadowColor = "#ff0000";
        this.ctx.shadowBlur = 15 * pulse;
        this.ctx.fillRect(
            this.goal.x + this.gridSize / 4,
            this.goal.y + this.gridSize / 4,
            this.playerSize,
            this.playerSize
        );
        this.ctx.shadowBlur = 0;
    }

    canMoveTo(x, y) {
        // Check boundaries
        if (x < 0 || x >= this.canvas.width || y < 0 || y >= this.canvas.height) {
            return false;
        }

        // Get current and target cell positions
        const currentCellX = Math.floor(this.player.x / this.gridSize);
        const currentCellY = Math.floor(this.player.y / this.gridSize);
        const targetCellX = Math.floor(x / this.gridSize);
        const targetCellY = Math.floor(y / this.gridSize);

        // Check if moving to the same cell
        if (currentCellX === targetCellX && currentCellY === targetCellY) {
            return true;
        }

        // Check walls
        const currentCell = this.maze[currentCellY][currentCellX];

        if (targetCellX > currentCellX && currentCell.walls.right) return false;
        if (targetCellX < currentCellX && currentCell.walls.left) return false;
        if (targetCellY > currentCellY && currentCell.walls.bottom) return false;
        if (targetCellY < currentCellY && currentCell.walls.top) return false;

        return true;
    }

    handleKeyPress(e) {
        if (this.gameState !== 'playing') return;

        let newX = this.player.x;
        let newY = this.player.y;

        switch (e.key) {
            case 'ArrowUp':
                newY -= this.gridSize;
                break;
            case 'ArrowDown':
                newY += this.gridSize;
                break;
            case 'ArrowLeft':
                newX -= this.gridSize;
                break;
            case 'ArrowRight':
                newX += this.gridSize;
                break;
            case ' ':
                this.toggleHint();
                return;
            default:
                return;
        }

        e.preventDefault();

        if (this.canMoveTo(newX, newY)) {
            this.player.x = newX;
            this.player.y = newY;
            this.moves++;
            this.updateDisplay();
            this.checkWinCondition();
        }
    }

    handleTouchStart(e) {
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        this.touchStartX = touch.clientX - rect.left;
        this.touchStartY = touch.clientY - rect.top;
    }

    handleTouchEnd(e) {
        if (this.gameState !== 'playing') return;

        const touch = e.changedTouches[0];
        const rect = this.canvas.getBoundingClientRect();
        const touchEndX = touch.clientX - rect.left;
        const touchEndY = touch.clientY - rect.top;

        const deltaX = touchEndX - this.touchStartX;
        const deltaY = touchEndY - this.touchStartY;
        const minSwipeDistance = 30;

        if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
            return;
        }

        let newX = this.player.x;
        let newY = this.player.y;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 0) {
                newX += this.gridSize; // Right
            } else {
                newX -= this.gridSize; // Left
            }
        } else {
            // Vertical swipe
            if (deltaY > 0) {
                newY += this.gridSize; // Down
            } else {
                newY -= this.gridSize; // Up
            }
        }

        if (this.canMoveTo(newX, newY)) {
            this.player.x = newX;
            this.player.y = newY;
            this.moves++;
            this.updateDisplay();
            this.checkWinCondition();
        }
    }

    calculateOptimalPath() {
        // Use BFS to find shortest path and store the actual path
        const startCell = { x: 0, y: 0 };
        const goalCell = { x: this.mazeWidth - 1, y: this.mazeHeight - 1 };

        const queue = [{ ...startCell, distance: 0, path: [startCell] }];
        const visited = new Set();
        visited.add(`${startCell.x},${startCell.y}`);

        while (queue.length > 0) {
            const current = queue.shift();

            if (current.x === goalCell.x && current.y === goalCell.y) {
                this.optimalMoves = current.distance;
                this.optimalPath = current.path;
                return;
            }

            // Check all four directions
            const directions = [
                { dx: 0, dy: -1, wall: 'top' },
                { dx: 1, dy: 0, wall: 'right' },
                { dx: 0, dy: 1, wall: 'bottom' },
                { dx: -1, dy: 0, wall: 'left' }
            ];

            for (const dir of directions) {
                const newX = current.x + dir.dx;
                const newY = current.y + dir.dy;
                const key = `${newX},${newY}`;

                if (newX >= 0 && newX < this.mazeWidth &&
                    newY >= 0 && newY < this.mazeHeight &&
                    !visited.has(key) &&
                    !this.maze[current.y][current.x].walls[dir.wall]) {

                    visited.add(key);
                    queue.push({
                        x: newX,
                        y: newY,
                        distance: current.distance + 1,
                        path: [...current.path, { x: newX, y: newY }]
                    });
                }
            }
        }

        this.optimalMoves = 999; // No path found
        this.optimalPath = [];
    }

    toggleHint() {
        this.showingHint = !this.showingHint;
        this.hintBtn.textContent = this.showingHint ? 'Hide Path' : 'Show Path';
    }

    checkWinCondition() {
        if (this.player.x === this.goal.x && this.player.y === this.goal.y) {
            this.levelComplete();
        }
    }

    levelComplete() {
        // Simple scoring - just add points for completing level
        this.score += 100;

        // Update best moves if applicable
        if (!this.bestMoves || this.moves < this.bestMoves) {
            this.bestMoves = this.moves;
            localStorage.setItem('escapeMode_bestMoves', this.bestMoves);
        }

        // Show completion screen
        this.showLevelComplete();
    }

    showLevelComplete() {
        this.movesUsedElement.textContent = this.moves;
        this.optimalMovesElement.textContent = this.optimalMoves;
        this.moveBonusElement.textContent = '100';
        this.finalScoreElement.textContent = this.score;

        this.gameOverTitle.textContent = 'Level Complete!';
        this.gameOverScreen.style.display = 'block';
        this.gameState = 'levelComplete';
    }

    nextLevel() {
        this.level++;
        this.moves = 0;

        // Adjust grid size based on level for progression
        if (this.level <= 5) {
            // Keep larger grids for first 5 levels (easier)
            this.gridSize = Math.max(20, 50 - (this.level * 6));
        } else {
            // Gradually decrease grid size for difficulty
            this.gridSize = Math.max(10, 20 - Math.floor((this.level - 5) / 2));
        }

        this.mazeWidth = this.canvas.width / this.gridSize;
        this.mazeHeight = this.canvas.height / this.gridSize;
        this.playerSize = this.gridSize / 2;

        // Reset positions
        this.player = { x: 0, y: 0 };
        this.goal = {
            x: this.canvas.width - this.gridSize,
            y: this.canvas.height - this.gridSize
        };

        // Generate new maze
        this.generateMaze();
        this.gameOverScreen.style.display = 'none';
        this.gameState = 'playing';
        this.showingHint = false;
        this.hintBtn.textContent = 'Show Path';
        this.updateDisplay();
    }

    startGame() {
        this.gameState = 'playing';
        this.updateDisplay();
        this.gameLoop();
    }

    startNewGame() {
        this.gameState = 'playing';
        this.level = 1;
        this.score = 0;
        this.moves = 0;
        this.gridSize = 40; // Start with larger grid
        this.mazeWidth = this.canvas.width / this.gridSize;
        this.mazeHeight = this.canvas.height / this.gridSize;
        this.playerSize = this.gridSize / 2;

        this.player = { x: 0, y: 0 };
        this.goal = {
            x: this.canvas.width - this.gridSize,
            y: this.canvas.height - this.gridSize
        };

        this.generateMaze();
        this.gameOverScreen.style.display = 'none';
        this.showingHint = false;
        this.hintBtn.textContent = 'Show Path';
        this.updateDisplay();
    }

    restartLevel() {
        this.player = { x: 0, y: 0 };
        this.moves = 0;
        this.gameState = 'playing';
        this.showingHint = false;
        this.hintBtn.textContent = 'Show Path';
        this.updateDisplay();
    }


    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.levelElement.textContent = this.level;
        this.movesElement.textContent = this.moves;
        this.bestMovesElement.textContent = this.bestMoves || '--';
        this.gridInfoElement.textContent = `${this.mazeWidth}x${this.mazeHeight}`;

        // Update difficulty based on level
        let difficulty = 'Beginner';
        if (this.level >= 10) difficulty = 'Expert';
        else if (this.level >= 6) difficulty = 'Advanced';
        else if (this.level >= 3) difficulty = 'Intermediate';

        this.difficultyElement.textContent = difficulty;
    }

    drawOptimalPath() {
        if (!this.showingHint || this.optimalPath.length === 0) return;

        this.ctx.strokeStyle = "rgba(255, 255, 0, 0.6)";
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = "round";

        this.ctx.beginPath();
        for (let i = 0; i < this.optimalPath.length; i++) {
            const cell = this.optimalPath[i];
            const x = cell.x * this.gridSize + this.gridSize / 2;
            const y = cell.y * this.gridSize + this.gridSize / 2;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.stroke();

        // Draw path dots
        this.ctx.fillStyle = "rgba(255, 255, 0, 0.8)";
        for (const cell of this.optimalPath) {
            const x = cell.x * this.gridSize + this.gridSize / 2;
            const y = cell.y * this.gridSize + this.gridSize / 2;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gameState === 'playing' || this.gameState === 'paused' || this.gameState === 'levelComplete') {
            this.drawMaze();
            this.drawOptimalPath();
            this.drawGoal();
            this.drawPlayer();
        }
    }

    gameLoop() {
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EscapeMode();
});