export class CriarContatoFixture{

    public criarContatoCorretamente(){
        return {
            nome: "Pedro",
            idade: 55,
            telefones: ["31975642958"]
        }
    }
    public criarContatoSemNome(){
        return {
            idade: 55,
            telefones: ["31975642958"]
        }
    }

    public criarContatoNomeVazio(){
        return {
            nome: "  ",
            idade: 55,
            telefones: ["31975642958"]
        }
    }

    public criarContatoSemIdade(){
        return {
            nome: "Pedro",
            telefones: ["31975642958"]
        }
    }

    public criarContatoIdadeString(){
        return {
            nome: "Pedro",
            idade: "55",
            telefones: ["31975642958"]
        }
    }

    public criarContatoIdadeNumeroFlutuante(){
        return {
            nome: "Pedro",
            idade: 55.5,
            telefones: ["31975642958"]
        }
    }

    public criarContatoSemTelefones(){
        return {
            nome: "Pedro",
            idade: 55,
        }
    }

    public criarContatoTelefonesVazio(){
        return {
            nome: "Pedro",
            idade: 55,
            telefones: []
        }
    }

    public criarContatoTelefoneArrayNumerico(){
        return {
            nome: "Pedro",
            idade: 55,
            telefones: [1234]
        }
    }

    public criarContatoTelefonePadraoInvalido(){
        return {
            nome: "Pedro",
            idade: 55,
            telefones: ["319557814"]
        }
    }

    public criarContatoVariosTelefonesComApenasUmInvalido(){
        return {
            nome: "Pedro",
            idade: 55,
            telefones: ["31955781432", "319557814"]
        }
    }
}