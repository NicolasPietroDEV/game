import { MediaLoader } from "../Helpers/MediaLoader.js"
import { Entity } from "../Objects/Entity.js"
import { Arrow } from "../Objects/Arrow.js"

export class Bow extends Entity {
    constructor(game, user){
        super(game, {
            x: user.x,
            y: user.y,
            width: 21,
            height: 21
        })
        this.user = user
        this.spriteMap = {
            "up": 0,
            "left": 1,
            "right": 3,
            "down": 2
        }
        this.immunityMap = {
            "up": "down",
            "down": "up",
            "left": "right",
            "right": "left"
        }
        this.abovePlayer = false
        this.spriteImg = MediaLoader.getImage("../../assets/sprites/items/bow.png", 21,21)
        user.addWeapon(this)
        this.canUse = true
        this.isUsing = false
    }

    draw(){
        this.ctx.drawImage(
            this.spriteImg,
            1 + this.spriteMap[this.user.direction]*25,
            1,
            25,
            25,
            this.positionX + this.game.cameraPositionX,
            this.positionY + this.game.cameraPositionY,
            42,
            42
        )
    }

    get positionX() {
        switch (this.user.direction) {
          case "up":
            return this.user.x - this.width/2;
          case "left":
            return this.user.x - this.width;
          case "down":
            return this.user.x + this.width/2;
          case "right":
            return this.user.x + this.width ;
        }
      }
    
      get positionY() {
        switch (this.user.direction) {
          case "up":
            return this.user.y + this.height / 2;
          case "left":
            return this.user.y + this.height;
          case "down":
            return this.user.y + this.height*1.5;
          case "right":
            return this.user.y + this.height;
        }
      }

    use(){
        if (
            this.game.entities.findIndex((entity) => {
              return entity.use && entity.user == this.user;
            }) == -1 &&
            this.canUse && this.user.inventory.arrow
          ) {
              this.user.inventory.arrow -=1
              this.abovePlayer = this.user.direction == "down"
              this.game.addToGame(this)
              this.canUse = false
              this.user.canChangeDirection = false
                this.user.speed = 1
              this.isUsing = true
            }
        
    }
    stop(){
      if(this.isUsing){new Arrow(this.game,
        this.user, {
          x: this.positionX,
          y: this.positionY,
          width: 32,
          height: 32,
        }, 10, this.user.direction)
        MediaLoader.playSound("../../assets/sfx/arrow_shoot.wav")
        this.isUsing = false
        this.game.removeFromGame(this)
        this.user.speed = 4
        this.user.canChangeDirection = true
          setTimeout(()=>{this.canUse = true}, 500)
      }
        
    }

    
}