function empregada (nome, idade, ExperienciasAnteriores, anosDeExperiencia, educacao){
    this.nome = nome;
    this.idade = idade;
    this.Experiencias = ExperienciasAnteriores;
    this.anosDeExperiencia = anosDeExperiencia;
    this.educacao;
    this.clean = function(){
        alert('Limpeza em andamento...')
    }

}

var ana = new empregada('ana', 53, ['Hotel dos passaros', 'hotel dos ventos'], 12, 'Ensino medio completo');
console.log(ana.nome)
console.log(ana.clean())