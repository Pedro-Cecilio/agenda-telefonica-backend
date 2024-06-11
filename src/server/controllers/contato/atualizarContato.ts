import { FastifyReply, FastifyRequest } from "fastify"
import { ContatoRepository } from "../../database/repositories/ContatoRepository"
import { validarSchemaZod } from "../../shared/validacoes/validacoes";
import {idContatoSchema, novosDadosContatoSchema } from "../../shared/zod/zodSchema/contato";
import { NaoEncontradoErro } from "../../shared/exceptions/erros";



export async function atualizarContato(request: FastifyRequest, reply: FastifyReply) {
    const contatoRepository = new ContatoRepository()

    const dadosIdContatoParsed = idContatoSchema.safeParse(request.params)
    const novosDadosContatoParsed = novosDadosContatoSchema.safeParse(request.body);

    const { id } = validarSchemaZod(dadosIdContatoParsed)
    const { nome, idade } = validarSchemaZod(novosDadosContatoParsed)

    const contato  = await contatoRepository.buscarContatoPorId(id);
    if (!contato) {
        throw new NaoEncontradoErro("Contato não encontrado.")
    }
    const contatoNovosDados = await contatoRepository.atualizarContato(id, nome, idade)
    reply.status(200).send(contatoNovosDados);
}