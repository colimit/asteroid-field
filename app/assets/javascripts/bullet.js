;(function(root){

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Asteroids.Bullet = function(posX, posY, velX, velY) {
    this.superConstructor.call(this, posX, posY, velX, velY);
    this.strokeColor = "#FF0000";
    this.fillColor = "#FF0000";
    this.radius = 2;
  }

  Asteroids.Bullet.inherits(root.Asteroids.MovingObject);

  Asteroids.Bullet.prototype.move = function (w, h) {
    this.posX += this.velX;
    this.posY += this.velY;
  }

  Asteroids.Bullet.prototype.draw = function(ctx) {

    ctx.strokeStyle = this.strokeColor;
    ctx.fillStyle = this.fillColor;

    ctx.beginPath();
    ctx.arc(this.posX, this.posY,2,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
  };

})(this);