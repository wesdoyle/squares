var cols = 5;
var rows = 5;
var sq_size = 64;

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

Array.prototype.allValuesSame = function(){
    for(var i = 1; i < this.length; i++){
        if(this[i] !== this[0])
            return false;
    }
}

function checkRows(){}

function getNeighbors(n){
    var N = squarks[n-1];
    var E = squarks[n+cols];
    var S = squarks[n+1];
    var W = squarks[n-rows];
    var neighbors = [N, E, S, W];
    return neighbors;
}

function getRowSquarks(n){
    target = squarks[n];
    rowArray = [];

    squarks.forEach(function(sq){
        if(sq.row_num == target.row_num){
            rowArray.push(sq);
        }
    });

    console.log("Evaluated rows");
    console.log(rowArray);
}



function getColSquarks(n){
    target = squarks[n];
    colArray = [];

    squarks.forEach(function(sq){
        if(sq.col_num == target.col_num){
            colArray.push(sq);
        }
    });

    console.log("Evaluated columns");
    console.log(colArray);
}



function Squark(x, y, n){
    this.index = n;
    this.x = x;
    this.y = y;
    this.row_num = floor(1 + this.y/sq_size);
    this.col_num = floor(1 + this.x/sq_size);
    this.color = getRandomColor();

    this.display = function() {
        fill(this.color);
        rect(this.x, this.y, sq_size, sq_size)
    }

    this.clickedOn = function() {
        if(mouseX > this.x && mouseX < this.x + sq_size && mouseY > this.y && mouseY < this.y + sq_size){
            console.log(this.index)
            console.log("row number: " + this.row_num)
            console.log("column number: " + this.col_num)

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

            N != null ? N.color = newColor : null;
            E != null ? E.color = newColor : null;
            S != null ? S.color = newColor : null;
            W != null ? W.color = newColor : null;

            this.color = newColor;

            getRowSquarks(this.index);
            getColSquarks(this.index);
        }
    }
}
