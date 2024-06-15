  import mongoose, { Schema, Document } from 'mongoose';
  import { RegexList, IReceiver } from "../interfaces/ReceiverInterfaces";

  const regexList: RegexList = {
    cpf: /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/,
    cnpj: /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/,
    email: /^[a-z0-9+_.-]+@[a-z0-9.-]+$/,
    telefone: /^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/,
    chave_aleatoria: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  };

  const receiverSchema = new Schema<IReceiver>({
    nome: {
      type: String,
      maxLength: 100,
      required: true
    },
    pixKeyType: {
      type: String,
      required: true,
      enum: ['CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA'],
      message: '{VALUE} não é um tipo PIX válido'
    },
    document: {
      type: String,
      required: true,
      validate: {
        validator: function (this: IReceiver, v: string): boolean {
          const cpf_regex: boolean = regexList.cnpj.test(v)
          const cnpj_regex: boolean = regexList.cnpj.test(v)
          return cpf_regex || cnpj_regex
        },
        message: 'Documento inválido para o tipo PIX informado'
      }
    },
    receipt_email: {
      type: String,
      maxLength: 250,
      required: true,
      validate: {
        validator: function (this: IReceiver, v: string): boolean {
          return regexList.email.test(v)
        },
        message: 'E-mail de recebimento de comprovante inválido'
      }
    },
    pixKey: {
      type: String,
      maxLength: 140,
      required: true,
      validate: {
        validator: function (this: IReceiver, v: string): boolean {
          let regex_key = (this.pixKeyType as IReceiver['pixKeyType']).toLocaleLowerCase() as keyof RegexList
          const regex = regexList[regex_key];
          return regex.test(v)
        },
        message: 'Chave pix inserida é inválida, por favor, verifique seus dados'
      },
    },
    status: {
      type: String,
      default: 'RASCUNHO',
      enum: ['RASCUNHO', 'VALIDADO']
    }
  });

  const Receiver = mongoose.model<IReceiver>('Receiver', receiverSchema);

  export default Receiver;
