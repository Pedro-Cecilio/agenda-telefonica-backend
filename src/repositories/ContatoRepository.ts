import { prisma } from "../database/database";
import { registraLogContatoDeletado } from "../utils/registraLogContatoDeletado";


export class ContatoRepository {
    public async atualizarContato(id: number, nome?: string, idade?: number) {
        return await prisma.contato.update({
            where: {
                id: id,
            },
            data: {
                nome,
                idade,
            },
        });
    }

    async buscaTodosContatos() {
        const todosContatos = await prisma.contato.findMany({
            include: {
                telefones: true,
            },
        });
        return todosContatos
    }

    async criarContato(nome: string, idade: number) {
        const novoContato = await prisma.contato.create({
            data: {
                nome: nome,
                idade: idade
            }
        })
        return novoContato
    }

    async deletarContato(id: number) {
        await prisma.contato.delete({
            where: {
                id: id,
            },
        });
        registraLogContatoDeletado(id)
    }

    async pesquisarContato(search: string) {
        const contatos = await prisma.contato.findMany({
            where: {
                OR: [
                    {
                        nome: {
                            contains: search, 
                        },
                    },
                    {
                        telefones: {
                            some: {
                                numero: {
                                    contains: search, 
                                },
                            },
                        },
                    },
                ],
            },
            include: {
                telefones: true, 
            },
        });
        return contatos
    }
}