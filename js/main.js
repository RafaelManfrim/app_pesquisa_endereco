function getDados(CEP){
    let url = 'https://viacep.com.br/ws/'+ CEP +'/json/unicode/'

    let ajax = new XMLHttpRequest()
    ajax.open('GET', url)

    ajax.onreadystatechange = () => {
        if(ajax.readyState == 4 && ajax.status == 200){
            let respostaJSON = ajax.responseText
            let objJSON = JSON.parse(respostaJSON)
            if(objJSON.erro){
                limparDados()
                modalErro()
            } else {
                apresentarDados(objJSON)
            }
        } if(ajax.readyState == 4 && ajax.status == 404) {
            limparDados()
            modalErro()
        }
    }

    ajax.send()
}

function apresentarDados(objJSON){
    document.getElementById('bairro').value = 'Bairro: ' + objJSON.bairro
    document.getElementById('endereco').value = 'Endereço: ' + objJSON.logradouro
    document.getElementById('cidade').value = 'Cidade: ' + objJSON.localidade
    document.getElementById('UF').value = 'UF: ' + objJSON.uf
    document.getElementById('DDD').value = 'DDD: ' + objJSON.ddd
}

function limparDados(){
    document.getElementById('bairro').value = ''
    document.getElementById('endereco').value = ''
    document.getElementById('cidade').value = ''
    document.getElementById('UF').value = ''
    document.getElementById('DDD').value = ''
}

function modalErro(){
    document.getElementById("corModal").className = "modal-header text-danger"
    document.getElementById("modal-title").innerHTML = "Algo deu errado"
    document.getElementById("mensagemModal").innerHTML = "O CEP informado é inválido"
    document.getElementById("closeModal").className = "btn btn-danger"
    $('#modalErro').modal('show')
}