// // const numeros = [3, 5, 7, 9];
// // // Resultado esperado:
// // // 6
// // // 10
// // // 14
// // // 18

// // // numeros.forEach(function(numero) {
// // //     console.log(numero * 2)
// // // })

// // numeros.forEach((numero) => console.log(numero * 2))

// // const nomes = ['Josué', 'Maria', 'Paulo'];
// // // Resultado esperado:
// // // Olá, Josué!
// // // Olá, Maria!
// // // Olá, Paulo!

// // nomes.forEach((nome) => console.log(`Olá, ${nome}`))


// const valores = [10, 20, 30, 40];
// // Dica: use uma variável `soma = 0` fora do forEach
// // Resultado esperado:
// // Soma total: 100
// var soma = 0;
// valores.forEach(function(valor) {
//     soma += valor
// })
// console.log("Soma total: " + soma)

const alunos = [
  { nome: 'Ana', nota: 8 },
  { nome: 'Carlos', nota: 5 },
  { nome: 'Beatriz', nota: 7 }
];
// Resultado esperado:
// Ana foi aprovada!
// Carlos foi reprovado!
// Beatriz foi aprovada!

alunos.forEach(function({nome, nota}) {
    if ( nota < 7) {
        console.log(`${nome} foi reprovado(a)`)
    }
    else{
        console.log(`${nome} foi aprovado(a)!`)
    }
})