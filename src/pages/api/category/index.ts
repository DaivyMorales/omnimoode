import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma';

export default async function Product(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {

        case "GET":
            try {
                const categories = await prisma.category.findMany()
                res.status(200).json(categories)
            } catch (error) {
                res.status(400).json(error)
            }
            break;

        default:
            break;
    }

}