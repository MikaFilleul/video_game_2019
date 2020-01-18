class Game{
    constructor(configuration, briques, planche, balle, balle2, balle3, board){
        this.configuration = configuration;
        this.planche = planche;
        this.briques = briques.slice();
        this.board = board;
        this.balle = balle;
        this.balle2 = balle2;
        this.balle3 = balle3;
        this.boulets = [];
        this.bballe2 = false;
        this.bballe3 = false;
        this.bboulet = false;
        this.score = 0;
        this.nbVie = 3;
        this.cptAimant = 0;
        this.cptTaille = 0;
        this.cptBoulet = 0;
        this.nbBoulet = 0;
        this.nbBouletDestroy = 0;
        this.hit = new Audio ("../images-sons/hit.wav");
        this.collect = new Audio ("../images-sons/collect.wav");
        this.lose = new Audio ("../images-sons/lose.wav");
        this.shoot = new Audio ("../images-sons/shoot.wav");
        this.audplanche = new Audio ("../images-sons/planche.wav");
        this.win = new Audio ("../images-sons/win.wav");
    }

    setBriques (briques) {
      this.briques = briques.slice();
    }

    runGame(inter){
        this.interval = setInterval(
            (function (self) {
                return function () {
                    self.gameAnimation(inter);
                }
            })(this), inter
        );
        this.planche.controlPlanche();
        this.balle.finAimant();
    }

    stopGame() {
        clearInterval(this.interval);
        document.getElementsByClassName("winlose")[0].getElementsByTagName("h2")[0].innerText = "Score: " + this.score;
        var listeScores = JSON.parse(localStorage.getItem("listeScores"));
        var userscore = {nom: localStorage.getItem("pseudo"), val: this.score};

        for (var i=listeScores.tab.length-1; i>=0; i--) {
          if (this.score >= listeScores.tab[i].val && listeScores.tab[i].val != "-") {
            if (i!=listeScores.tab.length) listeScores.tab[i+1] = listeScores.tab[i];
            listeScores.tab[i] = userscore;
          }
          if (i==0 && listeScores.tab[i].val == "-") listeScores.tab[i] = userscore;
        }
        var table = document.getElementsByTagName("table")[0];
        for (var i=0; i<listeScores.tab.length; i++) {
          table.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML = listeScores.tab[i].nom;
          table.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].innerHTML = listeScores.tab[i].val;
        }
        localStorage.setItem('listeScores', JSON.stringify(listeScores));
        $(".winlose").fadeIn("slow","linear");
    }

    restartGame() {
        $(".winlose").fadeOut("slow","linear");
        document.getElementsByClassName("vies")[0].remove();
        var divvies = document.createElement("div");
        divvies.setAttribute("class","vies");
        document.getElementsByClassName("info")[0].appendChild(divvies);
        this.score = 0;
        this.bballe2 = false;
        this.bballe3 = false;
        this.bboulet = false;
        this.cptAimant = 0;
        this.cptTaille = 0;
        this.cptBoulet = 0;
        this.nbVie = 3;
        this.nbBoulet = 0;
        this.nbBouletDestroy = 0;
        document.getElementsByClassName("score")[0].innerText = this.score;
        var img1 = document.createElement("img");
        img1.src = "../images-sons/heart.png";
        var img2 = document.createElement("img");
        img2.src = "../images-sons/heart.png";
        var img3 = document.createElement("img");
        img3.src = "../images-sons/heart.png";
        document.getElementsByClassName("vies")[0].appendChild(img1);
        document.getElementsByClassName("vies")[0].appendChild(img2);
        document.getElementsByClassName("vies")[0].appendChild(img3);
        this.planche.restoreSettings(this.configuration);
        this.balle.restoreSettings(this.configuration, 2, 2);
        this.balle2.restoreSettings(this.configuration, 1, 2);
        this.balle3.restoreSettings(this.configuration, 2, 1);
        for(i=0; i < this.briques.length; i++){
            this.briques[i].restoreSettings();
        }
    }

    checkBalleCollision(){
        if(this.balle.y+10 >= this.configuration.boardSize.y){
            if(this.nbVie == 0){
              if (localStorage.getItem("sound") != "mute") this.lose.play();
              document.getElementsByClassName("winlose")[0].getElementsByTagName("h1")[0].innerText = " Dommage";
              this.stopGame();
            }
            else{
                this.balle.x = (this.planche.x+this.planche.largeur/2)-(2*this.balle.rayon);
                this.balle.y = this.configuration.boardSize.y - 25;
                this.balle.rebondX = 0;
                this.balle.rebondY = 2;
                document.getElementsByClassName("vies")[0].getElementsByTagName("img")[0].remove();
                if (localStorage.getItem("sound") != "mute") this.hit.play();
                this.nbVie--;
            }
        }
    }

    updateScore() {
        this.score++;
        document.getElementsByClassName("score")[0].innerText = this.score;
    }

    checkBriquesBalleCollision(balle){
        for(i = 0; i < this.briques.length; i++){
            if(((balle.x+2*balle.rayon) > this.briques[i].x && balle.x < this.briques[i].x+this.briques[i].longueur)
            &&(((balle.y-balle.rayon) > this.briques[i].y && (balle.y-balle.rayon) < this.briques[i].y+this.briques[i].largeur)
            || ((balle.y+balle.rayon) > this.briques[i].y && balle.y < this.briques[i].y))
            && (this.briques[i].destroy==false || (balle.y <= 0))){
                if((balle.y-balle.rayon) > this.briques[i].y && (balle.y-balle.rayon) < this.briques[i].y+this.briques[i].largeur){
                    balle.y = this.briques[i].y + this.briques[i].largeur+1 + balle.rayon;
                }
                if((balle.y+balle.rayon) > this.briques[i].y && balle.y < this.briques[i].y){
                    balle.y = this.briques[i].y - balle.rayon - 1;
                }

                if(this.briques[i].casseX2){
                    balle.rebondBrique();
                    this.briques[i].setCasseX2();

                }
                else if(this.briques[i].incassable){
                    balle.rebondBrique();
                }
                else{
                    this.briques[i].setDestroy();
                    balle.rebondBrique();
                    this.updateScore();
                    if (localStorage.getItem("sound") != "mute") this.collect.play();
                }
                if(this.briques[i].bAimant){
                    this.balle.bAimant= true;
                }
                if(this.briques[i].bCanon){
                    this.bboulet = true;
                }
                if(this.briques[i].bGrandePlanche){
                    this.planche.bTaille = true;
                    this.planche.agrandissement();
                }
                if(this.briques[i].b3balles){
                  this.balle2.x = this.planche.x + this.planche.largeur/2;
                  this.balle3.x = this.planche.x + this.planche.largeur/2;
                    this.bballe2 = true;
                    this.bballe3 = true;
                }
            }

        }
        if(balle.x >= this.configuration.boardSize.x-20 || balle.x <= 0){
            balle.rebondMur();
        }
        if(balle.y >= this.configuration.boardSize.y-24  && balle.x+2*balle.rayon >=this.planche.x
        && balle.x <= this.planche.x+this.planche.largeur){
                balle.rebondPlanche(this.planche.direction, this.configuration);
                if (localStorage.getItem("sound") != "mute") this.audplanche.play();
        }
        balle.moveBalle();
        if(balle.y<=10){
            balle.rebondBrique(this.br);
        }
    }

    checkBouletCollision(boulet, brique){
        if(((boulet.x+6) > brique.x && boulet.x < brique.x+brique.longueur)
        &&(((boulet.y-3) > brique.y && (boulet.y-3) < brique.y+brique.largeur)
        && (brique.destroy==false)
        &&(boulet.destroy == false))){
            boulet.setDestroy();
            this.nbBouletDestroy++;
            if(brique.casseX2){
               brique.setCasseX2();

            }
            else if(brique.incassable){

            }
            else{
                brique.setDestroy();
                this.updateScore();
                if (localStorage.getItem("sound") != "mute") this.collect.play();
            }
            if(brique.bAimant){
                this.balle.bAimant= true;
            }
            if(brique.bGrandePlanche){
                this.planche.bTaille = true;
                this.planche.agrandissement();
            }
            if(brique.b3balles){
                this.bballe2 = true;
                this.bballe3 = true;
            }
        }
    }

    gameAnimation(inter){
        this.planche.renderPlanche(this.context);
        this.planche.movePlanche(this.planche.direction, this.configuration);
        this.checkBalleCollision();
        this.balle.renderBalle(this.context);
        if(this.balle.bAimant){
            if(this.cptAimant < (5000/inter)){
                this.balle.aimantation(this.planche, this.configuration);
                this.cptAimant++;
            }
            else{
                this.balle.bAimant = false;
                this.balle.rebondX = 0;
                this.balle.rebondY = 3;
            }
        }
        if(this.planche.bTaille){
            if(this.cptTaille < (7000/inter)){
                this.cptTaille++;
            }
            else{
                this.planche.bTaille = false;
                this.planche.rapetissement();
            }
        }
        if(this.bboulet){
            if(this.cptBoulet < (7000/inter) || this.nbBoulet > this.nbBouletDestroy){
                if((this.cptBoulet%50) == 0 && this.cptBoulet < (7000/inter)){
                    this.boulets[this.nbBoulet] = new Boulet(this.planche.x+6, this.configuration, this.board);
                    this.boulets[this.nbBoulet+1] = new Boulet(this.planche.x+this.planche.largeur-6, this.configuration, this.board);
                    if (localStorage.getItem("sound") != "mute") this.shoot.play();
                    this.nbBoulet += 2;
                }
                for(i = 0; i < this.nbBoulet; i+=2){
                    if(this.boulets[i].destroy == false){
                        this.boulets[i].moveBoulet();
                        this.boulets[i].renderBoulet(this.context);
                    }
                    if(this.boulets[i+1].destroy == false){
                        this.boulets[i+1].moveBoulet();
                        this.boulets[i+1].renderBoulet(this.context);
                    }
                    if(this.boulets[i].y < 3 && !this.boulets[i].destroy){
                        this.boulets[i].setDestroy();
                        this.nbBouletDestroy++;
                    }
                    if(this.boulets[i+1].y < 3 && !this.boulets[i+1].destroy){
                        this.boulets[i+1].setDestroy();
                        this.nbBouletDestroy++;
                    }

                    for(let j = 0; j < this.briques.length; j++){
                        this.checkBouletCollision(this.boulets[i], this.briques[j]);
                        this.checkBouletCollision(this.boulets[i+1], this.briques[j]);
                    }
                }
                this.planche.renderCanon();
            }
            else if (this.nbBoulet == this.nbBouletDestroy){
                this.bboulet = false;
            }
            this.cptBoulet++;
        }
        for(i = 0; i < this.briques.length; i++){
            this.briques[i].renderBriques(this.configuration);
        }
        this.checkBriquesBalleCollision(this.balle);

        if(this.bballe2){
            this.balle2.renderBalle(this.context);
            this.checkBriquesBalleCollision(this.balle2);
        }
        if(this.bballe3){
            this.balle3.renderBalle(this.context);
            this.checkBriquesBalleCollision(this.balle3);
        }
        if(this.balle2.y > this.configuration.boardSize.y){
            this.bballe2 = false;
        }
        if(this.balle3.y > this.configuration.boardSize.y){
            this.bballe3 = false;
        }
        if((this.score == 45 && localStorage.getItem("level") == "difficile") || (this.score == 50 && localStorage.getItem("level") != "difficile")) {
          if (localStorage.getItem("sound") != "mute") this.win.play();
          document.getElementsByClassName("winlose")[0].getElementsByTagName("h1")[0].innerText = " Bravo";
          this.stopGame();
        }
    }

  pauseGame(){
    clearInterval(this.interval);
  }

  reprendreGame(inter){
    this.runGame(inter);
  }
}
