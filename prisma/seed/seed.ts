import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const popularBancoDeDados = async () => {

    try {
        await prisma.contato.deleteMany()
        await Promise.all([
            prisma.contato.create({
                data: {
                    nome: "Pedro",
                    idade: 23,
                    telefones: {
                        create: {
                            numero: "31975642958"
                        },
                    }
                }
            }),

            prisma.contato.create({
                data: {
                    nome: 'Ana',
                    idade: 30,
                    telefones: {
                        create: [
                            { numero: '11987654321' },
                            { numero: '21987654321' },
                        ],
                    },
                },
            }),

            prisma.contato.create({
                data: {
                    nome: 'Carlos',
                    idade: 28,
                    telefones: {
                        create: {
                            numero: '31912345678',
                        },
                    },
                },
            })
        ]);

        console.log("Banco de dados populado com sucesso!");
    } catch (error) {
        console.error("Erro ao popular banco de dados:", error);
    } finally {
        await prisma.$disconnect();
    }
};

popularBancoDeDados();
