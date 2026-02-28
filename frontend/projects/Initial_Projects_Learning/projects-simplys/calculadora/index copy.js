let a = '10+2*3-5/5'
parseFloat(a)
numeros = a.split(/([+\-*/])/g)
console.log(numeros)

if (a.includes('*') === true){
    indexBefore = numeros.indexOf('*') - 1
    indexAfter = numeros.indexOf('*') + 1
    multiplicação = numeros[indexBefore] * numeros[indexAfter]
    
    console.log(multiplicação)
}