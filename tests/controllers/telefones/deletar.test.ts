import { testServer } from "../../jest.setup";
import { Response } from "supertest";

describe("Telefone - deletar", ()=>{
    

    it("Deve falhar ao tentar excluir um telefone, informando um id não numérico", async ()=>{
        const resposta : Response = await testServer
           .delete("/telefones/53abc")
           .expect(400)
   
           expect(resposta.body).toHaveProperty("message", "Id deve ser do tipo numérico.")
           expect(resposta.body).toHaveProperty("statusCode", 400)
    })

    it("Deve falhar ao tentar excluir um telefone inexistente", async ()=>{
        const resposta : Response = await testServer
           .delete("/telefones/0")
           .expect(404)

           expect(resposta.body).toHaveProperty("message", "Telefone não encontrado.")
           expect(resposta.body).toHaveProperty("statusCode", 404)
    })
})