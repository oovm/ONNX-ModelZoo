import GaussianDistribution from './gaussian'


let random = new GaussianDistribution()
console.log(random.next(4)) 
console.log(random.next(5)) 

console.log(random.mean) 

