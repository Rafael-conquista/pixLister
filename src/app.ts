import express from 'express';
import receiverRoute from './routes/receiverRoute';
import './database/db'

const app = express();

app.use(express.json());
app.use('/pixLister', receiverRoute);

export default app;