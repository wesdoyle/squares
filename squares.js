var cols = 8;
var rows = 8;

var colors = [];

function setup(){
    createCanvas(401, 401);
    for (var i = 0; i<cols; i++){
        colors[i] = []
        for (var j = 0; j<rows; j++){
            colors[i][j] = floor(random(255));
        }
    }
}

function mousPressed(){
    for (var i = 0; i < colors.length; i ++){
        console.log(colors.length)
    }
}

function draw(){
    background(30);

    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++) {
            var x = i * 50;
            var y = j * 50;
            fill(colors[i][j])
            stroke(0);
            rect(x, y, 50, 50);
        }
    }
}

