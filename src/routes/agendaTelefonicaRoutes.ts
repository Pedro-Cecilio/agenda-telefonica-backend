import { FastifyInstance} from 'fastify'

import { contatoController } from '../controllers/contato'

export async function agendaTelefonica(app: FastifyInstance) {
    app.post('/', contatoController.criarContato)
    app.get('/', contatoController.buscarContatos)
    app.put('/:id', contatoController.atualizarContato);
    app.delete('/:id', contatoController.deletarContato); 
}

