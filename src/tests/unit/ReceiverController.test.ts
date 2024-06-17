import {paginate, prepareReceiverUpdate} from '../../controllers/ReceiverController'

describe("Paginate test", () => {
    it("should divide the receivers from each page", async () => {
      const receivers:any = [{
        "_id": "666e7655ed2cbfd60c336983",
        "nome": "test",
        "pixKeyType": "EMAIL",
        "document": "75.888.426/0001-22",
        "receipt_email": "teste@teste.com",
        "pixKey": "teste@teste.com",
        "status": "RASCUNHO",
    }]
      const filteredItems = paginate(receivers, 1, 10)
  
      expect(filteredItems.length).toBeLessThan(10)
    });
  });

describe("prepareReceiverUpdate test", () => {
    it("should verify if status 'RASCUNHO' and allow to update all the payload data", async () => {
      const receiver:any = {
        "_id": "666e7655ed2cbfd60c336983",
        "nome": "teste",
        "pixKeyType": "EMAIL",
        "document": "75.888.426/0001-22",
        "receipt_email": "teste@teste.com",
        "pixKey": "teste@teste.com",
        "status": "RASCUNHO",
    }
    const receiver_update:any = {
        "_id": "666e7655ed2cbfd60c336983",
        "nome": "teste update",
        "pixKeyType": "cnpj",
        "document": "75.888.426/0001-22",
        "receipt_email": "testeupdate@teste.com",
        "pixKey": "75.888.426/0001-22",
        "status": "VALIDADO",
    }
    const [new_body, message] = prepareReceiverUpdate(receiver, receiver_update);
  
    expect(message).toBe('Recebedor atualizado com sucesso')
    expect(new_body).toBe(receiver_update)
    });

it("should verify if status 'VALIDAO' and allow to update only the receipt_email", async () => {
        const receiver:any = {
          "_id": "666e7655ed2cbfd60c336983",
          "nome": "teste",
          "pixKeyType": "EMAIL",
          "document": "75.888.426/0001-22",
          "receipt_email": "teste@teste.com",
          "pixKey": "teste@teste.com",
          "status": "VALIDADO",
      }
      const receiver_update:any = {
          "_id": "666e7655ed2cbfd60c336983",
          "nome": "teste update",
          "pixKeyType": "cnpj",
          "document": "75.888.426/0001-22",
          "receipt_email": "testeupdate@teste.com",
          "pixKey": "75.888.426/0001-22",
          "status": "VALIDADO",
      }
      const [new_body, message] = prepareReceiverUpdate(receiver, receiver_update);
      console.log(new_body)
      expect(message).toBe('Recebedor já validado, apenas será possível atualização de seu email de recebimento de comprovante')
      expect(new_body).toHaveProperty('receipt_email', 'testeupdate@teste.com');
      expect(new_body).not.toHaveProperty('status');
      expect(new_body).not.toHaveProperty('nome');
      expect(new_body).not.toHaveProperty('pixKeyType');
      expect(new_body).not.toHaveProperty('document');
      expect(new_body).not.toHaveProperty('pixKey');
      });
  });