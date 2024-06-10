import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ContatoRepository } from "../../repositories/ContatoRepository"

export async function deletarContato (request: FastifyRequest, reply: FastifyReply){
    const idContatoSchema = z.object({
        id: z.coerce.number(),

    })
    const result = idContatoSchema.safeParse(request.params)
    if (!result.success) {
        return reply.status(400).send({ error: "Contato inválido" })
    }
    const { id } = result.data
    const contatoRepository = new ContatoRepository()

    try {
        await contatoRepository.deletarContato(id)
        reply.status(200).send({ success: 'Contato excluído com sucesso' });
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(500).send({ error: error.message });
        }
    }
}