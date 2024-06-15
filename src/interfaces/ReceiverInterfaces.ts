export interface RegexList {
    cpf: RegExp;
    cnpj: RegExp;
    email: RegExp;
    telefone: RegExp;
    chave_aleatoria: RegExp;
}

export interface IReceiver extends Document {
    nome: string;
    pixKeyType: 'CPF' | 'CNPJ' | 'EMAIL' | 'TELEFONE' | 'CHAVE_ALEATORIA';
    document: string;
    receipt_email: string;
    pixKey: string;
    status: 'RASCUNHO' | 'VALIDADO';
  }