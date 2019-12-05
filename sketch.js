let maxIterations = 80
let leftBorder = -10
let rightBorder = 5
let topBorder = -5
let bottomBorder = 5
const MISIUREWICZ_REAL = -0.77568377 
const MISIUREWICZ_IMAGINARY = 0.13646737
const ZOOM_SPEED = .8 //Between 1 and 0
const ITERATION_COUNT_INCREASE = 1.15 //maxIterations will increase by this much when we shrink

let color1
let color2
let color3
let color4

function setup(){
	createCanvas(innerWidth, innerHeight)
	strokeWeight(1)
	color1 = color('#110133')
	color2 = color('#00918E')
	color3 = color('#4DD599')
	color4 = color('#FFDC34')
}

function draw(){
	drawMandlebrot()
	shrink(ZOOM_SPEED)
}

function drawMandlebrot(){
	for(let x = 0; x < width; x++){
		for(let y = 0; y < height; y++){
			//convert pixel coords to a complex number
			let c = new Complex(leftBorder + x/width*(rightBorder - leftBorder), topBorder + y/height*(bottomBorder - topBorder))

			let m = mandlebrot(c)
 			let mColor = decideColor(m/maxIterations)

			stroke(mColor)
			point(x,y)
		}
	}
}

function mandlebrot(c){
	let z = new Complex(0, 0)
	let iterations = 0
	while(z.abs() < 2 && iterations < maxIterations){
		z = z.multiply(z)
		z = z.add(c)
		iterations++
	}
	return iterations
}

function shrink(coefficient){
	leftBorder = lerp(leftBorder, MISIUREWICZ_REAL, coefficient)
	rightBorder = lerp(rightBorder, MISIUREWICZ_REAL, coefficient)
	topBorder = lerp(topBorder, MISIUREWICZ_IMAGINARY, coefficient)
	bottomBorder = lerp(bottomBorder, MISIUREWICZ_IMAGINARY, coefficient)
	maxIterations *= ITERATION_COUNT_INCREASE
}

function decideColor(interval){
	if(interval>.68) return lerpColor(color3, color4, 3*(interval%.34));
	if(interval>.34) return lerpColor(color2, color3, 3*(interval%.34));
	if(interval>=0) return lerpColor(color1, color2, 3*(interval%.34));
}