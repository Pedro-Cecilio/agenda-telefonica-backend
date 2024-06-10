import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ContatoRepository } from "../../repositories/ContatoRepository"

const criarContatoSchema = z.object({
    search: z.coerce.string().optional()
})

export async function buscarContatos (request: FastifyRequest, reply: FastifyReply){
    
    const result = criarContatoSchema.parse(request.query)

    const { search } = result
    const contatoRepository = new ContatoRepository()

    if (search) {
        try {
            const contatos = await contatoRepository.pesquisarContato(search)
            reply.status(200).send(contatos)
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(500).send({ error: error.message });
            }
        }
    }
    const todosContatos =  await contatoRepository.buscaTodosContatos();
    reply.send(todosContatos)

}