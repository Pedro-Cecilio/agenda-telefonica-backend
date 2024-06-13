import { z } from "zod"
import { ZodError } from "../zod/zodError/zodError"
import { ValidacaoErro } from "../exceptions/erros"

export const validarSafeParseZod = <T>(safeParse: z.SafeParseReturnType<any, T>) => {
    if (!safeParse.success) {
        const errorMessage: ZodError[] = JSON.parse(safeParse.error.message)
        throw new ValidacaoErro(errorMessage[0].message)
    }
    return safeParse.data;
}

export const validarSeIdEnumerico = (id: string): number => {
    if (/^\d+$/.test(id)) {
        return parseInt(id, 10);
    }
    throw new ValidacaoErro("Id deve ser do tipo numérico.");

}

export const validarFormatoTelefone = (telefone: string) => {
    const regexTelefone: RegExp = /^\s*\d{2}9\d{8}\s*$/
    if (!regexTelefone.test(telefone)) {
        throw new ValidacaoErro("Telefone com formato inválido. Padrão esperado: 11988886666")
    }
    return telefone.trim();
}