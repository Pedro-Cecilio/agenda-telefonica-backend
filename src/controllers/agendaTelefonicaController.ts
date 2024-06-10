import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { CriarTelefoneRepository } from "../repositories/CriarTelefoneRepository"
import { ContatoRepository } from "../repositories/ContatoRepository"


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
        return reply.status(400).send({ error: "Dados Invalidos" })
    }
    const { nome, idade, telefones } = result.data

    try {
        const contatoRepository = new ContatoRepository()
        const novoContato = await contatoRepository.CriarContato(nome, idade)

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
export async function buscarContatos (request: FastifyRequest, reply: FastifyReply){
    const criarContatoSchema = z.object({
        search: z.coerce.string().optional()
    })
    const result = criarContatoSchema.safeParse(request.query)
    if (!result.success) {
        return reply.status(400).send({ error: "Dados Invalidos" })
    }
    const { search } = result.data
    const contatoRepository = new ContatoRepository()

    // Converta o termo de pesquisa para minúsculas
    if (search) {
        try {
            const contatos = await contatoRepository.PesquisarContato(search)
            reply.status(200).send(contatos)
        } catch (error) {
            if (error instanceof Error) {
                return reply.status(500).send({ error: error.message });
            }
        }
    }
    const todosContatos =  await contatoRepository.BuscaTodosContatos();
    reply.send(todosContatos)

}
export async function atualizarContatos(request: FastifyRequest, reply: FastifyReply){
    const criarContatoSchema = z.object({
        id: z.number(),
        nome: z.string(),
        idade: z.coerce.number(),
        telefonesAntigos: z.array(z.object({
            id: z.number(),
            contatoId: z.number(),
            numero: z.string()
        }).optional()),
        telefonesNovos: z.array(z.string().optional()),
        telefonesDeletados: z.array(z.object({
            id: z.number(),
            contatoId: z.number(),
            numero: z.string()
        }).optional())
    });

    const result = criarContatoSchema.safeParse(request.body);
    if (!result.success) {
        return reply.status(400).send({ error: "Dados Inválidos" });
    }    

    try {
        const contatoRepository = new ContatoRepository()
        await contatoRepository.atualizarContato(result)

        reply.status(200).send({ success: 'Contato Atualizado com Sucesso' });
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(500).send({ error: error.message });
        }
    }
}
export async function deletarContato (request: FastifyRequest, reply: FastifyReply){
    const idContatoSchema = z.object({
        id: z.coerce.number(),

    })
    const result = idContatoSchema.safeParse(request.params)
    if (!result.success) {
        return reply.status(400).send({ error: "Contato inválido" })
    }
    const { id } = result.data
    const contatoRepository = new ContatoRepository()

    try {
        await contatoRepository.DeletarContato(id)
        reply.status(200).send({ success: 'Contato excluído com sucesso' });
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(500).send({ error: error.message });
        }
    }
}