import { CollisionEntity } from "./CollisionEntity.js";

export class Player extends CollisionEntity {
  constructor(game, playerInfo, notAdd) {
    super(game, false, playerInfo)
    this.game = game;
    this.ctx = this.game.ctx;
    this.directionMapping = {
        "w": 0,
        "a": 1,
        "s": 2,
        "d": 3
      }
    this.id = playerInfo.id;
    this.direction = playerInfo.direction;
    this.speed = playerInfo.speed;
    this.color = playerInfo.color;
    this.name = playerInfo.name;
    this.isMoving = false;
    this.frame = 1
    this.spriteImg = new Image(200,200);
    this.spriteImg.src = "../assets/sprite.png";
    
    if(!notAdd)this.game.entities.push(this)
    if(this.game.devMode)console.log("Player created");
    this.draw();
    this.animate()
  }

  get collisionY(){
    return this.y + (this.height/2) + this.game.cameraPositionY
  }

  get collisionHeight(){
    return this.height/2
  }

  get collisionX(){
    return this.x + (this.width/4) + this.game.cameraPositionX
  }

  get collisionWidth(){
    return this.width/2
  }

  draw() {
    this.#drawText();
    this.#drawSprite();
    if(this.game.devMode)this.showBox()
  }

  changePos(info){
    this.x = info.x;
    this.y = info.y
    this.direction = info.direction
    this.isMoving = info.isMoving
  }

  getPlayerInfo(){
    return {
        x: this.x, 
        y: this.y, 
        direction: this.direction, 
        color: this.color, 
        id: this.id, 
        width: this.width,
        height: this.height,
        speed: this.speed,
        name: this.name,
        isMoving: this.isMoving
    }
  }

  animate(){
    setInterval(()=>{
        if((this.frame+1>3) || !this.isMoving) {this.frame=0} else this.frame++
    }, 300)
    
  }

  #drawSprite() {
    this.ctx.drawImage(
      this.spriteImg,
      this.frame*48,
      (this.directionMapping[this.direction]*(68)),
      48,
      67,
      this.x + this.game.cameraPositionX,
      this.y + this.game.cameraPositionY,
      this.width,
      this.height
    );
  }

  #drawText() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.447)";
    this.ctx.font = "bolder 12px Arial";
    this.ctx.fillRect(
      this.x + this.width / 2 - this.ctx.measureText(this.name).width / 2 + this.game.cameraPositionX,
      this.y - 14 + this.game.cameraPositionY,
      this.ctx.measureText(this.name).width,
      12
    );
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(
      this.name,
      this.x + this.width / 2 - this.ctx.measureText(this.name).width / 2 + this.game.cameraPositionX,
      this.y - 4 + this.game.cameraPositionY
    );
  }

  
}
