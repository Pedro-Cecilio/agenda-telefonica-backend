import { testServer } from "../../jest.setup"
import { prisma } from "../../../src/server/database/database"
import { CriarContatoFixture } from "../../fixture/contato/criarContatoFixture"

describe("Contatos - criar", ()=>{
    let criarContatoFixture: CriarContatoFixture;

    beforeAll(()=>{
        criarContatoFixture = new CriarContatoFixture();
    })

    afterEach(async ()=>{
        await prisma.contato.deleteMany()
    })

    it("Deve criar um contato corretamente", async ()=>{
        await testServer
        .post("/contatos")
        .send(criarContatoFixture.criarContatoCorretamente())
        .expect(201)
    })

    it("Deve falhar ao não enviar nome", async ()=>{
        const resposta = await testServer
        .post("/contatos")
        .send(criarContatoFixture.criarContatoSemNome())
        .expect(400)

        expect(resposta.body).toHaveProperty("message", "Nome deve ser informado.")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })

    it("Deve falhar ao enviar nome vazio", async ()=>{
        const resposta = await testServer
        .post("/contatos")
        .send(criarContatoFixture.criarContatoNomeVazio())
        .expect(400)

        expect(resposta.body).toHaveProperty("message", "Nome deve ser informado.")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })

    it("Deve falhar ao não enviar idade", async ()=>{
        const resposta = await testServer
        .post("/contatos")
        .send(criarContatoFixture.criarContatoSemIdade())
        .expect(400)

        expect(resposta.body).toHaveProperty("message", "Idade deve ser informada.")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })

    it("Deve falhar ao enviar idade como string", async ()=>{
        const resposta = await testServer
        .post("/contatos")
        .send(criarContatoFixture.criarContatoIdadeString())
        .expect(400)

        expect(resposta.body).toHaveProperty("message", "Idade deve ser um número inteiro.")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })

    it("Deve falhar ao enviar idade como um número flutuante", async ()=>{
        const resposta = await testServer
        .post("/contatos")
        .send(criarContatoFixture.criarContatoIdadeNumeroFlutuante())
        .expect(400)

        expect(resposta.body).toHaveProperty("message", "Idade deve ser um número inteiro.")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })

    it("Deve falhar ao não enviar telefones", async ()=>{
        const resposta = await testServer
        .post("/contatos")
        .send(criarContatoFixture.criarContatoSemTelefones())
        .expect(400)

        expect(resposta.body).toHaveProperty("message", "Telefones deve ser informado.")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })


    it("Deve falhar ao enviar telefones vazio", async ()=>{
        const resposta = await testServer
        .post("/contatos")
        .send(criarContatoFixture.criarContatoTelefonesVazio())
        .expect(400)

        expect(resposta.body).toHaveProperty("message", "Ao menos um telefone deve ser informado.")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })

    it("Deve falhar ao enviar telefones como uma array de number", async ()=>{
        const resposta = await testServer
        .post("/contatos")
        .send(criarContatoFixture.criarContatoTelefoneArrayNumerico())
        .expect(400)

        expect(resposta.body).toHaveProperty("message", "Telefones deve ser um array de string.")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })

    it("Deve falhar ao enviar telefones como um telefone fora do padrão esperado", async ()=>{
        const resposta = await testServer
        .post("/contatos")
        .send(criarContatoFixture.criarContatoTelefonePadraoInvalido())
        .expect(400)

        expect(resposta.body).toHaveProperty("message", "Telefone com formato inválido inválido. Padrão esperado: 11988886666")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })
    it("Deve falhar ao enviar telefones ao menos 1 telefone fora do padrão esperado", async ()=>{
        const resposta = await testServer
        .post("/contatos")
        .send(criarContatoFixture.criarContatoVariosTelefonesComApenasUmInvalido())
        .expect(400)

        expect(resposta.body).toHaveProperty("message", "Telefone com formato inválido inválido. Padrão esperado: 11988886666")
        expect(resposta.body).toHaveProperty("statusCode", 400)
    })
})