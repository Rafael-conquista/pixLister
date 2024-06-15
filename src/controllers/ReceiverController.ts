import { Request, Response } from 'express';
import Receiver from '../models/ReceiverModel';

export const ReceiverList = async (req: Request, res: Response): Promise<void> => {
    try {
        const receivers = await Receiver.find({});
        res.status(200).json(receivers);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
};

export const ReceiverPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const receiver = new Receiver(req.body);
        await receiver.validate();
        await receiver.save();
        res.status(201).json({ message: 'Recebedor criado com sucesso' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const ReceiverPut = async (req: Request, res: Response): Promise<void> => {
    try {
        let new_body:object = req.body
        let message:string = 'Recebedor atualizado com sucesso'

        let receiver = await Receiver.findById(req.params.id);

        if (Object.keys(req.body).length === 0 || !receiver) {
            throw new Error('O corpo da requisição está vazio. Nenhum dado para atualização foi fornecido.');
        }

        if (req.body.hasOwnProperty('pixKeyType')) {
            req.body.pixKeyType = req.body.pixKeyType.toUpperCase();
        }

        if (req.body.hasOwnProperty('status')) {
            req.body.status = req.body.status.toUpperCase();
        }

        if (receiver?.status === 'RASCUNHO') {
            Object.assign(receiver, req.body);
        } else if (receiver?.status === 'VALIDADO') {
            new_body = { receipt_email: req.body.receipt_email };
            Object.assign(receiver, new_body);
            message = 'Recebedor já validado, apenas será possíve atualização de seu email de recebimento de comprovante'
        }
        await receiver?.validate();
        receiver = await Receiver.findByIdAndUpdate(req.params.id, new_body, { new: true });
        res.status(200).json({
            message: message,
            recebedor: receiver
        });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
};

export const ReceiverDelete = async (req: Request, res: Response): Promise<void> => {
    try {
        const not_found_ids = [];
        const found_ids = [];

        for (const id of req.body.ids) {
            const receiver_id = id;
            const receiver = await Receiver.findByIdAndDelete(receiver_id);
            if (!receiver) {
                not_found_ids.push(receiver_id);
            } else {
                found_ids.push(receiver_id);
            }
        }

        res.status(200).json({ deleted_ids: found_ids, not_found_ids: not_found_ids });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
};
