import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ContatoRepository } from "../../repositories/ContatoRepository"
import { ZodError } from "../../model/zod/zodError";

const idContatoSchema = z.object({
    id: z.string().nonempty({ message: "Id deve ser informado." }).transform((val) => {
        const parsed = parseInt(val, 10);
        if (isNaN(parsed)) {
            throw new Error("Id deve ser do tipo numérico.");
        }
        return parsed;
    }),
});

const novosDadosContatoSchema = z.object({
    nome: z.string({
        invalid_type_error: "Nome deve ser do tipo string."
    }).optional(),
    idade: z.number({
        invalid_type_error: "Idade deve ser do tipo numérico."
    }).optional(),
});

export async function atualizarContato(request: FastifyRequest, reply: FastifyReply) {
    const contatoRepository = new ContatoRepository()

    const dadosIdContato = idContatoSchema.safeParse(request.params)
    const novosDadosContato = novosDadosContatoSchema.safeParse(request.body);

    if (!dadosIdContato.success) {
        const errorMessage: ZodError[] = JSON.parse(dadosIdContato.error.message)
        return reply.status(400).send(errorMessage[0].message)
    }
    if (!novosDadosContato.success) {
        const errorMessage: ZodError[] = JSON.parse(novosDadosContato.error.message)
        return reply.status(400).send(errorMessage[0].message)
    }

    try {
        await contatoRepository.atualizarContato(dadosIdContato.data.id, novosDadosContato.data.nome, novosDadosContato.data.idade)
        reply.status(200).send({ success: 'Contato Atualizado com Sucesso' });
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(500).send({ error: error.message });
        }
    }
}