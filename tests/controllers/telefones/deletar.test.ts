import { Telefone } from "@prisma/client";
import { prisma } from "../../../src/server/database/database";
import { testServer } from "../../jest.setup";
import { Response } from "supertest";

describe("Telefone - deletar", ()=>{

    let telefone: Telefone;
    

    beforeEach(async ()=>{
        telefone = await prisma.telefone.findFirstOrThrow();
    })
    it("Deve ser possível deletar um telefone corretamente", async ()=>{
        const resposta : Response = await testServer
           .delete(`/telefones/${telefone.id}`)
           .expect(200)

        expect(resposta.text).toBe("Telefone excluído com sucesso.")
    })

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