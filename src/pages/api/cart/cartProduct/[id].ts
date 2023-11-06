import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const cartWithProductsAndSizes = await prisma.cart.findUnique({
          where: { id: Number(id) },
          include: {
            products: {
              select: {
                id: true,
                product: true,
                size: true,
                quantity: true,
                isLoaded: true,
              },
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
        });

        res.status(200).json(cartWithProductsAndSizes);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    case 'PUT':
      try {
        const updatedCartProduct = await prisma.cartProduct.update({
          where: { id: Number(id) },
          data: body,
        });
        res.status(200).json(updatedCartProduct);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    default:
      break;
  }
}
