import { z } from "zod";
import { validarFormatoTelefone, validarSeIdEnumerico } from "../../validacoes/validacoes";

export const criarContatoSchema = z.object({
    nome: z.string({
        required_error: "Nome deve ser informado."
    })
    .transform((nome) => nome.trim())
    .refine((nome) => nome.length > 0, "Nome deve ser informado."),

    idade: z.number({
        invalid_type_error: "Idade deve ser um número inteiro.",
        required_error: "Idade deve ser informada."
    }).int("Idade deve ser um número inteiro."),
    telefones: z.string({
        required_error: "Telefones deve ser informado.",
        invalid_type_error: "Telefones deve ser um array de string."
    }).transform(validarFormatoTelefone).array().min(1, "Ao menos um telefone deve ser informado.")
})

export const idContatoSchema = z.object({
    id: z.string().nonempty({ message: "Id deve ser informado." }).transform(validarSeIdEnumerico),
});

export const novosDadosContatoSchema = z.object({
    nome: z.string({
        invalid_type_error: "Nome deve ser do tipo string."
    }).optional()
    .transform((nome)=> nome?.trim())
    .refine((nome) => nome == undefined || nome.length > 0 , "Nome deve ser informado."),
    idade: z.number({
        invalid_type_error: "Idade deve ser do tipo numérico."
    }).optional(),
});

export type criarContatoType = z.infer<typeof criarContatoSchema>;