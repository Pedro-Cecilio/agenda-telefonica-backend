import { FastifyReply, FastifyRequest } from "fastify"
import { ContatoRepository } from "../../database/repositories/ContatoRepository"
import {idContatoSchema } from "../../shared/zod/zodSchema/contato"
import { NaoEncontradoErro } from "../../shared/exceptions/erros"
import { validarSchemaZod } from "../../shared/validacoes/validacoes"



export async function deletarContato(request: FastifyRequest, reply: FastifyReply) {

    const idContatoParsed = idContatoSchema.safeParse(request.params)
    const { id } = validarSchemaZod(idContatoParsed)
    const contatoRepository = new ContatoRepository()

    const contato  = await contatoRepository.buscarContatoPorId(id);
    if (!contato) {
        throw new NaoEncontradoErro("Contato não encontrado.")
    }
    await contatoRepository.deletarContato(id)
    reply.status(200).send({ success: 'Contato excluído com sucesso' });
}