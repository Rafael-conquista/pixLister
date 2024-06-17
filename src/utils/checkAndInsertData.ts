import Receiver from "../models/ReceiverModel";
import * as receivers from './receivers.json';

export async function checkAndInsertData(){
    const count = await Receiver.countDocuments({});
    if (count === 0) {
        for (const receiver in receivers) {
            try{
                const receiver_base = new Receiver(receivers[receiver]);
                await receiver_base.validate();
                await receiver_base.save();
                console.log('usuario criado com sucesso')
            }catch{
                console.log('não foi possível criar usuário')
            }
        }
    } else {
      console.log('Dados já existem.');
    }
  };