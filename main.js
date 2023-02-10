//Objeto de objetos que contem o que adicionar peca x altera no valor dos poderes do robo
const pecas = {
    "bracos": {
        "forca": 29,
        "poder": 35,
        "energia": -21,
        "velocidade": -5
    },

    "blindagem": {
        "forca": 41,
        "poder": -20,
        "energia": 0,
        "velocidade": 20
    },
    "nucleos":{
        "forca": 0,
        "poder": 7,
        "energia": 48,
        "velocidade": -24
    },
    "pernas":{
        "forca": 27,
        "poder": 21,
        "energia": -32,
        "velocidade": 42
    },
    "foguetes":{
        "forca": 0,
        "poder": 28,
        "energia": 0,
        "velocidade": -2
    }
}

const poderesList = document.querySelectorAll('[data-poder]'); //nome de cada poder
const pecasList = document.querySelectorAll('[data-peca]'); //nome das pecas do robo
const operacaoOption = document.querySelectorAll('[data-operacao]'); //todos os botoes com - e +
const iniciarProdButton = document.querySelector('#producao');

console.log(poderesList);



iniciarProdButton.addEventListener("click", (event) =>{
    poderesList.forEach( (element) =>{
        element.textContent = parseInt(element.textContent) - parseInt(element.textContent);
    })

    operacaoOption.forEach( (element) => {
        const divPeca = element.parentNode;
        const peca = divPeca.querySelector('[valorPeca]');
        peca.value = parseInt(peca.value) - parseInt(peca.Value);
    })
})

//aqui analisa cada botao (element) das operacoes de - e +
//caso aconteca um click em algum deles, ocorre a funcao que passa o evento como parametro e nela chama a funcao que
//executa o que o click do botao deve executar (manipular o valor, nesse caso)
//event.target => pega o elem html que causou o evento .[tipo] .[nomeEspecifico] => pega a info específica
operacaoOption.forEach((element) => {
    element.addEventListener("click", (event) => {
        manipulaValorPeca(event.target.dataset.operacao, event.target.parentNode); //valor do data-operacao e da div pai
        atualizaPoderes(event.target.dataset.peca, event.target.dataset.operacao, event.target.parentNode);  //valor do data-peca
    })

})

//essa funcao precisa de dois parametros
//OPERACAO: eh assim que sabe se tem que somar ou subtrair o valor
//DIV PECA: passa a div anterior pra usar o querySelector e selecionar a primeira ocorrencia do data-attribute valorPeca
function manipulaValorPeca(operacao, divPeca){
    const valorPeca = divPeca.querySelector('[valorPeca]');

    if(operacao === "subtrair"){
        if(parseInt(valorPeca.value) > 0){
            valorPeca.value = parseInt(valorPeca.value) - 1;
        } 
    }else{
        valorPeca.value = parseInt(valorPeca.value) + 1; 
    } 
}

function atualizaPoderes(peca , operacao, divPeca){
    const poderValues = pecas[peca];  //eh o objeto que contem os valores de poderes da causados pela peca especifica
    const pecaValue = divPeca.querySelector("[valorPeca]");

    poderesList.forEach( (poderzinho) => {
            if(operacao !== "subtrair"){
                poderzinho.textContent = parseInt(poderzinho.textContent) + poderValues[poderzinho.dataset.poder];
            } else if(parseInt(pecaValue.value) > 0){
                poderzinho.textContent = parseInt(poderzinho.textContent) - poderValues[poderzinho.dataset.poder];
            }
        })

}
