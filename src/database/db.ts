let mongoose = require('mongoose')
import { checkAndInsertData } from "../utils/checkAndInsertData";

mongoose.connect('mongodb://my_mongodb:27017/pixLister', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () =>{
  await checkAndInsertData()
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conexão com o MongoDB estabelecida com sucesso.');
});