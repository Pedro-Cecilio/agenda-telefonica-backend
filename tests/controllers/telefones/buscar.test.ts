import { Response } from "supertest"
import { testServer } from "../../jest.setup"

describe("Telefone - buscar", () => {
    it("Deve ser possível buscar todos telefones", async () => {
        const resposta: Response = await testServer.get("/telefones")
            .expect(200)

        expect(Array.isArray(resposta.body)).toBe(true)
    })
})