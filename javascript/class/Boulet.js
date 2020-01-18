class Boulet{
    constructor(x, config, board){
        this.x = x;
        this.board = board;
        this.y = config.boardSize.y-10;
        this.destroy = false;
    }

    renderBoulet(){
        this.board.context.beginPath();
        this.board.context.fillStyle ='#1E69FF';
        this.board.context.arc(this.x, this.y, 3, 0, 2* Math.PI, false);
        this.board.context.fill();
    }

    moveBoulet(){
        this.y--;
    }

    setDestroy(){
        this.destroy = true;
    }


}
