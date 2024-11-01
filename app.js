class Despesa {
    constructor (ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    
    validarDados() {
        //através do for in é possível acessar o índice de um array ou os atributos de um objeto(não seus valores)
        //caso qualquer um dos valores do atributo seja, undefined, null ou vazio, este método retorna false
        for(let i in this) {
            if (this[i] === undefined || this[i] === null || this[i] === '') {
                return false
            }
        }
        return true
    }

} 

//Objetos existem apenas na instância da aplicação, logo eles não podem ser transitados para o storage, por isso se usa o JSON.
//Ao usar a stringfy em um objeto ela pode ser transitada normalmente.
class Bd {
    constructor() {
        //setando um Id caso ele ainda nã exista no local storage
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }
}

let bd  = new Bd() 

//função que resgata valores inseridos nos campos do html
function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')
     
    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)
    
    if (despesa.validarDados()) {
        bd.gravar(despesa)
        
        $('#sucessoGravacao').modal('show')
    } else {
        $('#erroGravacao').modal('show')
    }
    
}

