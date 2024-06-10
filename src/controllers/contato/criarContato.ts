import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { CriarTelefoneRepository } from "../../repositories/CriarTelefoneRepository"
import { ContatoRepository } from "../../repositories/ContatoRepository"
import { ZodError } from "../../model/zod/zodError"

const criarContatoSchema = z.object({
    nome: z.string({
        required_error:"Nome deve ser informado."
    }),
    idade: z.number({
        invalid_type_error: "Idade dever ser de tipo numérico.",
        required_error:"Idade deve ser informada."
    }),
    telefones: z.array(z.string())
})

export async function criarContato(request: FastifyRequest, reply: FastifyReply){
    
    const result = criarContatoSchema.safeParse(request.body)
    if (!result.success) {
        const errorMessage: ZodError[] = JSON.parse(result.error.message)
        return reply.status(400).send(errorMessage[0].message)
    }
    const { nome, idade, telefones } = result.data

    try {
        const contatoRepository = new ContatoRepository()
        const novoContato = await contatoRepository.criarContato(nome, idade)

        const criarTelefoneRepository = new CriarTelefoneRepository()
        telefones.forEach(async (tel) => {
            await criarTelefoneRepository.CriarTelefone(novoContato.id , tel )
        })
    } catch (error) {
        if (error instanceof Error)
            return reply.status(500).send({ error: error.message })
    }
    reply.status(200).send({ sucess: 'Contato criado com sucesso' })
}