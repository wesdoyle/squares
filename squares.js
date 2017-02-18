var cols = 24;
var rows = 24;
var sq_size = 34;

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
    createCanvas(cols*sq_size+1, rows*sq_size+1);
    colorMode(RGB)
        for (var i = 0; i < cols; i++){
            for (var j = 0; j < rows; j++){
                var x = i*sq_size;
                var y = j*sq_size;
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
    var E = squarks[n+cols];
    var S = squarks[n+1];
    var W = squarks[n-rows];
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
        rect(this.x, this.y, sq_size, sq_size)
    }

    this.clickedOn = function() {
        if(mouseX > this.x && mouseX < this.x + sq_size && mouseY > this.y && mouseY < this.y + sq_size){

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

            this.color = newColor;

            console.log(this.index)
        }
    }
}
