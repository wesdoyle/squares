var cols = 5;
var rows = 5;
var sq_size = 64;

var squarks = [];

/* Color definitions */
var a = {value : [255, 0, 0], name : "red"}
var b = {value : [0, 255, 0], name : "green"}
var c = {value : [0, 0, 255], name : "blue"}
var d = {value : [30, 30, 30], name : "black"}
var e = {value : [215, 215, 215], name : "white"}

/* Array representing available colors */
var availableColors = [a.value, b.value, c.value, d.value, e.value]

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

function getRowSquarks(n){
    target = squarks[n];
    rowArray = [];

    squarks.forEach(function(sq){
        if(sq.row_num == target.row_num){
            rowArray.push(sq);
        }
    });
    return rowArray;
}

function getColSquarks(n){
    target = squarks[n];
    colArray = [];

    squarks.forEach(function(sq){
        if(sq.col_num == target.col_num){
            colArray.push(sq);
        }
    });
    return colArray;
}

function evaluate(){
    erows = [];
    for(i=0; i<rows; i++){
        rowColors = []
        sqs = getRowSquarks(i);
        sqs.forEach(function(s){
            rowColors.push(s.colorName);
        })
        console.log(rowColors);
        erows.push(rowColors);
    }
    console.log("colors: ");
    console.log(erows);
}

function allSame(a){
    var x = a[0];
    for(var i=1; i<a.length; i++){
        if(x!=a[i]){
            return false;
        }
        return true;
    }
}

function getColorName(color){
            if (color == a.value){
                return colorName = a.name;
            }
            if (color == b.value){
                return colorName = b.name;
            }
            if (color == c.value){
                return colorName = c.name;
            }
            if (color == d.value){
                return colorName = d.name;
            }
            if (color == e.value){
                return colorName = e.name;
            }
}

function Squark(x, y, n){
    this.index = n;
    this.x = x;
    this.y = y;
    this.row_num = floor(1 + this.y/sq_size);
    this.col_num = floor(1 + this.x/sq_size);
    this.color = getRandomColor();
    this.colorName = getColorName(this.color);

    this.display = function() {
        fill(this.color);
        rect(this.x, this.y, sq_size, sq_size)
    }

    this.clickedOn = function() {
        if(mouseX > this.x && mouseX < this.x + sq_size && mouseY > this.y && mouseY < this.y + sq_size){

            newColor = [];
            newColorName = "";

            if (this.color == a.value){
                newColor = b.value;
                newColorName = b.name
            }

            if (this.color == b.value){
                newColor = c.value;
                newColorName = c.name
            }

            if (this.color == c.value){
                newColor = d.value;
                newColorName = d.name
            }

            if (this.color == d.value){
                newColor = e.value;
                newColorName = e.name
            }

            if (this.color == e.value){
                newColor = a.value;
                newColorName = a.name
            }

            var neighbors = getNeighbors(this.index);

            var N = neighbors[0];
            var E = neighbors[1];
            var S = neighbors[2];
            var W = neighbors[3];

            N != null ? N.color = newColor : null;
            N != null ? N.colorName = newColorName : null;

            E != null ? E.color = newColor : null;
            E != null ? E.colorName = newColorName : null;

            S != null ? S.color = newColor : null;
            S != null ? S.colorName = newColorName : null;

            W != null ? W.color = newColor : null;
            W != null ? W.colorName = newColorName : null;

            this.color = newColor;
            this.colorName = newColorName;

            evaluate();
        }
    }
}
