import { ParsedQs } from "qs";

export function queryParamValidator(query: ParsedQs, receivers: any[]){
    if (query.nome) {
        const name:string = query.nome as string;
        receivers = receivers.filter(item => item.nome.toLowerCase().includes(name.toLowerCase()));
    }
    if (query.status) {
        const status:string = query.status as string;
        receivers = receivers.filter(item => item.status.toLowerCase().includes(status.toLowerCase()));
    }
    if (query.tipo_chave) {
        const pixKeyType:string = query.tipo_chave as string;
        receivers = receivers.filter(item => item.pixKeyType.toLowerCase().includes(pixKeyType.toLowerCase()));
    }
    if (query.chave_pix) {
        const pixKey:string = query.chave_pix as string;
        receivers = receivers.filter(item => item.pixKey.toLowerCase().includes(pixKey.toLowerCase()));
    }
    
    return receivers
}   