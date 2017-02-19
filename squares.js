var cols = 8;
var rows = 8;
var sq_size = 50;

var squarks = [];

/* Color definitions */
var a = {value : [252, 232, 121], name : "light-yellow"}
var b = {value : [36, 201, 99], name : "green"}
var c = {value : [237, 40, 20], name : "red"}
var d = {value : [3, 60, 190], name : "blue"}
var e = {value : [86, 2, 88], name : "purple"}
var f = {value : [0, 0, 0], name: "black"}
var g = {value : [255, 255, 255], name: "white"}

/* Array representing available colors */
var availableColors = [a.value, b.value, c.value, d.value, e.value]

colors = [];
position = [];

Array.prototype.allValuesSame = function() {

    for(var i = 1; i < this.length; i++)
    {
        if(this[i] !== this[0])
            return false;
    }

    return true;
}

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
    for(i=0; i < rows; i++){
        rowColors = [];
        sqs = getRowSquarks(i);
        sqs.forEach(function(s){
            rowColors.push(s.colorName);
        })
        if (rowColors.allValuesSame()){
            clearRow(i);
        }
    }

    for(i=0; i < squarks.length; i=i+cols){
        colColors = [];
        sqs = getColSquarks(i);
        sqs.forEach(function(s){
            colColors.push(s.colorName);
        })

        if (colColors.allValuesSame()){
            clearCol(i);
        }
    }
}

function clearRow(i){
    rowSquarks = getRowSquarks(i);
    rowSquarks.forEach(function(sq){
        sq.color = g.value;
    })
}

function clearCol(i){
    colSquarks = getColSquarks(i);
    colSquarks.forEach(function(sq){
        sq.color = f.value;
    })
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
            if (color == f.value){
                return colorName = f.name;
            }
            if (color == g.value){
                return colorName = g.name;
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

            newColor = this.color;
            newColorName = this.colorName;

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

            if (this.color == f.value){
                newColor = getRandomColor();
                newColorName = getColorName(newColor);
            }

            if (this.color == g.value){
                newColor = getRandomColor();
                newColorName = getColorName(newColor);
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
            console.log(this.color)
            this.colorName = newColorName;

            evaluate();
        }
    }
}
