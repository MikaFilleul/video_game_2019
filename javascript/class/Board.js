class Board {
  constructor() {
    var canvasDiv = document.getElementsByClassName("game");
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id","cnv");
    canvas.setAttribute("class","cnv");
    this.width = (parseInt(window.getComputedStyle(canvasDiv[0]).width) * 0.7) + "px";
    canvas.setAttribute("width", this.width);
    this.height = (parseInt(window.getComputedStyle(canvasDiv[0]).height) * 0.9) + "px";
    canvas.setAttribute("height", this.height);
    canvasDiv[0].appendChild(canvas);
    if(typeof G_vmlCanvasManager != "undefined") {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    this.context = canvas.getContext("2d");
  }

  clearGameBoard() {
    this.context.clearRect(0, 0, parseInt(this.width), parseInt(this.height));
  }
}
