export class AtualizarContatoFixture{
    
    public atualizarContatoTodosDados(){
        return {
            nome: "Samuel",
            idade: 23
        }
    }

    public atualizarContatoNome(){
        return {
            nome: "Samuel"
        }
    }
    public atualizarContatoIdade(){
        return {
            idade: 23
        }
    }
    
    public atualizarContatoNomeVazio(){
        return {
            nome: " ",
        }
    }

    public atualizarContatoNomeTipoNumerico(){
        return {
            nome: 12345,
        }
    }

    public atualizarContatoIdadeString(){
        return {
            idade: "23"
        }
    }
}