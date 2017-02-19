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

rowsCleared = 0

function clearRow(i){
    rownum = i;
    for(i=rownum; i > 0; i--){
        rowSquarks = getRowSquarks(i);
        rowSquarks.forEach(function(sq){
            sq.color = sq.neighbors[0].color;
        })
    }

    topRow = getRowSquarks(rowsCleared);

    topRow.forEach(function(sq){
        sq.color = f.value;
    })

    rowsCleared ++
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

