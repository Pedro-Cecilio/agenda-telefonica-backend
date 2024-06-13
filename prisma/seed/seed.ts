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
            }),
            prisma.contato.create({
                data: {
                    nome: 'Beatriz',
                    idade: 32,
                    telefones: {
                        create: {
                            numero: '21987654321',
                        },
                    },
                },
            }),
            prisma.contato.create({
                data: {
                    nome: 'Guilherme',
                    idade: 45,
                    telefones: {
                        create: {
                            numero: '11923456789',
                        },
                    },
                },
            }),
            prisma.contato.create({
                data: {
                    nome: 'Cecília',
                    idade: 29,
                    telefones: {
                        create: {
                            numero: '31987654321',
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
