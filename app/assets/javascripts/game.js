Function.prototype.inherits = function(parent) {
  function F() {};
  F.prototype = parent.prototype;
  this.prototype = new F();
  this.prototype.superConstructor = parent;
  // this.prototype.superPrototype = parent.prototype;
  // this.prototype.superCall = function() {
  //   var args = Array.prototype.slice.call(arguments);
  //   var method = args.shift();
  //   this.superPrototype[method].apply(this, args);
  // }
}


function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

;(function(root){

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Asteroids.Game = function() {
    this.asteroids = [];
    this.bullets = [];
  }

  Asteroids.Game.prototype = {

    init: function() {
      console.log("INIT");
      this.canvas = document.getElementById('game');
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.height = this.canvas.height;
      this.width = this.canvas.width;
      this.ctx = this.canvas.getContext('2d');
      this.bgColor = "#000000";
      this.createObjects();
      this.ship = new Asteroids.Ship(this.width/2, this.height/2, 0, 0);
	  this.keyFunctions = {
		up: this.ship.accelerate,
		down: this.ship.decelerate,
		left: this.ship.rotateLeft,
		right: this.ship.rotateRight,
		space: this.ship.spawnBullet
		};
    },
	
	



    play: function() {
	  var that = this
	  for (var keyString in this["keyFunctions"]) {
		  key(keyString, that.keyFunctions[keyString].bind(this.ship, this));
	  }
      // key('up', function(){
      //  that.ship.accelerate();
      // });
      // key('down', function(){
      //   that.ship.decelerate();
      // });
      // key('left', function(){
      //   that.ship.rotateLeft();
      // });
      // key('right', function(){
      //   that.ship.rotateRight();
      // });
      // key('space', function(){
      //   that.spawnBullet();
      // });
      this.id = window.setInterval(this.tick.bind(this), 30);
    },
	
	handlePressed: function(){
		
	},

    over: function() {
       clearInterval(this.id);
    },

    tick: function() {
      this.move();
      this.checkCollisions();
      this.draw();
      this.cleanUp();
    },

    move: function() {
      that = this;
      this.ship.move(that.width, that.height);
      this.asteroids.forEach(function(asteroid){
        asteroid.move(that.width, that.height);
      });
      this.bullets.forEach(function(bullet){
        bullet.move();
      });
      this.bullets.forEach(function(bullet){
        bullet.draw(that.ctx);
      });
    },

    draw: function() {
      this.ctx.fillStyle = this.bgColor;
      this.ctx.fillRect(0, 0, this.width, this.height);
      that = this;
      this.asteroids.forEach(function(asteroid){
        asteroid.draw(that.ctx);
      });
      this.bullets.forEach(function(bullet){
        bullet.draw(that.ctx);
      });
      this.ship.draw(this.ctx);
    },

    randomPos: function(max){
      return getRandomInt(0, max);
    },

    randomVel: function(){
      return getRandomInt(-6, 6);
    },

    createObjects: function(){
      for (var i = 0, max = getRandomInt(8,16); i < max ; i++){
        var asteroid = new Asteroids.Asteroid(this.randomPos(this.width),
                                              this.randomPos(this.height),
                                              this.randomVel(),
                                              this.randomVel());
        this.asteroids.push(asteroid);
      }
    },

    checkCollisions: function() {
      that = this;

      this.asteroids.forEach(function(asteroid, ai){
        if (asteroid.isCollidedWith(that.ship)) {
          that.over();
        }
        var keep = true;
        that.bullets.forEach(function(bullet, bi){
          if (asteroid.isCollidedWith(bullet)) {
            asteroid.remove = true;
            bullet.remove = true;
          }
        });
      });
    },

    cleanUp: function() {
      this.asteroids = this.asteroids.filter(function(asteroid){
        return !asteroid.remove;
      });
      this.bullets = this.bullets.filter(function(bullet){
        return !bullet.remove;
      });
    },

    spawnBullet: function() {
      var speed = this.ship.speed;
      var rot = this.ship.rot;
      var velX = 10 * Math.cos(rot) + this.ship.velX;
      var velY = 10 * Math.sin(rot) + this.ship.velY;
      var bullet = new Asteroids.Bullet(this.ship.posX, this.ship.posY, velX, velY);
      this.bullets.push(bullet);
    }


  }


})(this);