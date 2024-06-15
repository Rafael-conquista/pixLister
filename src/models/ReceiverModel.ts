let mongoose = require('mongoose')

let receiverSchema = new mongoose.Schema({
  nome: {
    type: String,
    maxLength: 100,
    required:true
  },
  pixKeyType: {
    type: String,
    required: true,
    enum: ['CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA'],
    message: '{VALUE} não é um status válido'
  },
  document:{
    type: String,
    required: true,
    validate: {
        validator: function(v:string){
            const cpf_regex = /^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/.test(v)
            const cnpj_regex = /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/.test(v)
            if (cpf_regex || cnpj_regex){
                return true
            }
        }
    },
    message: 'documento inválido'
  },
  receipt_email: {
    type: String,
    maxLength: 250,
    required: true,
    validate: {
        validator: function(v:string) {
            return /^[a-z0-9+_.-]+@[a-z0-9.-]+$/.test(v);
        },
    },
  message: 'e-mail de recebimento de comprovante inválido'
},
pixKey: {
    type: String,
    maxLength: 140,
    required: true,
        validator: function(v:string) {
            const pixKeyRegex = [
                /^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/.test(v),
                /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/.test(v),
                /^[a-z0-9+_.-]+@[a-z0-9.-]+$/.test(v),
                /^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/.test(v),
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v)
            ];

            return pixKeyRegex.includes(true);
        },
    },
status: {
    type: String,
    default: 'rascunho',
    enum: ['RASCUNHO','VALIDADO'],
}

});

const Receiver = mongoose.model('Receiver', receiverSchema);

export default Receiver;