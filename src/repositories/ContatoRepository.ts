import { prisma } from "../database/database";
import { registraLogContatoDeletado } from "../utils/registraLogContatoDeletado";


export class ContatoRepository {
    public async atualizarContato(result: any) {
        const { id, nome, idade, telefonesAntigos, telefonesNovos, telefonesDeletados } = result.data;
        await prisma.$transaction(async (tx) => {
            // Deleta os telefones marcados como deletados
            if (telefonesDeletados.length) {
                for (const tel of telefonesDeletados) {
                    await tx.telefone.delete({
                        where: {
                            id: tel?.id,
                        },
                    });
                }
            }

            // Atualiza os telefones antigos se existirem
            if (telefonesAntigos.length) {
                for (const tel of telefonesAntigos) {
                    await tx.telefone.update({
                        where: {
                            id: tel?.id,
                        },
                        data: {
                            numero: tel?.numero,
                        },
                    });
                }
            }

            // Cadastra os novos telefones
            if (telefonesNovos.length) {
                for (const tel of telefonesNovos) {
                    await tx.telefone.create({
                        data: {
                            contatoId: id,
                            numero: String(tel),
                        },
                    });
                }
            }

            // Atualiza os dados de contato (nome e idade)
            await tx.contato.update({
                where: {
                    id: id,
                },
                data: {
                    nome,
                    idade,
                },
            });
        });
    }

    async BuscaTodosContatos(){
        const todosContatos = await prisma.contato.findMany({
            include: {
                telefones: true,
            },
        });
        return todosContatos
    }

    async CriarContato(nome: string, idade: number){
        const novoContato = await prisma.contato.create({
            data: {
                nome: nome,
                idade: idade
            }
        })
        return novoContato
    }

    async DeletarContato(id: number){
        await prisma.contato.delete({
            where: {
                id: id,
            },
        });
        registraLogContatoDeletado(id)
    }

    async PesquisarContato(search: string){
        const contatos = await prisma.contato.findMany({
            where: {
                OR: [
                    {
                        nome: {
                            contains: search, // Verifique se o nome do contato contém o valor da consulta
                            // Ignora diferenças entre maiúsculas e minúsculas
                        },
                    },
                    {
                        telefones: {
                            some: {
                                numero: {
                                    contains: search, // Verifique se o número do telefone contém o valor da consulta
                                },
                            },
                        },
                    },
                ],
            },
            include: {
                telefones: true, // Certifique-se de incluir os telefones
            },
        });
        return contatos
    }
}