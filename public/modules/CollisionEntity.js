export class CollisionEntity {
  constructor(game, canPassThrough) {
    this.game = game;
    this.ctx = this.game.ctx;
    this.canPassThrough = canPassThrough;
    if (this.game.devMode) console.log("Collision Created");
  }

  get collisionY() {
    return this.y;
  }

  get collisionHeight() {
    return this.height;
  }

  get collisionX() {
    return this.x;
  }

  get collisionWidth() {
    return this.width;
  }

  collidesWith(sprite) {
    if (
      sprite.y + sprite.height > this.collisionY &&
      this.collisionY + this.collisionHeight > sprite.y &&
      sprite.x + sprite.width > this.collisionX &&
      this.collisionX + this.collisionWidth > sprite.x &&
      this.id != this.game.mainPlayer.id
    ) {
      return true;
    } else {
      return false;
    }
  }

  getCollisionInfo(){
    return {
        x: this.collisionX,
        y: this.collisionY,
        height: this.collisionHeight,
        width: this.collisionWidth
    }
  }

  showBox() {
    this.ctx.fillStyle = "rgba(255, 0, 0, 0.292)";
    this.ctx.fillRect(this.collisionX, this.collisionY, this.collisionWidth, this.collisionHeight);
  }
}
