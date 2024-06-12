import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { TelefoneRepository } from "../../database/repositories/TelefoneRepository";
import { Telefone } from "@prisma/client";
const buscarTelefone = z.object({
    search: z.coerce.string().optional()
})
export async function buscar(request: FastifyRequest, reply: FastifyReply) {

    const buscarTelefoneParsed = buscarTelefone.parse(request.query)

    const { search } = buscarTelefoneParsed
    const telefoneRepository = new TelefoneRepository()
    const resposta: Telefone[] = await telefoneRepository.buscarTelefones(search)
    reply.status(200).send(resposta)

}