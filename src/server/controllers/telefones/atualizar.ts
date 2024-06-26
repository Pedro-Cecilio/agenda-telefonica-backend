import { FastifyReply, FastifyRequest } from "fastify";
import { idTelefoneSchema, telefoneSchema } from "../../shared/zod/zodSchema/telefone";
import { validarSafeParseZod } from "../../shared/validacoes/validacoes";
import { TelefoneRepository } from "../../database/repositories/TelefoneRepository";
import { NaoEncontradoErro } from "../../shared/exceptions/erros";

export async function atualizar(request: FastifyRequest, reply: FastifyReply) {
    const novoTelefoneParsed = telefoneSchema.safeParse(request.body)
    const idTelefoneParsed = idTelefoneSchema.safeParse(request.params)

    const { telefone } = validarSafeParseZod(novoTelefoneParsed)
    const { id } = validarSafeParseZod(idTelefoneParsed)

    const telefoneRepository = new TelefoneRepository()
    const telefoneASerAtualizado = await telefoneRepository.buscarTelefonePorId(id);
    if (!telefoneASerAtualizado) {
        throw new NaoEncontradoErro("Telefone não encontrado.")
    }
    const telefoneAtualizado = await telefoneRepository.atualizarTelefone(id, telefone)
    reply.status(200).send(telefoneAtualizado)

}