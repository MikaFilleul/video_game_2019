$(document).ready(function(){
  var pixelaudio = new Audio("../images-sons/pixel.mp3");
  var fightaudio = new Audio("../images-sons/fight.mp3");
  var epicaudio = new Audio("../images-sons/epic.mp3");
  var music = [pixelaudio, fightaudio, epicaudio];

  pixelaudio.volume = 0.15;
  fightaudio.volume = 0.15;
  epicaudio.volume = 0.15;

  pixelaudio.onended = function() {
    fightaudio.play();
  };
  fightaudio.onended = function() {
    epicaudio.play();
  }
  epicaudio.onended = function() {
    pixelaudio.play();
  }

  var rand = Math.floor(Math.random() * 3);
  music[rand].play();

  if (localStorage.getItem("music") == "mute") {
    music.forEach(function(item) {
      item.muted = true;
    });
  }

  localStorage.setItem("level","");

  if (localStorage.getItem("listeScores") == null) {
    var listeScores = {
      tab: [
        {nom: "-", val: "-"},
        {nom: "-", val: "-"},
        {nom: "-", val: "-"},
        {nom: "-", val: "-"},
        {nom: "-", val: "-"},
        {nom: "-", val: "-"},
        {nom: "-", val: "-"},
        {nom: "-", val: "-"},
        {nom: "-", val: "-"},
        {nom: "-", val: "-"}
      ]
    }
    localStorage.setItem('listeScores', JSON.stringify(listeScores));
  }

  function start () {
    var inp = document.getElementsByTagName("input")[0].value;
    if (inp == "") {
      alert("Entrez un Pseudonyme!");
    }
    else {
      localStorage.setItem("pseudo",inp.toUpperCase());
      $(".menu").fadeOut("slow","linear", function() {
        $(".level").fadeIn("slow","linear");
        $(".level").css('display','flex');
      });
    }
  }

  document.onkeydown = function(evt) {
    if (evt.keyCode==13) start();
  }

  $("button.commencer").click(function() {
    start();
  });

  if (localStorage.getItem("music") == "mute") {
    $("button.music img").attr("src","../images-sons/music_off.png");
  }
  else {
    $("button.music img").attr("src","../images-sons/music_on.png");
  }

  if (localStorage.getItem("sound") == "mute") {
    $("button.sound img").attr("src","../images-sons/sound_off.png");
  }
  else {
    $("button.sound img").attr("src","../images-sons/sound_on.png");
  }

  $("button.music").click(function() {
    if (localStorage.getItem("music") == "mute") {
      $("button.music img").attr("src","../images-sons/music_on.png");
      localStorage.setItem("music","on");
      music.forEach(function(item) {
        item.muted = false;
      });
    }
    else {
      $("button.music img").attr("src","../images-sons/music_off.png");
      localStorage.setItem("music","mute");
      music.forEach(function(item) {
        item.muted = true;
      });
    }
  });

  $("button.sound").click(function() {
    if (localStorage.getItem("sound") == "mute") {
      $("button.sound img").attr("src","../images-sons/sound_on.png");
      localStorage.setItem("sound","on");
    }
    else {
      $("button.sound img").attr("src","../images-sons/sound_off.png");
      localStorage.setItem("sound","mute");
    }
  });

  function jeu () {
    $("button#facile").unbind("click");
    $("button#intermediaire").unbind("click");
    $("button#difficile").unbind("click");

    var inter;
    if (localStorage.getItem("level") == "facile") {
      inter = 10;
    }
    else if (localStorage.getItem("level") == "intermediaire") {
      inter = 8;
    }
    else {
      inter = 6;
    }

    localStorage.setItem("pause","play")
    if (localStorage.getItem("pause") == "pause") {
      $("button.pause img").attr("src","../images-sons/play.png");
      localStorage.setItem("pause","play");
    }
    else {
      $("button.pause img").attr("src","../images-sons/pause.png");
      localStorage.setItem("pause","pause");
    }

    function pause () {
      if (localStorage.getItem("pause") == "pause") {
        $("button.pause img").attr("src","../images-sons/play.png");
        localStorage.setItem("pause","play");
      }
      else {
        $("button.pause img").attr("src","../images-sons/pause.png");
        localStorage.setItem("pause","pause");
      }
    }

    var board = new Board();

    var config = {
      boardSize: {
        x: parseInt(board.width),
        y: parseInt(board.height)
      }
    };

    var briques =[];

    function createBriques (briques) {
      var nbBriques = 50;
      var briquesSpe = [];
      let y = 0;

      for(i = 0; i < nbBriques*0.1; i++){
          speB =  Math.floor(Math.random() * nbBriques);
          if(briquesSpe.includes(speB)){
            i--;
          }
          else{
            briquesSpe[i] =speB;
          }
      }

      do{
          canon =  Math.floor(Math.random() * nbBriques);
      } while(briquesSpe.includes(canon));

      do{
        aimant =  Math.floor(Math.random() * nbBriques);
      } while(briquesSpe.includes(aimant) || canon == aimant);

      do{
        grandPlanche =  Math.floor(Math.random() * nbBriques);
      } while(briquesSpe.includes(grandPlanche) || canon == grandPlanche || aimant == grandPlanche);

      do{
        plus3balles =  Math.floor(Math.random() * nbBriques);
      } while(briquesSpe.includes(plus3balles) || canon == plus3balles || aimant == plus3balles || grandPlanche == plus3balles);

      for(i = 0; i < nbBriques; i++){
        bCanon = false;
        bAimant = false;
        bGrandePlanche= false;
        b3balles = false;
        x = parseInt((config.boardSize.x/10*i)%config.boardSize.x);
        if(x <= config.boardSize.x/10-1) {
          x = 0;
          y += 30;
        }

        if(i == canon){
          bCanon = true;
        }
        if(i == aimant){
          bAimant = true;
        }
        if(i == grandPlanche){
          bGrandePlanche = true;
        }
        if(i == plus3balles){
          b3balles = true;
        }

        if(briquesSpe.includes(i)){
          switch (localStorage.getItem("level")){
            case "facile" :
              briques[i] = new Briques(x+2, y, false, false, bCanon, bAimant, bGrandePlanche, b3balles, board, config);
              break;
            case "intermediaire":
              briques[i] = new Briques(x+2, y, false, true, bCanon, bAimant, bGrandePlanche, b3balles, board, config);
              break;
            case "difficile":
              briques[i] = new Briques(x+2, y, true, false, bCanon, bAimant, bGrandePlanche, b3balles, board, config);
              break;
            default:
              briques[i] = new Briques(x+2, y, false, false, bCanon, bAimant, bGrandePlanche, b3balles, board, config);
              break;
          }
        }
        else{
          briques[i] = new Briques(x+2, y, false, false, bCanon, bAimant, bGrandePlanche, b3balles, board, config);
        }
      }
    }

    createBriques(briques);

    var balle = new Balle(config, 10, 2, 2, '#FF06FF', board);
    var balle2 = new Balle(config, 10, 2, 1, '#721772', board);
    var balle3 = new Balle(config, 10, 1, 2, '#554655', board);
    var planche = new Planche(config, board);
    var game = new Game(config, briques, planche, balle, balle2, balle3, board);

    game.runGame(inter);

    $("button.pause").click(function () {
      if (localStorage.getItem("pause") == "play") {
        pause();
        game.reprendreGame(inter);
      }
      else {
        pause();
        game.pauseGame();
      }
    });

    $("button.rejouer").click(function() {
      var newBriques = [];
      createBriques(newBriques);
      game.setBriques(newBriques);
      game.restartGame();
      game.runGame(inter);
    });

    $("button.retour").click(function() {
      game.restartGame();
      localStorage.setItem("level","");
      $(".winlose").fadeOut("slow","linear");
      $(".game").fadeOut("slow","linear");
      $(".info").fadeOut("slow","linear");
      $(".pause").fadeOut("slow","linear");
      $(".level").fadeIn("slow","linear");
    });

    $("button#facile").click(function() {
      if (localStorage.getItem("level") == "") {
        localStorage.setItem("level","facile");
        $(".level").fadeOut("slow","linear", function() {
          $(".game").fadeIn("slow","linear");
          $(".game").css('display','flex');
          $(".info").fadeIn("slow","linear");
          $(".pause").fadeIn("slow","linear");
          var newBriques = [];
          createBriques(newBriques);
          game.setBriques(newBriques);
          inter = 10;
          game.runGame(inter);
        });
      }
    });

    $("button#intermediaire").click(function() {
      if (localStorage.getItem("level") == "") {
        localStorage.setItem("level","intermediaire");
        $(".level").fadeOut("slow","linear", function() {
          $(".game").fadeIn("slow","linear");
          $(".game").css('display','flex');
          $(".info").fadeIn("slow","linear");
          $(".pause").fadeIn("slow","linear");
          var newBriques = [];
          createBriques(newBriques);
          game.setBriques(newBriques);
          inter = 8;
          game.runGame(inter);
        });
      }
    });

    $("button#difficile").click(function() {
      if (localStorage.getItem("level") == "") {
        localStorage.setItem("level","difficile");
        $(".level").fadeOut("slow","linear", function() {
          $(".game").fadeIn("slow","linear");
          $(".game").css('display','flex');
          $(".info").fadeIn("slow","linear");
          $(".pause").fadeIn("slow","linear");
          var newBriques = [];
          createBriques(newBriques);
          game.setBriques(newBriques);
          inter = 6;
          game.runGame(inter);
        });
      }
    });
  }

  $("button#facile").bind("click",function() {
    if (localStorage.getItem("level") == "") {
      localStorage.setItem("level","facile");
      $(".level").fadeOut("slow","linear", function() {
        $(".game").fadeIn("slow","linear");
        $(".game").css('display','flex');
        $(".info").fadeIn("slow","linear");
        $(".pause").fadeIn("slow","linear");
        jeu();
      });
    }
  });

  $("button#intermediaire").bind("click",function() {
    if (localStorage.getItem("level") == "") {
      localStorage.setItem("level","intermediaire");
      $(".level").fadeOut("slow","linear", function() {
        $(".game").fadeIn("slow","linear");
        $(".game").css('display','flex');
        $(".info").fadeIn("slow","linear");
        $(".pause").fadeIn("slow","linear");
        jeu();
      });
    }
  });

  $("button#difficile").bind("click",function() {
    if (localStorage.getItem("level") == "") {
      localStorage.setItem("level","difficile");
      $(".level").fadeOut("slow","linear", function() {
        $(".game").fadeIn("slow","linear");
        $(".game").css('display','flex');
        $(".info").fadeIn("slow","linear");
        $(".pause").fadeIn("slow","linear");
        jeu();
      });
    }
  });

  $("button.quitter").one("click",function () {
    $(".game").fadeOut("slow","linear");
    $(".info").fadeOut("slow","linear");
    $(".pause").fadeOut("slow","linear");
    $(".menu").fadeIn("slow","linear");
    $(".winlose").fadeOut("slow","linear", function() {
      $(location).attr("href", "index.html");
    });
  });

});
