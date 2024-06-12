import { Contato } from "@prisma/client";
import { prisma } from "../database";


export class ContatoRepository {
    public async atualizarContato(id: number, nome?: string, idade?: number): Promise<Contato> {
        return await prisma.contato.update({
            where: {
                id: id,
            },
            data: {
                nome,
                idade,
            },
            include: {
                telefones: true,
            },
        });
    }

    public async criarContato(nome: string, idade: number, telefones: string[]): Promise<Contato> {
        return await prisma.contato.create({
            data: {
                nome: nome,
                idade: idade,
                telefones:{
                    createMany: {
                        data: telefones.map((numero) => ({
                            numero: numero,
                        })),
                    },
                }
            },
            include: {
                telefones: true,
            },
        })
    }

    public async deletarContato(id: number): Promise<void> {
        await prisma.contato.delete({
            where: {
                id: id,
            },
        });
    }

    public async buscarContatos(search: string | undefined): Promise<Contato[]> {
        return await prisma.contato.findMany({
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
    }

    public async buscarContatoPorId(id: number): Promise<Contato | null> {
        return await prisma.contato.findUnique({
            where: {
                id: id,
            },
            include: {
                telefones: true,
            },
        })
    }
}