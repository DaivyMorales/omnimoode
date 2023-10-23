import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { userId, cartId, productId, sizeId },
  } = req;

  switch (method) {
    case 'POST':
      try {
        const newCart = await prisma.cart.create({
          data: { userId },
        });
        res
          .status(200)
          .json({ message: 'Cart has been created', data: newCart });
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;

    default:
      break;
  }
}
