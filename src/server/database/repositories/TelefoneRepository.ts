import { Telefone } from "@prisma/client";
import { prisma } from "../database";

export class TelefoneRepository {
    public async criarTelefone(contatoId: number, numero: string): Promise<Telefone> {
        return await prisma.telefone.create({
            data: {
                contatoId: contatoId,
                numero: numero
            },
            include: {
                contato: true,
            },
        })
    }

    public async buscarTelefones(search: string | undefined): Promise<Telefone[]> {
        return await prisma.telefone.findMany({
            where: {

                numero: {
                    contains: search,
                },

            },
            include: {
                contato: true,
            },
        });
    }

    public async buscarTelefonePorId(id: number): Promise<Telefone | null> {
        return await prisma.telefone.findUnique({
            where: {
                id: id,
            },
            include: {
                contato: true,
            },
        })
    }

    public async deletarTelefone(id: number): Promise<void>{
        await prisma.telefone.delete({
            where: {
                id: id,
            },
        });
    }

    public async atualizarTelefone(id: number, numero: string): Promise<Telefone> {
        return await prisma.telefone.update({
            where: {
                id: id,
            },
            data: {
                numero: numero
            },
            include: {
                contato: true,
            },
        })
    }
}