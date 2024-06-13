import { Contato } from "@prisma/client";
import { prisma } from "../../../src/server/database/database";
import { testServer } from "../../jest.setup";
import { Response } from "supertest";

describe("Contato  - deletar", () => {
    let contato: Contato;
    beforeEach(async () => {
        contato = await prisma.contato.findFirstOrThrow();
    })

    it("Deve deletar um contato corretamente", async () => {
        const resposta: Response = await testServer
        .delete(`/contatos/${contato.id}`)
        .expect(200)

        expect(resposta.text).toBe("Contato excluído com sucesso.")
    });

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
})