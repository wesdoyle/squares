var cols = 8;
var rows = 8;

/* Color definitions */
var red = [255, 0, 0]
var blu = [0, 0, 255]
var grn = [0, 255, 0]
var ylw = [255, 190, 0]
var prp = [180, 0, 200]

/* Array representing available colors */
var availableColors = [red, blu, grn, ylw, prp]

/* Get a random color from colors */
function getRandomColor() {
        return availableColors[Math.floor(Math.random() * availableColors.length)];
};

colors = [];

function setup(){
    createCanvas(401, 401);
    colorMode(RGB)
    for (var i = 0; i < cols; i++){
        colors[i] = []
        for (var j = 0; j < rows; j++){
            colors[i][j] = (getRandomColor());
        }
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

function mousePressed(){
    for (var i = 0; i < cols; i++){
        colors[i] = []
        for (var j = 0; j < rows; j++){
            colors[i][j] = (getRandomColor());
        }
    }
}


