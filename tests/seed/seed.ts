import { prisma } from "../../src/server/database/database";

// import prisma
export const popularBancoDeDados = async () => {
    await prisma.contato.create({
        data: {
            nome: "Pedro",
            idade: 23,
            telefones: {
                create: {
                    numero: "31975642958"
                },
            }
        }
    });
}

