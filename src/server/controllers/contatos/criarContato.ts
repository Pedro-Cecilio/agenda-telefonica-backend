import { FastifyReply, FastifyRequest } from "fastify"
import { ContatoRepository } from "../../database/repositories/ContatoRepository"
import { validarSafeParseZod } from "../../shared/validacoes/validacoes"
import { criarContatoSchema } from "../../shared/zod/zodSchema/contato"
import { TelefoneRepository } from "../../database/repositories/TelefoneRepository"



export async function criarContato(request: FastifyRequest, reply: FastifyReply) {

    const criarContatoParsed = criarContatoSchema.safeParse(request.body)
    const { nome, idade, telefones } = validarSafeParseZod(criarContatoParsed)

    const contatoRepository = new ContatoRepository()
    const telefoneRepository = new TelefoneRepository()

    const novoContato = await contatoRepository.criarContato(nome, idade)
    telefones.forEach(async (telefone) => {
        await telefoneRepository.criarTelefone(novoContato.id, telefone)
    })
    const resposta = await contatoRepository.buscarContatoPorId(novoContato.id)
    reply.status(201).send(resposta)
}