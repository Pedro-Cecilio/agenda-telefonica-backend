// errorHandler.ts
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { AgendaTelefonicaErro } from './erros';

export function registerErrorHandler(app: FastifyInstance) {
    app.setErrorHandler((error: AgendaTelefonicaErro | Error, request: FastifyRequest, reply: FastifyReply) => {
        const statusCode = error instanceof AgendaTelefonicaErro ? error.statusCode : 500;
        const message = error instanceof AgendaTelefonicaErro ? error.message : 'Internal Server Error';

        reply.status(statusCode).send({
            message,
            statusCode,
        });
    });
}
