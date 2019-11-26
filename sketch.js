const MAX_ITER = 80

function mandlebrot(c){
   let z = new Complex(0, 0)
   let iterations = 0
   while(z.abs() < 2 && iterations < MAX_ITER){
      z = z.multiply(z)
      z = z.add(c)
      iterations++
   }
}

function setup(){
   createCanvas(innerWidth, innerHeight)
   strokeWeight(1)

   for(let x = 0; x < width; x++){
      for(let y = 0; y < height; y++){
         //convert pixel coords to a complex number
         let c = new Complex(x/width, y/height)

         let m = mandlebrot(c)
         let value = m/MAX_ITER * 255

         stroke(value)
         point(x,y)
      }
   }
}
