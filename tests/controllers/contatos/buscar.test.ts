import { testServer } from "../../jest.setup"

describe("Contato - Buscar", () => {

    it("Deve ser possível buscar todos os contatos cadastrados", async () => {
        const resposta = await testServer.get("/contatos")
            .expect(200)

        expect(Array.isArray(resposta.body)).toBe(true)
    })
})