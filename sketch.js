/**
 *  @author
 *  @date 2022.04.23
 *
 *
 */
let font
let instructions


function preload() {
    font = loadFont('data/consola.ttf')
}


function setup() {
    let cnv = createCanvas(600, 300)
    cnv.parent('#canvas')
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 14)

    /* initialize instruction div */
    instructions = select('#ins')
    instructions.html(`<pre>
        [1,2,3,4,5] → no function
        z → freeze sketch</pre>`)
}


// draws an m by n grid at coordinates x and y, spaced out by sideLength.
function drawMbyNGrid(x, y, m, n, sideLength) {
    strokeWeight(2)
    stroke(0, 0, 80)

    // draw horizontal lines
    for (let i = m; i >= 0; i--) {
        // we want the y position to have a minus sign because that makes
        // all the lines face upward.
        let yPos = y - i * sideLength
        line(x, yPos, x + sideLength * n, yPos)
    }

    // draw vertical lines
    for (let i = 0; i <= n; i++) {
        // we want the x position to have a plus sign because that makes all
        // the lines face to the right.
        let xPos = x + i * sideLength
        line(xPos, y, xPos, y - sideLength * m)
    }
}


function draw() {
    background(234, 34, 24)

    let gridStart = new p5.Vector(width/2, 3*height/4)

    drawMbyNGrid(gridStart.x, gridStart.y, 8, 4, 20)

    stroke(0, 100, 100)
    strokeWeight(5)
    point(gridStart.x, gridStart.y)

    displayDebugCorner()
}


/** 🧹 shows debugging info using text() 🧹 */
function displayDebugCorner() {
    const LEFT_MARGIN = 10
    const DEBUG_Y_OFFSET = height - 10 /* floor of debug corner */
    const LINE_SPACING = 2
    const LINE_HEIGHT = textAscent() + textDescent() + LINE_SPACING
    fill(0, 0, 100, 100) /* white */
    strokeWeight(0)

    text(`frameCount: ${frameCount}`,
        LEFT_MARGIN, DEBUG_Y_OFFSET - LINE_HEIGHT)
    text(`frameRate: ${frameRate().toFixed(1)}`,
        LEFT_MARGIN, DEBUG_Y_OFFSET)
}


function keyPressed() {
    /* stop sketch */
    if (key === 'z') {
        noLoop()
        instructions.html(`<pre>
            sketch stopped</pre>`)
    }
}
