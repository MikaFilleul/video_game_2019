class Balle{
    constructor(config, rayon, rebondX, rebondY, color, board) {
        this.x = config.boardSize.x/2;
        this.y = config.boardSize.y-25;
        this.rayon = rayon;
        this.color = color;
        this.board = board;
        this.rebondX= rebondX;
        this.rebondY= rebondY;
        this.bAimant = false;
    }

    renderBalle() {
        this.board.context.beginPath();
        this.board.context.fillStyle =this.color;
        this.board.context.arc(this.x+10, this.y, this.rayon, 0, 2* Math.PI, false);
        this.board.context.fill();
    }

    moveBalle(){
        this.x += this.rebondX;
        this.y -= this.rebondY;
    }

    rebondMur(){
        this.rebondX *= -1;
        if (this.x <= 0) this.x++;
        else this.x--;
    }


    rebondBrique(){
        this.rebondY *=-1;
        if (this.y <= 10) {
          this.y++;
        }

        if(this.rebondX>0){
            this.rebondX *=1 ;
        }
        else if(this.rebondX == 0){
            this.rebondX +=1;
        }
    }

    rebondPlanche(direction, config){
        this.y = config.boardSize.y-25;
        this.rebondY *= -1;
        switch(direction){
            case 'droite':
            if(this.rebondX >=0){
                this.rebondX+=1;
            }
            else{
               this.rebondX++;
            }
            break;

            case 'gauche':
                if(this.rebondX <=0 ){
                    this.rebondX-=1;
                }
                else{
                   this.rebondX--;
                }
            break;

            default :

            break;
        }
    }

    aimantation(planche, config){
        this.y = config.boardSize.y-25;
        this.x =(planche.x+planche.largeur/2)-(this.rayon);
        this.rebondY = 0;
        this.rebondX = 0;
    }

    finAimant(){
        const self = this;

        let finAimant = function(event){
            if(event.code === 'ArrowUp' || event.key === 'z'){
                if(self.bAimant == true){
                    self.bAimant = false;
                    self.rebondX = 0;
                    self.rebondY = 3;
                }
            }
        };

        document.addEventListener('keydown', finAimant);
    }

    restoreSettings(config, rebondX, rebondY){
        this.x = config.boardSize.x/2;
        this.y = config.boardSize.y-25;
        this.rebondX= rebondX;
        this.rebondY= rebondY;
    }

}
