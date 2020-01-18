class Briques{
    constructor(x, y, incassable, casseX2, bCanon, bAimant, bGrandePlanche, b3balles, board, config){
        this.x = x;
        this.y = y;
        this.destroy = false;
        this.incassable = incassable;
        this.casseX2 = casseX2;
        this.bCanon = bCanon;
        this.bAimant = bAimant;
        this.bGrandePlanche = bGrandePlanche;
        this.b3balles = b3balles;
        this.board = board;
        this.longueur = config.boardSize.x/10-5;
        this.largeur = 25;
    }


    renderBriques(config){
        this.board.context.beginPath();
        if(this.destroy){
            this.board.context.rect(this.x, this.y, 0, 0);
        }
        else if(this.casseX2){
            this.board.context.fillStyle = '#773F0E';
            this.board.context.rect(this.x, this.y, this.longueur, this.largeur);
            this.board.context.fill();
        }
        else if(this.incassable){
            this.board.context.fillStyle = '#E4281A';
            this.board.context.rect(this.x, this.y, this.longueur, this.largeur);
            this.board.context.fill();
        }
        else if(this.bAimant){
            this.board.context.fillStyle = '#DC2020';
            this.board.context.rect(this.x, this.y, this.longueur/3, this.largeur);
            this.board.context.rect(this.x+2*this.longueur/3, this.y, this.longueur/3, this.largeur);
            this.board.context.fill();

            this.board.context.beginPath();
            this.board.context.fillStyle = '#929292';
            this.board.context.rect(this.x+this.longueur/3, this.y, this.longueur/3, this.largeur);
            this.board.context.fill();

        }
        else if(this.bCanon){
            this.board.context.fillStyle = '#777575';
            this.board.context.rect(this.x, this.y, this.longueur, this.largeur);
            this.board.context.fill();

            this.board.context.beginPath();
            this.board.context.strokeStyle = '#2E2D2D';
            this.board.context.lineWidth = "3";
            this.board.context.arc(this.x+this.largeur/2, this.y+this.largeur/2+2, this.largeur/2, 0, 2* Math.PI, false);
            this.board.context.stroke();

            this.board.context.beginPath();
            this.board.context.fillStyle = '#2E2D2D';
            this.board.context.arc(this.x+this.longueur-this.largeur/2, this.y+this.largeur/2, this.largeur/2, 0, 2* Math.PI, false);
            this.board.context.fill();

        }
        else if(this.bGrandePlanche){
            this.board.context.beginPath();
            this.board.context.fillStyle = '#0FFF07';
            this.board.context.rect(this.x, this.y, this.longueur, this.largeur);
            this.board.context.fill();

            this.board.context.beginPath();
            this.board.context.fillStyle = '#FF7307';
            this.board.context.rect(this.x+this.longueur/2-this.largeur/10, this.y+this.largeur/8, this.largeur/5, 4*this.largeur/5);
            this.board.context.rect(this.x+this.longueur/2-(4*this.largeur/5)/2, this.y+this.largeur/2-this.largeur/10, 4*this.largeur/5, this.largeur/5);
            this.board.context.fill();
        }
        else if(this.b3balles){
            this.board.context.beginPath();
            this.board.context.fillStyle = '#9AFF00';
            this.board.context.rect(this.x, this.y, this.longueur, this.largeur);
            this.board.context.fill();

            this.board.context.beginPath();
            this.board.context.fillStyle = "#FF86FF";
            this.board.context.arc(this.x+this.largeur/2+5, this.y+this.largeur/2, this.largeur/2, 0, 2* Math.PI, false);
            this.board.context.fill();

            this.board.context.beginPath();
            this.board.context.fillStyle = "#FF86FF";
            this.board.context.arc(this.x+this.longueur/2, this.y+this.largeur/2, this.largeur/2, 0, 2* Math.PI, false);
            this.board.context.fill();

            this.board.context.beginPath();
            this.board.context.fillStyle = "#FF86FF";
            this.board.context.arc(this.x+this.longueur-this.largeur/2-5, this.y+this.largeur/2, this.largeur/2, 0, 2* Math.PI, false);
            this.board.context.fill();

        }
        else{
            this.board.context.beginPath();
            this.board.context.fillStyle = '#FF851B';
            this.board.context.rect(this.x, this.y, this.longueur, this.largeur);
            this.board.context.fill();
        }
    }

    setDestroy(){
        this.destroy = true;
    }

    setCasseX2(){
        this.casseX2 = false;
    }

    restoreSettings(){
        this.destroy=false;
    }

}
