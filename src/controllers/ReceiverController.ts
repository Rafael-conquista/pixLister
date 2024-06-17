import { Request, Response } from 'express';
import Receiver from '../models/ReceiverModel';
import { queryParamValidator } from '../utils/queryParamValidator';

const paginate = (items: any[], page: number, pageSize: number) => {
    const offset = (page - 1) * pageSize;
    return items.slice(offset, offset + pageSize);
};

export const ReceiverList = async (req: Request, res: Response): Promise<void> => {
    try {
        const receivers:any[] = await Receiver.find({});
        let filteredItems:any[] = receivers;
        filteredItems = queryParamValidator(req.query, filteredItems)
        
        const page:number = parseInt(req.query.page as string) || 1;
        const pageSize:number = 10;
        const paginatedItems: any[] = paginate(filteredItems, page, pageSize);

        res.status(200).json({
            page,
            pageSize,
            totalItems: filteredItems.length,
            totalPages: Math.ceil(filteredItems.length / pageSize),
            items: paginatedItems
        });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
};

export const ReceiverPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const receiver = new Receiver(req.body);
        await receiver.validate();
        await receiver.save();
        res.status(201).json({ message: 'Recebedor criado com sucesso', recebedor: receiver });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

const prepareReceiverUpdate = (receiver: any, body: any): [object, string] => {
    let new_body: object = body;
    let message: string = 'Recebedor atualizado com sucesso';

    if (body.hasOwnProperty('pixKeyType')) {
        body.pixKeyType = body.pixKeyType.toUpperCase();
    }

    if (body.hasOwnProperty('status')) {
        body.status = body.status.toUpperCase();
    }

    if (receiver?.status === 'RASCUNHO') {
        Object.assign(receiver, body);
    } else if (receiver?.status === 'VALIDADO') {
        new_body = { receipt_email: body.receipt_email };
        Object.assign(receiver, new_body);
        message = 'Recebedor já validado, apenas será possível atualização de seu email de recebimento de comprovante';
    }

    return [new_body, message];
};

export const ReceiverPut = async (req: Request, res: Response): Promise<void> => {
    try {
        const receiver = await Receiver.findById(req.params.id);

        if (!receiver || Object.keys(req.body).length === 0) {
            throw new Error('O corpo da requisição está vazio. Nenhum dado para atualização foi fornecido.');
        }

        const [new_body, message] = prepareReceiverUpdate(receiver, req.body);

        await receiver?.validate();
        const updatedReceiver = await Receiver.findByIdAndUpdate(req.params.id, new_body, { new: true });

        res.status(200).json({
            message,
            recebedor: updatedReceiver
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

export { paginate, prepareReceiverUpdate };