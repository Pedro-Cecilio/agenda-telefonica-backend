import { testServer } from "../../jest.setup";
import { Response } from "supertest";

describe("Contato  - deletar", () => {
 
    it("Deve falhar ao deletar um contato ao não informar id", async () => {
        const resposta: Response = await testServer
        .delete("/contatos/")
        .expect(400)

        expect(resposta.body).toHaveProperty("message", "Id deve ser informado.")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    });
    
    it("Deve falhar ao deletar um contato ao informar id não numérico", async () => {
        const resposta: Response = await testServer
        .delete("/contatos/53abc")
        .expect(400)

        expect(resposta.body).toHaveProperty("message", "Id deve ser do tipo numérico.")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    });

    it("Deve falhar ao tentar excluir um contato inexistente", async ()=>{
        const resposta : Response = await testServer
           .delete("/contatos/0")
           .expect(404)

           expect(resposta.body).toHaveProperty("message", "Contato não encontrado.")
           expect(resposta.body).toHaveProperty("statusCode", 404)
    })
})