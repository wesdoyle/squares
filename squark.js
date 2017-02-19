function Squark(x, y, n){
    this.index = n;
    this.x = x;
    this.y = y;

    this.xspeed = 1;
    this.yspeed = -1;

    this.neighbors = [];

    this.row_num = floor(1 + this.y/sq_size);
    this.col_num = floor(1 + this.x/sq_size);
    this.color = getRandomColor();
    this.colorName = getColorName(this.color);

    this.display = function() {
        fill(this.color);
        rect(this.x, this.y, sq_size, sq_size);
        this.neighbors = getNeighbors(this.index);
    }

    this.update = function(){
        this.x = this.x + this.xspeed;
        this.y = this.y + this.yspeed;
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

            this.neighbors = getNeighbors(this.index);

            var N = this.neighbors[0];
            var E = this.neighbors[1];
            var S = this.neighbors[2];
            var W = this.neighbors[3];

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
            console.log(this.neighbors[0])

            evaluate();
        }
    }
}
