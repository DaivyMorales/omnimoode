import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';

interface ItemsRequest {
  productId: number;
  sizeId: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { cartId, productId, sizeId },
  } = req;

  switch (method) {
    case 'POST':
      try {
        const newCartProduct = await prisma.cartProduct.create({
          data: {
            cartId,
            productId,
            sizeId,
          },
          include: {
            cart: true,
            product: true,
            size: true,
          },
        });

        res.status(200).json(newCartProduct);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;

        await prisma.cartProduct.deleteMany({
          where: {
            id,
          },
        });

        res.status(200).json({ message: 'The cartProduct has been removed' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
      }
      break;

    default:
      break;
  }
}
