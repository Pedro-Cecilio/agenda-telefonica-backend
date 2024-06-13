export class AdicionarTelefoneFixture{
    public adicionarTelefoneCorretamente(){
        return {
            telefone: "11975448123"
        }
    }
    public adicionarTelefoneTipoNumber(){
        return {
            telefone: 11975448123
        }
    }

    public adicionarTelefoneFormatoInvalido(){
        return{
            telefone: "(11)97544-8123"
        }
    }
}