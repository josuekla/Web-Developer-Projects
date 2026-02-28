let botoesNumeros = document.querySelectorAll('.botao-numero');
let botoesOperadores = document.querySelectorAll('.botao-operator');

botoesNumeros.forEach((button) =>
    button.addEventListener('click', function(){
        buttonInnerHTML = button.innerHTML;
        addNumber(buttonInnerHTML)
    }
))
botoesOperadores.forEach((button) =>
    button.addEventListener('click', function(){
        buttonInnerHTML = button.innerHTML;
        console.log(buttonInnerHTML)
        operator(buttonInnerHTML)
    }
))

let texto = "";
function addNumber(key){
   
    if(key === '='){
        Calcular(texto);
        texto = ''
    }
    else{
         texto += key
        document.querySelector('.tela-numeros').innerHTML = texto

    }
}

function operator(key){
    switch (key) {
        case '+':
            if (texto.endsWith(key) === false){
                texto += key
                document.querySelector('.tela-numeros').innerHTML = texto
            }
            break;
        case '-':
            console.log('-');
            break;
        case '*':
            console.log('x');
            break;
        case '/':
            console.log('/');
            break;
        default:
            break;
    }
}


function adicionarTexto(numberInput) {
    numberInput.querySelector('h1').value
    listNumber.push(numberInput)
}


function Calcular(value){
    numeros = value.split(/([+\-*/])/g);
    if (numeros.include)

}





