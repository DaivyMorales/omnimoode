import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { body: { id, name, categoryId, sizeId }, method } = req;

    switch (method) {
        case "POST":
            try {
                await prisma.product.create({
                    data: {
                        name,
                        categoryId,
                        sizeId
                    }
                })
            } catch (error) {

            }
            break;

        default:
            break;
    }

}