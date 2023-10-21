import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma';

export default async function ProductById(req: NextApiRequest, res: NextApiResponse) {
    const { body: { name, price, categoryId }, method, query: { id } } = req;

    const idNumber = parseInt(id as string)

    switch (method) {
        case "GET":
            try {
                const productFound = await prisma.product.findUnique({
                    where: { id: idNumber },
                    include: {
                        sizes: {
                            select: {
                                name: true,
                                quantity: true
                            }
                        }
                    }
                })

                if (!productFound) return res.status(500).json("Product doesn't found")

                res.status(200).json(productFound)
            } catch (error) {
                res.status(500).json(error)
            }
            break;

        case "PUT":
            try {
                const productUpdated = await prisma.product.update({
                    where: {
                        id: idNumber,
                    },
                    data: {
                        name,
                        price,
                        categoryId
                    },
                });

                res.status(200).json(productUpdated);
            } catch (error) {
                res.status(500).json({ message: error });
            }
            break;

        case "DELETE":
            try {
                const productToRemoved = await prisma.product.deleteMany({
                    where: { id: idNumber }
                })
                if (!productToRemoved) return res.status(500).json("Product doesn't found")

                res.status(200).json("Product removed sucessfully")
            } catch (error) {
                res.status(500).json(error)
            }
            break;

        default:
            res.status(500).json("That method is invalid")
            break;
    }

}