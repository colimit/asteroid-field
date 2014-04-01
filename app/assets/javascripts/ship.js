;(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Asteroids.Ship = function(posX, posY, velX, velY){
    this.superConstructor.call(this, posX, posY, velX, velY);

    this.strokeColor = "#FF00FF";
    this.fillColor = "#FF00FF";
    this.radius = getRandomInt(20,60);
    this.radius = 10;
    this.rot = (-Math.PI/2);
    this.points = [[0, -10], [-5, 10], [5, 10]]
  };

  Asteroids.Ship.inherits(root.Asteroids.MovingObject);

  Asteroids.Ship.prototype.rotateLeft = function() {
    this.rotateDir(-1);
  }

  Asteroids.Ship.prototype.rotateRight = function() {
    this.rotateDir(1);
  }

  Asteroids.Ship.prototype.rotateDir = function(dir) {
	angle = dir*((2*Math.PI)/32);
    this.rot += angle;
   // var that = this;
    this.rotate(angle)
    // this.points = this.points.map(function(coords){
 //      var x = Math.cos(angle)*coords[0] + Math.sin(angle) * coords[1];
 //      var y = -Math.sin(angle)*coords[0] + Math.cos(angle) * coords[1];
 //      return [x, y];
 //    });
  };

  Asteroids.Ship.prototype.accelerate = function(){
    this.changeSpeed(0.3);
  };

  Asteroids.Ship.prototype.decelerate = function(){
	this.changeSpeed(-0.3);
  };
  
  Asteroids.Ship.prototype.changeSpeed = function(incr){
    this.velX += incr * Math.cos(this.rot);
    this.velY += incr * Math.sin(this.rot);
  }
  
  Asteroids.Ship.prototype.spawnBullet = function(game){
	  game.spawnBullet()
  }
  // 
  // Asteroids.Ship.prototype.move = function(w, h) {
  //   this.wrap(w, h, 0);
  //   this.posX += this.speed * Math.cos(this.rot);
  //   this.posY += this.speed * Math.sin(this.rot);
  // };
  // 
  

})(this);