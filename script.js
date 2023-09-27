var dados = [];

function enviar_dados() {
    var nome = document.getElementById("nome_produto").value;
    var unidade = document.getElementById("unidade_produto").value;
    var valor = document.getElementById("valor_produto").value;
    var descricao = document.getElementById("descricao_produto").value;
    unidade = parseFloat(unidade)
    valor = parseInt(valor)
    if (!nome || !unidade || !valor || !descricao) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    var objeto = {
        nome: nome,
        unidade: unidade,
        valor: valor,
        descricao: descricao
    };

    dados.push(objeto);


    atualizarTabela();
    

    document.getElementById("nome_produto").value = ""
    document.getElementById("unidade_produto").value = ""
    document.getElementById("valor_produto").value = ""
    document.getElementById("descricao_produto").value = ""
}

function atualizarTabela() {

    document.getElementById("nome_produto").value = "";
    document.getElementById("unidade_produto").value = "";
    document.getElementById("valor_produto").value = "";
    document.getElementById("descricao_produto").value = ""

    var tabela = document.getElementById("minha_tabela");
    var tbody = tabela.querySelector("tbody");


    tbody.innerHTML = "";

    for (var i = 0; i < dados.length; i++) {
        var linha = document.createElement("tr");
        var colunas = ["nome", "unidade", "valor", "descricao"];

        for (var j = 0; j < colunas.length; j++) {
            var coluna = document.createElement("td");
            coluna.textContent = dados[i][colunas[j]];
            linha.appendChild(coluna);
        }

        var colunaAcoes = document.createElement("td");

        //botao excluir
        var botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.classList.add("excluir");
        botaoExcluir.dataset.index = i;

        botaoExcluir.onclick = function () {
            excluir_linha(this);
        };

        //botao editar
        var botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.classList.add("editar");
        botaoEditar.dataset.index = i;

        botaoEditar.onclick = function () {
            editar_linha(this);
        };

        
        colunaAcoes.appendChild(botaoExcluir);
        colunaAcoes.appendChild(botaoEditar);
        linha.appendChild(colunaAcoes);
        atualizarCompra()
        tbody.appendChild(linha);
    }
}

function excluir_linha(botao) {
    var index = botao.dataset.index;
    if (index !== undefined) {
        dados.splice(index, 1);
        atualizarTabela();
    }
}
function editar_linha(botao2) {
    var index = botao2.dataset.index;
    objeto = dados[index]
    document.getElementById("nome_produto").value = objeto.nome;
    document.getElementById("unidade_produto").value = objeto.unidade;
    document.getElementById("valor_produto").value = objeto.valor;
    document.getElementById("descricao_produto").value = objeto.descricao;
    //texto Editar 
    var titulo = document.querySelector("#titulo")
    titulo.textContent = "Editar"
    //botao atualizar
    var botaoAtualizar = document.querySelector("#botaoGravar")
    botaoAtualizar.textContent = "Atualizar"
    botaoAtualizar.onclick = function () {
        alterarCadastro(botao2);
    }
}
function alterarCadastro(botao2) {
    var index = botao2.dataset.index;
    if (index !== undefined) {
        var objeto = dados[index];

        var nomeAlterado = document.getElementById("nome_produto").value;
        var unidadeAlterado = document.getElementById("unidade_produto").value;
        var valorAlterado = document.getElementById("valor_produto").value;
        var descricaoAlterado = document.getElementById("descricao_produto").value;

        objeto.nome = nomeAlterado;
        objeto.unidade = unidadeAlterado;
        objeto.valor = valorAlterado;
        objeto.descricao = descricaoAlterado;

        var titulo = document.querySelector("#titulo")
        titulo.textContent = "Cadastro"

        var botaoAtualizar = document.querySelector("#botaoGravar")
        botaoAtualizar.textContent = "Gravar"
        botaoAtualizar.onclick = function () {
            enviar_dados();
        }
        atualizarTabela();
    }
}
function atualizarCompra(){
    var cofrinho = "";
    var resultado = document.getElementById("resultado_preco")
    for(var x = 0;x < dados.length; x++){
        objeto = dados[x]
        cofrinho += (objeto.valor * objeto.unidade)
    }
    resultado.textContent = cofrinho
}
// não deixa a pagina reiniciar após clicar no button
var forms = document.getElementById("forms");

forms.addEventListener("submit", function (event) {
    event.preventDefault();
});

atualizarTabela();
