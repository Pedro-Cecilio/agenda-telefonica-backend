import { SafeParseReturnType, ZodError, ZodIssue } from "zod"
import { criarContatoType } from "../../../../src/server/shared/zod/zodSchema/contato"
import { validarFormatoTelefone, validarSafeParseZod, validarSeIdEnumerico } from "../../../../src/server/shared/validacoes/validacoes"
import { ValidacaoErro } from "../../../../src/server/shared/exceptions/erros"

describe("Validações - validarSafeParseZod", () => {
    it("Deve ser possível validar um safeParse do zod corretamente", () => {
        const safeParseSucessoMock: SafeParseReturnType<any, criarContatoType> = {
            data: {
                nome: "Pedro",
                idade: 20,
                telefones: [
                    "999999999"
                ]
            },
            success: true,
        }

        expect(() => validarSafeParseZod(safeParseSucessoMock)).not.toThrow()
    })
    it("Deve retornar um erro ao validar um safeParse do zod", () => {
        const zodIssue: ZodIssue = {
            message: 'Erro de validação',
            code: 'custom',
            path: [],
        };
        const safeParseErroMock: SafeParseReturnType<any, criarContatoType> = {
            success: false,
            error: new ZodError([zodIssue])
        };

        expect(() => validarSafeParseZod(safeParseErroMock)).toThrow(ValidacaoErro)
    })
})
describe("Validações - validarSeIdENumerico", () => {

    it("Deve ser possível validar se id é numérico com sucesso", () => {
        const id = "553"
        expect(() => validarSeIdEnumerico(id)).not.toThrow()
    })
    test.each([
        ["553abc"],
        ["abcd"]
    ])("Deve retornar um erro ao validar se id é numérico ao informar id não numérico", (id: string) => {
        expect(() => validarSeIdEnumerico(id)).toThrow(ValidacaoErro)
    })
})
describe("Validações - validarFormatoTelefone", () => {

    it("Deve ser possível validar formato do telefone corretamente", () => {
        const telefone = "31999325578"
        expect(() => validarFormatoTelefone(telefone)).not.toThrow()
    })
    test.each([
        ["(11) 12345-6789"], 
        ["11 912345678"],    
        ["1191234567a"],     
        ["123456789012345"],
        ["3191111555"],
    ])("Deve retornar um erro ao validar formato do telefone ao informar telefone com formato inválido", (telefone: string) => {
        expect(() => validarFormatoTelefone(telefone)).toThrow(ValidacaoErro)
    })
})

