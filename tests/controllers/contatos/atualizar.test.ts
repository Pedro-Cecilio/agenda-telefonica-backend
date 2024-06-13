import { Contato } from "@prisma/client";
import { AtualizarContatoFixture } from "../../fixture/contato/atualizarContatoFixture";
import { testServer } from "../../jest.setup";
import { prisma } from "../../../src/server/database/database";

describe("Contato - Atualizar", () => {
    let atualizarContatoFixture: AtualizarContatoFixture;
    let contato: Contato;

    beforeAll(async () => {
        atualizarContatoFixture = new AtualizarContatoFixture();
    })

    beforeEach(async () => {
        contato = await prisma.contato.findFirstOrThrow();
    })

    it("Deve ser possível atualizar todos os dados de um contato", async () => {
        const novosDados = atualizarContatoFixture.atualizarContatoTodosDados();
        const resposta = await testServer
            .put(`/contatos/${contato.id}`)
            .send(novosDados)
            .expect(200)

        expect(resposta.body).toHaveProperty("id", contato.id)
        expect(resposta.body).toHaveProperty("nome", novosDados.nome)
        expect(resposta.body).toHaveProperty("idade", novosDados.idade)
    })
    it("Deve ser possível atualizar somente o nome", async () => {
        const novosDados = atualizarContatoFixture.atualizarContatoNome();
        const resposta = await testServer
            .put(`/contatos/${contato.id}`)
            .send(novosDados)
            .expect(200)

        expect(resposta.body).toHaveProperty("id", contato.id)
        expect(resposta.body).toHaveProperty("nome", novosDados.nome)
        expect(resposta.body).toHaveProperty("idade", contato.idade)
    })
    it("Deve ser possível atualizar somente a idade", async () => {
        const novosDados = atualizarContatoFixture.atualizarContatoIdade();
        const resposta = await testServer
            .put(`/contatos/${contato.id}`)
            .send(novosDados)
            .expect(200)

        expect(resposta.body).toHaveProperty("id", contato.id)
        expect(resposta.body).toHaveProperty("nome", contato.nome)
        expect(resposta.body).toHaveProperty("idade", novosDados.idade)
    })

    it("Deve falhar ao tentar atualizar contato ao passar nome como string vazia", async () => {
        const novosDados = atualizarContatoFixture.atualizarContatoNomeVazio();
        const resposta = await testServer
            .put(`/contatos/${contato.id}`)
            .send(novosDados)
            .expect(400)

        expect(resposta.body).toHaveProperty("message", "Nome deve ser informado.")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })
    it("Deve falhar ao tentar atualizar contato ao passar nome como tipo numérico", async () => {
        const novosDados = atualizarContatoFixture.atualizarContatoNomeTipoNumerico();
        const resposta = await testServer
            .put(`/contatos/${contato.id}`)
            .send(novosDados)
            .expect(400)

        expect(resposta.body).toHaveProperty("message", "Nome deve ser do tipo string.")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })

    it("Deve falhar ao tentar atualizar contato ao passar idade como string", async () => {
        const novosDados = atualizarContatoFixture.atualizarContatoIdadeString();
        const resposta = await testServer
            .put(`/contatos/${contato.id}`)
            .send(novosDados)
            .expect(400)

        expect(resposta.body).toHaveProperty("message", "Idade deve ser do tipo numérico.")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })
})