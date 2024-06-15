import { Request, Response } from 'express';
import Receiver from '../models/ReceiverModel';

export const ReceiverList = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: 'teste do get' });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
};

export const ReceiverPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const receiver = new Receiver(req.body);
        await receiver.validate();
        await receiver.save();
        res.status(201).json({ message: 'Usuário criado com sucesso' });
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
};

export const ReceiverPut = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: 'teste do put' });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
};

export const Receiverdelete = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json({ message: 'teste do delete' });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
};