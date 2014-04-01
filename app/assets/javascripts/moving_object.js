;(function(root){

  var Asteroids = root.Asteroids = (root.Asteroids || {});

	Asteroids.rotate = function(coord, angle){
	  var newX = Math.cos(angle)*coord[0] - Math.sin(angle) * coord[1];
	  var newY = Math.sin(angle)*coord[0] + Math.cos(angle) * coord[1];
	  return [newX, newY]
	}

	Asteroids.MovingObject = function(posX, posY, velX, velY, radius){
	this.posX = posX;
	this.posY = posY;
	this.velX = velX;
	this.velY = velY;
	this.radius = radius;
	this.remove = false;
	this.angVelocity = this.angVelocity || 0
	// points & color in subclasses
	}
	
	Asteroids.MovingObject.prototype.rotate = function(angle){
		this.points = this.points.map(function(coord){
			return Asteroids.rotate(coord, angle)
		});
		
		this.rot = (this.rot + angle) || 0
	}


	Asteroids.MovingObject.prototype.draw = function(ctx) {
	  var points = this.points.slice();
	  var firstPoint = points.shift();
	  var that = this;

	  ctx.strokeStyle = this.strokeColor;
	  ctx.fillStyle = this.fillColor;

	  ctx.beginPath();
	  ctx.moveTo(firstPoint[0]+ this.posX, firstPoint[1] + this.posY );
	  points.forEach(function(point){
	    ctx.lineTo(that.posX + point[0], that.posY + point[1]);
	  });

	  ctx.lineTo(firstPoint[0]+ this.posX, firstPoint[1] + this.posY );
	  ctx.closePath();
	  ctx.stroke();
	  ctx.fill();
	};

	Asteroids.MovingObject.prototype.move = function (w, h) {
	  this.posX += this.velX;
	  this.posY += this.velY;
	  this.rotate(this.angVelocity)
	  this.wrap(w, h, 100);
	};

	Asteroids.MovingObject.prototype.wrap = function (w, h, offset) {
	  if (this.posX < -offset) {
	    this.posX = w + offset;
	  }
	  if (this.posY < -offset) {
	    this.posY = h + offset;
	  }
	  if (this.posX > w+offset ) {
	    this.posX = -offset;
	  }
	  if (this.posY > h+offset) {
	    this.posY = -offset;
	  }
	}

	Asteroids.MovingObject.prototype.isCollidedWith = function (other){
	  var distance = Math.sqrt(
	                  Math.pow((this.posX - other.posX), 2)
	                  + Math.pow((this.posY - other.posY), 2));
	  return this.radius + other.radius > distance;
	};

})(this);