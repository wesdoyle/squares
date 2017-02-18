var cols = 8;
var rows = 8;

var squarks = [];

/* Color definitions */
var a = [153, 184, 152]
var b = [254, 206, 168]
var c = [255, 132, 124]
var d = [232, 74, 95]
var e = [42, 54, 59]

/* Array representing available colors */
var availableColors = [a, b, c, d, e]

colors = [];
position = [];

/* Get a random color from colors */
function getRandomColor(x) {
        var newColor = availableColors[Math.floor(Math.random()
                * availableColors.length)];
        if (newColor == x) {
            getRandomColor(x);
        }
        return newColor;
};

function setup(){
    var n = 0
    createCanvas(401, 401);
    colorMode(RGB)
        for (var i = 0; i < 8; i++){
            for (var j = 0; j < 8; j++){
                var x = i*50;
                var y = j*50;
                squarks.push(new Squark(x, y, n));
                n = n + 1;
            }
        }
}

function draw(){
    background(30);

    for (var i = 0; i < squarks.length; i++){
        squarks[i].display();
    }
}

function mousePressed(){
    for (var i = 0; i < squarks.length; i++){
        squarks[i].clickedOn();
    }
}

function getNeighbors(n){
    var N = squarks[n-1];
    var E = squarks[n+8];
    var S = squarks[n+1];
    var W = squarks[n-8];
    var neighbors = [N, E, S, W];
    return neighbors;
}

function Squark(x, y, n){
    this.index = n;
    this.x = x;
    this.y = y;
    this.color = getRandomColor();

    this.display = function() {
        fill(this.color);
        rect(this.x, this.y, 50, 50)
    }

    this.clickedOn = function() {
        if(mouseX > this.x && mouseX < this.x + 50 && mouseY > this.y && mouseY < this.y + 50){

            newColor = [0, 0, 0];

            if (this.color == a){
                var newColor = b;
            }

            if (this.color == b){
                var newColor = c;
            }

            if (this.color == c){
                var newColor = d;
            }

            if (this.color == d){
                var newColor = e;
            }

            if (this.color == e){
                var newColor = a;
            }

            var neighbors = getNeighbors(this.index);

            var N = neighbors[0];
            var E = neighbors[1];
            var S = neighbors[2];
            var W = neighbors[3];

            N.color = newColor;
            E.color = newColor;
            S.color = newColor;
            W.color = newColor;

            console.log(this.index)
        }
    }
}
