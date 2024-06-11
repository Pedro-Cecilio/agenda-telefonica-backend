import { FastifyReply, FastifyRequest,  } from "fastify";
import { idContatoSchema } from "../../shared/zod/zodSchema/contato";
import { telefoneSchema } from "../../shared/zod/zodSchema/telefone";
import { validarSafeParseZod } from "../../shared/validacoes/validacoes";
import { ContatoRepository } from "../../database/repositories/ContatoRepository";
import { TelefoneRepository } from "../../database/repositories/TelefoneRepository";
import { NaoEncontradoErro } from "../../shared/exceptions/erros";



export async function adicionarTelefone(request: FastifyRequest, reply: FastifyReply){
    const dadosIdContatoParsed = idContatoSchema.safeParse(request.params)
    const dadosAdicionarTelefoneParsed = telefoneSchema.safeParse(request.body)

    const {id} = validarSafeParseZod(dadosIdContatoParsed)
    const {telefone} = validarSafeParseZod(dadosAdicionarTelefoneParsed)

    const contatoRepository = new ContatoRepository()
    const telefoneRepository = new TelefoneRepository()

    const contato =  await contatoRepository.buscarContatoPorId(id);
    if(!contato){
        throw new NaoEncontradoErro("Contato não encontrado.")
    }
    const novoTelefone = await telefoneRepository.criarTelefone(id, telefone)

    reply.status(201).send(novoTelefone);

}