/** @type {HTMLCanvasElement} **/

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 800;

  class game {
    constructor(ctx, width, height) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.enemies = [];
      this.enemiesInverval = 400;
      this.enemyTimer = 0;
      this.#addNewEnemy();
    }
    update(deltaTime) {
      if (this.enemyTimer > this.enemiesInverval) {
        this.#addNewEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((object) => object.update());
    }
    draw() {
      //this.#addNewEnemy();
      this.enemies.forEach((object) => object.draw(this.ctx));
    }
    #addNewEnemy() {
      this.enemies.push(new enemy(this));
    }
  }

  class enemy {
    constructor(game) {
      this.game = game;
      this.x = this.game.width;
      this.y = Math.random() * this.game.height;
      this.width = 100;
      this.height = 100;
    }
    update() {
      this.x--;
    }
    draw() {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  let lastTime = 1;
  const Game = new game(ctx, canvas.width, canvas.height);

  function animate(timeStamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    Game.update(deltaTime);
    Game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});

//Timestamp : 4:11:57;
