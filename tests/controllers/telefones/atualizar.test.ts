import { Telefone } from "@prisma/client";
import { prisma } from "../../../src/server/database/database";
import { testServer } from "../../jest.setup";
import { Response } from "supertest";
import { TelefoneFixture } from "../../fixture/telefone/telefoneFixture";

describe("Telefone - atualizar", () => {

    let telefoneFixture: TelefoneFixture;
    let telefone: Telefone;
    
    beforeAll(() => {
        telefoneFixture = new TelefoneFixture()
    })
    beforeEach(async ()=>{
        telefone = await prisma.telefone.findFirstOrThrow();
    })

    it("Deve ser possível atualizar um telefone corretamente", async () => {
        const novosDados = telefoneFixture.telefoneCorreto();
        const resposta: Response = await testServer.put(`/telefones/${telefone.id}`)
            .send(novosDados)
            .expect(200)

        expect(resposta.body).toHaveProperty("numero", novosDados.telefone);
    })

    it("Deve falhar ao tentar atualizar telefone ao não informar a propriedade telefone", async () => {
        const resposta: Response = await testServer.put(`/telefones/${telefone.id}`)
            .send({})
            .expect(400)

        expect(resposta.body).toHaveProperty("message", "Telefone deve ser informado.");
        expect(resposta.body).toHaveProperty("statusCode", 400);
    })
    it("Deve falhar tentar atualizar telefone enviando valor de tipo diferente de string", async ()=>{
        const resposta : Response = await testServer
           .put(`/telefones/${telefone.id}`)
           .send(telefoneFixture.telefoneTipoNumber())
           .expect(400)

        expect(resposta.body).toHaveProperty("message", "Telefone deve ser uma string.")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })

    it("Deve falhar tentar atualizar telefone enviando valor em formato inválido", async ()=>{
        const resposta : Response = await testServer
           .put(`/telefones/${telefone.id}`)
           .send(telefoneFixture.telefoneFormatoInvalido())
           .expect(400)

        expect(resposta.body).toHaveProperty("message", "Telefone com formato inválido. Padrão esperado: 11988886666")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })
})