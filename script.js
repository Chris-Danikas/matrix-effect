let symbolSize = 10;
let streams = [];

function setup() {
    // creates a screen-sized black canvas
    createCanvas(windowWidth, windowHeight);
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

class Symbol {

    constructor (x, y, speed, order) {
        // x and y values for position rendering
        this.x = x;
        this.y = y;
        this.value;
        this.speed = speed;
        this.order = order
        this.switchInterval = round(random(2, 20));
    }


    // sets the value to a random character via encoding
    setToRandomSymbol() {
        // frameCount built-in variable in p5.js
        if (frameCount % this.switchInterval == 0) {
            // if to frameCount einai pollaplasio
            // tou switchInterval tote allaje symbol
            this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
        }
    }

    // making the symbols fall
    rain() {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }

}

// lorida fash
class Stream {

    constructor () {
        this.symbols = [];
        this.totalSymbols = round(random(8, 50));
        this.speed = random(5, 15);
    }

    // generates lorides
    generateSymbols(x, y) {

        for (let i = 0; i <= this.totalSymbols; i++) {
            let symbol = new Symbol(x, y, this.speed, ++i);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
        }
    }

    // kanei render ta symbola ths loridas
    render() {
        this.symbols.forEach(symbol => {

            let symbolColor;

            if (symbol.order == 1 && round(random(0, 1)) == 1) {
                symbolColor = color(50, 255, 200);
                fill(symbolColor);
            } else {
                // rainbow effect
                if (symbol.y < round(windowHeight / 5)) {
                    symbolColor = color(255, symbol.y / round(windowHeight / 5) * 255, 0);
                    symbolColor.setAlpha(256 / symbol.order * 4);
                    fill(symbolColor);                 
                }                
                else if (symbol.y >= round(windowHeight / 5) && symbol.y < 2 * round(windowHeight / 5)) {
                    symbolColor = color(255 - ((symbol.y-round(windowHeight / 5)) / round(windowHeight / 5) * 255), 255, 0);
                    symbolColor.setAlpha(256 / symbol.order * 4);
                    fill(symbolColor); 
                }
                else if (symbol.y >= 2 * round(windowHeight / 5) && symbol.y < 3 * round(windowHeight / 5)) {
                    symbolColor = color(0, 255, (symbol.y-2 * round(windowHeight / 5)) / round(windowHeight / 5) * 255);
                    symbolColor.setAlpha(256 / symbol.order * 4);
                    fill(symbolColor); 
                }
                else if (symbol.y >= 3 * round(windowHeight / 5) && symbol.y < 4 * round(windowHeight / 5)) {
                    symbolColor = color(0, 255 - ((symbol.y-3 * round(windowHeight / 5)) / round(windowHeight / 5) * 255), 255);
                    symbolColor.setAlpha(256 / symbol.order * 4);
                    fill(symbolColor); 
                }
                else if (symbol.y >= 4 * round(windowHeight / 5) && symbol.y < round(windowHeight)) {
                    symbolColor = color((symbol.y - 4 * round(windowHeight / 5)) / round(windowHeight / 5) * 255, 0, 255);
                    symbolColor.setAlpha(256 / symbol.order * 4);
                    fill(symbolColor); 
                }
            }

            //setAlpha(256 * (25 - symbol.order));
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}

// make it more like this: https://weboas.is
// next: na kanw ta pisw grammata ths loridas me ligotero opacity kai na kanw ta constructor functions classes