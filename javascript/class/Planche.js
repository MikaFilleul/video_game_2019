class Planche{
    constructor(config, board) {
        this.x = config.boardSize.x/2 - (config.boardSize.x/7)/2;
        this.y = config.boardSize.y-15;
        this.largeur = config.boardSize.x/7;
        this.initial = this.largeur;
        this.couleur = '#00008B';
        this.board = board;
        this.canon = false;
        this.bTaille = false;
    }

    renderPlanche(){
        this.board.clearGameBoard();
        this.board.context.beginPath();
        this.board.context.fillStyle = this.couleur;
        this.board.context.rect(this.x, this.y, this.largeur, 10);
        this.board.context.fill();
    }

    renderCanon(){
        this.board.context.beginPath();
        this.board.context.fillStyle = this.couleur;
        this.board.context.rect(this.x, this.y, this.largeur, 10);
        this.board.context.rect(this.x+3, this.y-3, 5, 4);
        this.board.context.rect(this.x+this.largeur-8, this.y-3, 5, 4);
        this.board.context.fill();
    }

    movePlanche(direction, config){
        switch(direction){
            case 'droite':
                if(this.x < config.boardSize.x-this.largeur) this.x+=5;
            break;

            case 'gauche':
                if(this.x > 0) this.x-=5;
            break;

            default :
                this.x = this.x;
            break;
        }
    }

    controlPlanche(){
        const self = this;

        let keyPressed = false;

        let handler = function(event){
            if((event.key === 'ArrowLeft' || event.key === 'q') && !keyPressed){
                self.direction = 'gauche';
                keyPressed = true;
            }
            else if((event.key === 'ArrowRight' || event.key === 'd') && !keyPressed){
                self.direction = 'droite';
                keyPressed = true;
            }
        };

        document.addEventListener('keydown', handler);
        document.addEventListener('keyup', function(){
          self.direction='immobile';
          keyPressed = false;
        });

    }

    agrandissement(){
      this.x -= this.largeur/2;
      this.largeur *= 2;
    }

    rapetissement(){
      if (this.largeur != this.initial) {
        this.largeur /= 2;
        this.x += this.largeur/2;
      }
    }

    restoreSettings(config){
        this.x = config.boardSize.x/2 - this.largeur/2;
        this.largeur = config.boardSize.x/7;
    }
}
