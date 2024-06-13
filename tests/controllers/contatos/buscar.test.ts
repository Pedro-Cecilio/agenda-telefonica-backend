import { testServer } from "../../jest.setup"

describe("Contato - Buscar", () => {

    it("Deve ser possível buscar todos os contatos cadastrados", async () => {
        const resposta = await testServer.get("/contatos")
            .expect(200)

        expect(Array.isArray(resposta.body)).toBe(true)
    })

    it("Deve ser possível buscar contatos através de search", async () => {
        const resposta = await testServer
            .get("/contatos?search=pedro")
            .expect(200)

        expect(Array.isArray(resposta.body)).toBe(true)
        expect(resposta.body.length).toBeGreaterThan(0)

    })
})