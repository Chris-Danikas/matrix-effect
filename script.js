let symbolSize = 15;
let streams = [];

function setup() {
    // creates a screen-sized black canvas
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    textSize(symbolSize);


    // sets up random lorides
    let x = 0;
    for (let i = 0; i <= width / symbolSize; i++) {
        let stream = new Stream();
        stream.generateSymbols(x, random(-500, 0));
        streams.push(stream);
        x += symbolSize;
    }
}

function draw() {
    background(0, 200);
    streams.forEach(stream => {
        stream.render();
    });
}

function Symbol(x, y, speed, first) {

    // x and y values for position rendering
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.first = first
    this.switchInterval = round(random(2, 20));

    // sets the value to a random character via encoding
    this.setToRandomSymbol = function() {
        // frameCount built-in variable in p5.js
        if (frameCount % this.switchInterval == 0) {
            // if to frameCount einai pollaplasio
            // tou switchInterval tote allaje symbol
            this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
        }
    }

    // making the symbols fall
    this.rain = function() {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }

}

// lorida fash
function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 30));
    this.speed = random(5, 15);

    // generates lorides
    this.generateSymbols = function(x, y) {

        // 50% chance of getting a white character at the start
        let first = round(random(0, 1)) == 1;

        for (let i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
            first = false;
        }
    }

    // kanei render ta symbola ths loridas
    this.render = function() {
        this.symbols.forEach(symbol => {
            if (symbol.first) {
                fill(180, 255, 180);
            } else {
                fill(0, 255, 70);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}