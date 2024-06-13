import { Response } from "supertest";
import { AdicionarTelefoneFixture } from "../../fixture/telefone/adicionarTelefoneFixture"
import { testServer } from "../../jest.setup"
import { Contato } from "@prisma/client";
import { prisma } from "../../../src/server/database/database";

describe("Telefones - adicionar", ()=>{
    let adicionarTelefoneFixture: AdicionarTelefoneFixture;
    let contato: Contato;
    beforeAll(()=>{
        adicionarTelefoneFixture = new AdicionarTelefoneFixture()
    })
    beforeEach(async () => {
        contato = await prisma.contato.findFirstOrThrow();
    })

    it("Deve ser possível adicionar um telefone a um contato corretamente", async ()=>{
        await testServer
           .post(`/telefones/${contato.id}`)
           .send(adicionarTelefoneFixture.adicionarTelefoneCorretamente())
           .expect(201)
    })

    it("Deve falhar tentar adicionar telefone sem passar a propriedade telefone", async ()=>{
        const resposta : Response = await testServer
           .post(`/telefones/${contato.id}`)
           .send({})
           .expect(400)

        expect(resposta.body).toHaveProperty("message", "Telefone deve ser informado.")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })

    it("Deve falhar tentar adicionar telefone enviando valor de tipo diferente de string", async ()=>{
        const resposta : Response = await testServer
           .post(`/telefones/${contato.id}`)
           .send(adicionarTelefoneFixture.adicionarTelefoneTipoNumber())
           .expect(400)

        expect(resposta.body).toHaveProperty("message", "Telefone deve ser uma string.")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })

    it("Deve falhar tentar adicionar telefone enviando valor em formato inválido", async ()=>{
        const resposta : Response = await testServer
           .post(`/telefones/${contato.id}`)
           .send(adicionarTelefoneFixture.adicionarTelefoneFormatoInvalido())
           .expect(400)

        expect(resposta.body).toHaveProperty("message", "Telefone com formato inválido. Padrão esperado: 11988886666")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })

})