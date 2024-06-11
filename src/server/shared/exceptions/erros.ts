export class AgendaTelefonicaErro extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class ValidacaoErro extends AgendaTelefonicaErro {
    constructor(message: string) {
        super(message, 400);
    }
}

export class NaoEncontradoErro extends AgendaTelefonicaErro {
    constructor(message: string) {
        super(message, 404);
    }
}