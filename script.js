
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let coinImg = new Image();
coinImg.src = 'https://i.ibb.co/xCqN4tb/coin.png';

let bombImg = new Image();
bombImg.src = 'https://i.ibb.co/yNGbyyM/bomb.png';

let player = { x: canvas.width / 2 - 25, y: canvas.height - 60, width: 50, height: 50, speed: 10 };
let coins = [];
let bombs = [];
let score = 0;
let gameOver = false;

let coinSound = new Audio('https://www.fesliyanstudios.com/play-mp3/387');
let bombSound = new Audio('https://www.fesliyanstudios.com/play-mp3/399');

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') player.x -= player.speed;
  if (e.key === 'ArrowRight') player.x += player.speed;
});

function spawnCoin() {
  coins.push({ x: Math.random() * (canvas.width - 30), y: -30, size: 30 });
}

function spawnBomb() {
  bombs.push({ x: Math.random() * (canvas.width - 30), y: -30, size: 30 });
}

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.fillText('Score: ' + score, 10, 30);

  // Draw player
  ctx.fillStyle = '#444';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Update coins
  coins.forEach((coin, index) => {
    coin.y += 4;
    ctx.drawImage(coinImg, coin.x, coin.y, coin.size, coin.size);

    if (coin.y > canvas.height) coins.splice(index, 1);

    if (
      coin.x < player.x + player.width &&
      coin.x + coin.size > player.x &&
      coin.y < player.y + player.height &&
      coin.y + coin.size > player.y
    ) {
      coinSound.play();
      score++;
      coins.splice(index, 1);
    }
  });

  // Update bombs
  bombs.forEach((bomb, index) => {
    bomb.y += 5;
    ctx.drawImage(bombImg, bomb.x, bomb.y, bomb.size, bomb.size);

    if (bomb.y > canvas.height) bombs.splice(index, 1);

    if (
      bomb.x < player.x + player.width &&
      bomb.x + bomb.size > player.x &&
      bomb.y < player.y + player.height &&
      bomb.y + bomb.size > player.y
    ) {
      bombSound.play();
      gameOver = true;
      alert('Game Over! Score: ' + score);
    }
  });

  requestAnimationFrame(update);
}

setInterval(spawnCoin, 1000);
setInterval(spawnBomb, 2000);

update();
