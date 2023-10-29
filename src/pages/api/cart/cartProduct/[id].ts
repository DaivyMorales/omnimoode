import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
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
              },
            },
          },
        });
        res.status(200).json(cartWithProductsAndSizes);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    default:
      break;
  }
}
