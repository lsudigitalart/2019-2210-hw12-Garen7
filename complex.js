
class Complex{
   constructor(real, imaginary){
      this.real = real
      this.imaginary = imaginary
   }

   abs(){
      return Math.sqrt(this.real**2 + this.imaginary**2)
   }

   add(addend){
      if(typeof addend == "object"){
         return Complex(this.real + addend.real, this.imaginary + addend.imaginary)
      }

      return Complex(this.real + addend, this.imaginary)
   }

   multiply(multiplier){
      if(typeof multiplier == "object"){
         return Complex(this.real * multiplier.real - this.imaginary * multiplier.imaginary, this.real * multiplier.imaginary + this.imaginary * multiplier.real)
      }

      return Complex(this.real * multiplier, this.imaginary * multiplier)
   }

   toString(){
      return this.real + " + " + this.imaginary + "i"
   }
}
