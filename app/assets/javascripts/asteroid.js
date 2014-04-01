;(function(root){

  var Asteroids = root.Asteroids = (root.Asteroids || {});
  Asteroids.Asteroid = function(posX, posY, velX, velY){
    this.superConstructor.call(this, posX, posY, velX, velY);

    this.strokeColor = "#FFFFFF";
    this.fillColor = "#FF0000";
    this.radius = getRandomInt(20,60);
    this.angVelocity = Math.random() * 0.2 - 0.1
    this.generateShape();
  }

  Asteroids.Asteroid.inherits(root.Asteroids.MovingObject);

  Asteroids.Asteroid.prototype.generateShape =  function(){
    var sides = getRandomInt( 5, 12 );
    this.points = [];
    var angle = (Math.PI*2)/sides;
    for (var i = 0; i < sides; i++){
       var pointX = Math.floor(Math.cos(i * angle) * (this.randRadius(this.radius)));
       var pointY = Math.floor(Math.sin(i * angle) * (this.randRadius(this.radius)));
       this.points.push([pointX, pointY]);
    }
  };

  Asteroids.Asteroid.prototype.randRadius = function(radius){
    var max = this.radius + 10;
    var min = this.radius - 10;
    return getRandomInt (min, max);
  };

})(this);