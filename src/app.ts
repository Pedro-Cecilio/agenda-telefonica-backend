import fastify from "fastify";
import cors from '@fastify/cors'
import { agendaTelefonica } from "./server/routes/agendaTelefonicaRoutes";
import { registerErrorHandler } from "./server/shared/exceptions/errorHandler";

export const app = fastify()

registerErrorHandler(app)
app.register(cors)
app.register(agendaTelefonica)


