export class SnakeGame {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.ctx = this.canvas.getContext('2d');
    
    this.gridSize = 20;
    this.snake = [{x: 200, y: 200}];
    this.food = this.generateFood();
    this.direction = 'right';
    this.gameSpeed = 100;
    this.score = 0;
    this.gameLoop = null;
    
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
    this.startGame();
  }

  startGame() {
    this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
  }

  update() {
    this.moveSnake();
    this.checkCollision();
    this.draw();
  }

  moveSnake() {
    const head = {...this.snake[0]};
    
    switch(this.direction) {
      case 'up': head.y -= this.gridSize; break;
      case 'down': head.y += this.gridSize; break;
      case 'left': head.x -= this.gridSize; break;
      case 'right': head.x += this.gridSize; break;
    }
    
    this.snake.unshift(head);
    
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score++;
      document.getElementById('score').textContent = this.score;
      this.food = this.generateFood();
    } else {
      this.snake.pop();
    }
  }

  checkCollision() {
    const head = this.snake[0];
    
    // Wall collision
    if (head.x < 0 || head.x >= this.canvas.width || 
        head.y < 0 || head.y >= this.canvas.height) {
      this.gameOver();
    }
    
    // Self collision
    for (let i = 1; i < this.snake.length; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        this.gameOver();
      }
    }
  }

  generateFood() {
    const x = Math.floor(Math.random() * (this.canvas.width / this.gridSize)) * this.gridSize;
    const y = Math.floor(Math.random() * (this.canvas.height / this.gridSize)) * this.gridSize;
    return {x, y};
  }

  draw() {
    // Clear canvas
    this.ctx.fillStyle = '#242424';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw snake
    this.ctx.fillStyle = '#00ff00';
    this.snake.forEach(segment => {
      this.ctx.fillRect(segment.x, segment.y, this.gridSize, this.gridSize);
    });
    
    // Draw food
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillRect(this.food.x, this.food.y, this.gridSize, this.gridSize);
  }

  handleKeyPress(e) {
    switch(e.key) {
      case 'ArrowUp': if (this.direction !== 'down') this.direction = 'up'; break;
      case 'ArrowDown': if (this.direction !== 'up') this.direction = 'down'; break;
      case 'ArrowLeft': if (this.direction !== 'right') this.direction = 'left'; break;
      case 'ArrowRight': if (this.direction !== 'left') this.direction = 'right'; break;
    }
  }

  gameOver() {
    clearInterval(this.gameLoop);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '40px Arial';
    this.ctx.fillText('Game Over!', 100, 200);
  }
}
