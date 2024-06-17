import request from 'supertest';

const ApiUrl = "http://localhost:3000/pixLister";
let recebedorTeste: any;

describe("GET /listaRecebedores", () => {
  it("should return status 200 and check the return and current page", async () => {
    const response = await request(ApiUrl)
      .get("/listaRecebedores")
      .expect(200);

    expect(response.body.items.length).toBeGreaterThan(0);
    expect(response.body.page).toBe(1);
    expect(response.body.pageSize).toBe(10);
  });
});

describe("POST /Recebedores", () => {
  it("should return status 201 and correct message", async () => {
    const payload = {
      nome: "test",
      pixKeyType: "EMAIL",
      document: "75.888.426/0001-22",
      receipt_email: "teste@teste.com",
      pixKey: "teste@teste.com"
    };

    const response = await request(ApiUrl)
      .post("/Recebedor")
      .send(payload)
      .expect(201);

    recebedorTeste = response.body.recebedor;
    expect(response.body.message).toBe("Recebedor criado com sucesso");
  });

  it("should return status 400 and error message", async () => {
    const payload = {
      nome: "test",
      pixKeyType: "cnpj",
      document: "75.888.426/0001-22",
      receipt_email: "teste@teste.com",
      pixKey: "teste@teste.com"
    };

    const response = await request(ApiUrl)
      .post("/Recebedor")
      .send(payload)
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });
});

describe("PUT /Recebedores", () => {
  it("should return status 200 and update receiver", async () => {
    const payload = {
      nome: "put test",
      pixKeyType: "cnpj",
      document: "75.888.426/0001-22",
      receipt_email: "testeput@teste.com",
      pixKey: "75.888.426/0001-22"
    };

    const response = await request(ApiUrl)
      .put(`/Recebedor/${recebedorTeste._id}`)
      .send(payload)
      .expect(200);

    expect(response.body.message).toBe("Recebedor atualizado com sucesso");
    expect(response.body.recebedor).toHaveProperty('nome', 'put test');
    expect(response.body.recebedor).toHaveProperty('pixKeyType', 'CNPJ');
    expect(response.body.recebedor).toHaveProperty('receipt_email', 'testeput@teste.com');
    expect(response.body.recebedor).toHaveProperty('pixKey', '75.888.426/0001-22');
  });

  it("should return status 500 and error message", async () => {
    const payload = {
      nome: "put test",
      pixKeyType: "email",
      document: "75.8880001-22",
      receipt_email: "testeputteste.com",
      pixKey: "75.888.426/0001-22"
    };

    const response = await request(ApiUrl)
      .put(`/Recebedor/${recebedorTeste._id}`)
      .send(payload)
      .expect(500);

    expect(response.body).toHaveProperty('error');
  });
});

describe("DELETE /Recebedores", () => {
  it("should return status 200 and delete receiver", async () => {
    const payload = {
      ids: [`${recebedorTeste._id}`]
    };

    const response = await request(ApiUrl)
      .delete("/Recebedor")
      .send(payload)
      .expect(200);

    expect(response.body.deleted_ids.length).toBe(1);
  });

  it("should return status 200 and delete at least 2 receivers and return 1 not found receiver", async () => {
    const payloadPost = {
      nome: "test",
      pixKeyType: "EMAIL",
      document: "75.888.426/0001-22",
      receipt_email: "teste@teste.com",
      pixKey: "teste@teste.com"
    };

    const idsToDelete: Array<string> = [];

    for (let i = 0; i <= 1; i++) {
      const response: any = await request(ApiUrl)
        .post("/Recebedor")
        .send(payloadPost);

      idsToDelete.push(response.body.recebedor._id);
    }
    idsToDelete.push('666fc1fb9597853520139104');

    const payload = {
      ids: idsToDelete
    };

    const response = await request(ApiUrl)
      .delete("/Recebedor")
      .send(payload)
      .expect(200);

    expect(response.body.deleted_ids.length).toBe(2);
    expect(response.body.not_found_ids.length).toBe(1);
  });
});
