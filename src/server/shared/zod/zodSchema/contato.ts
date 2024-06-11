import { z } from "zod";
import { validarFormatoTelefone, validarSeIdEnumerico } from "../../validacoes/validacoes";

export const criarContatoSchema = z.object({
    nome: z.string({
        required_error:"Nome deve ser informado."
    }),
    idade: z.number({
        invalid_type_error: "Idade dever ser de tipo numérico.",
        required_error:"Idade deve ser informada."
    }),
    telefones: z.array(z.string().transform(validarFormatoTelefone))
})

export const idContatoSchema = z.object({
    id: z.string().nonempty({ message: "Id deve ser informado." }).transform(validarSeIdEnumerico),
});

export const novosDadosContatoSchema = z.object({
    nome: z.string({
        invalid_type_error: "Nome deve ser do tipo string."
    }).optional(),
    idade: z.number({
        invalid_type_error: "Idade deve ser do tipo numérico."
    }).optional(),
});

