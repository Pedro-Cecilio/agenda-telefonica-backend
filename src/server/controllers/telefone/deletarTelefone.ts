import { FastifyReply, FastifyRequest } from "fastify";
import { validarSchemaZod } from "../../shared/validacoes/validacoes";
import { idTelefoneSchema } from "../../shared/zod/zodSchema/telefone";
import { TelefoneRepository } from "../../database/repositories/TelefoneRepository";
import { NaoEncontradoErro } from "../../shared/exceptions/erros";


export async function deletarTelefone(request: FastifyRequest, reply: FastifyReply) {
    const idTelefoneParsed = idTelefoneSchema.safeParse(request.params)
    const { id } = validarSchemaZod(idTelefoneParsed)

    const telefoneRepository = new TelefoneRepository()
    const telefone = await telefoneRepository.buscarTelefonePorId(id)
    if (!telefone) {
        throw new NaoEncontradoErro("Telefone não encontrado.")
    }
    await telefoneRepository.deletarTelefone(id)
    reply.status(200).send("Telefone excluído com sucesso")
}
