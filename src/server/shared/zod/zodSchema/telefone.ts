import { z } from "zod";
import { validarFormatoTelefone, validarSeIdEnumerico } from "../../validacoes/validacoes";

export const telefoneSchema = z.object({
    telefone: z.string({
        required_error: "Telefone deve ser informado.",
        invalid_type_error: "Telefone deve ser uma string."
        
    }).transform(validarFormatoTelefone)
})

export const idTelefoneSchema = z.object({
    id: z.string().nonempty({ message: "Id deve ser informado." }).transform(validarSeIdEnumerico),
});