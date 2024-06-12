import { FastifyInstance} from 'fastify'

import { contatoController } from '../controllers/contatos'
import { telefoneController } from '../controllers/telefones';

export async function agendaTelefonica(app: FastifyInstance) {
    app.post('/contatos', contatoController.criar)
    app.get('/contatos', contatoController.buscar)
    app.put('/contatos/:id', contatoController.atualizar);
    app.delete('/contatos/:id', contatoController.deletar); 

    app.post("/telefones/:id", telefoneController.adicionar)
    app.get("/telefones", telefoneController.buscar)
    app.delete("/telefones/:id", telefoneController.deletar)
    app.put("/telefones/:id", telefoneController.atualizar)
}

