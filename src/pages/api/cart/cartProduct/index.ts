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
    body: { cartId, items },
  } = req;

  switch (method) {
    case 'POST':
      try {
        const newCartProduct = await prisma.$transaction(
          items.map((item: ItemsRequest) =>
            prisma.cartProduct.create({
              data: {
                cart: {
                  connect: { id: cartId },
                },
                product: {
                  connect: { id: item.productId },
                },
                size: {
                  connect: { id: item.sizeId },
                },
              },
            })
          )
        );
        res.status(200).json(newCartProduct);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;

    default:
      break;
  }
}
