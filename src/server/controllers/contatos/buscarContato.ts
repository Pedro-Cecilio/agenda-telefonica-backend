import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ContatoRepository } from "../../database/repositories/ContatoRepository"
import { Contato } from "@prisma/client"

const buscarContato = z.object({
    search: z.coerce.string().optional()
})

export async function buscarContatos(request: FastifyRequest, reply: FastifyReply) {

    const buscarContatoParsed = buscarContato.parse(request.query)

    const { search } = buscarContatoParsed
    const contatoRepository = new ContatoRepository()
    let contatos: Contato[] = await contatoRepository.buscarContatos(search)
    reply.status(200).send(contatos)

}