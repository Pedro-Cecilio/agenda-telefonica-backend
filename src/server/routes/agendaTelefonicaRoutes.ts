import { FastifyInstance} from 'fastify'

import { contatoController } from '../controllers/contatos'
import { telefoneController } from '../controllers/telefones';

export async function agendaTelefonica(app: FastifyInstance) {
    app.post('/contatos', contatoController.criarContato)
    app.get('/contatos', contatoController.buscarContatos)
    app.put('/contatos/:id', contatoController.atualizarContato);
    app.delete('/contatos/:id', contatoController.deletarContato); 

    app.post("/telefones/:id", telefoneController.adicionarTelefone)
    app.get("/telefones", telefoneController.buscarTelefones)
    app.delete("/telefones/:id", telefoneController.deletarTelefone)
    app.put("/telefones/:id", telefoneController.atualizarTelefone)
}

