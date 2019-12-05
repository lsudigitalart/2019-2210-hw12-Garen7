let maxIterations = 80
let leftBorder = -2
let rightBorder = 1
let topBorder = -1
let bottomBorder = 1
const MISIUREWICZ_REAL = -0.77568377 
const MISIUREWICZ_IMAGINARY = 0.13646737
const ZOOM_SPEED = .9 //Between 1 and 0
const ITERATION_COUNT_INCREASE = 1.1 //maxIterations will increase by this much when we shrink

const color1 = color('#110133')
const color2 = color('#009183')
const color3 = color('#4DD599')
const color4 = color('#FFDC34')

function setup(){
	createCanvas(innerWidth, innerHeight)
	strokeWeight(1)
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
	if(interval>=.66) return lerpColor(color1, color2, 3*(interval%.33));
	if(interval>=.33) return lerpColor(color2, color3, 3*(interval%.33));
	if(interval>=0) return lerpColor(color3, color4, 3*(interval%.33));
}