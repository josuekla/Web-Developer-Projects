function add(num1, num2){
    return num1 + num2
}

function subtração(a , b) {return a - b};
function multiplicacao(a, b) {return a * b};
function divisao(a, b) {return a / b};

function calculador(num1, num2, operator){
    return operator(num1, num2)
}

console.log(calculador(5, 5, multiplicacao))