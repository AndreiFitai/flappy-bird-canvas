var isGameStarted = false;

window.onload = function () {
  document.getElementById("start-button").onclick = function () {
    if (!isGameStarted) {
      startGame();
      isGameStarted = true;
    }
  };

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d')

  function startGame() {
    setInterval(updateCanvas(), 1000 / 50);
  }
  bg = new Image();
  bg.src = 'images/bg.png';

  var backgroundImage = {
    img: bg,
    x: 0,
    speed: -1,
    move: function () {
      this.x += this.speed;
      this.x %= canvas.width;
    },

    draw: function () {
      ctx.drawImage(this.img, this.x, 0);
      if (this.speed < 0) {
        ctx.drawImage(this.img, this.x + canvas.width, 0);
      } else {
        ctx.drawImage(this.img, this.x - this.img.width, 0);
      }
    },
  };

  var faby = new Image();
  faby.src = "images/flappy.png";

  var burd = {
    img: faby,
    width: 50,
    height: 40,
    speedX: 1,
    speedY: 1,
    gravity: 1,
    gravitySpeed: -1,
    checkButton: function () {
      var button = document.onkeydown = function (e) {
        if (e.keyCode == 32)
          return true
        return false
      }
      return button;
    },
    draw: function () {
      ctx.drawImage(this.img, 100, 250, this.width, this.height)
    }
  };

  var obsTop = new Image();
  obsTop.src = "images/obstacle_top.png";
  var obsBot = new Image();
  obsBot.src = "images/obstacle_bottom.png";

  var obstacles = {
    imgTop: obsTop,
    imgBot: obsBot,
    x: canvas.width,
    speed: -2,
    move: function () {
      this.x += this.speed;
      this.x %= canvas.width;
    },

    draw: function () {
        ctx.drawImage(this.imgTop, this.x, 0, 50, 250);
        ctx.drawImage(this.imgBot, this.x, 400, 50, 200)
    },
  };



  function updateCanvas() {

    backgroundImage.move();
    obstacles.move()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    backgroundImage.draw();
    burd.draw();
    obstacles.draw();
    requestAnimationFrame(updateCanvas);
  }

};