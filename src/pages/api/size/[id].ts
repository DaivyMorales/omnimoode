import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function SizeById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { subtractQuantity },
    query: { id },
  } = req;

  const sizeId = Number(id as string);

  switch (method) {
    case 'PATCH':
      const currentSize = await prisma.size.findUnique({
        where: { id: sizeId },
      });

      if (!currentSize) {
        res.status(404).json({ error: 'Size not found' });
        return;
      }

      const newQuantity = currentSize.quantity - subtractQuantity;

      const updatedSize = await prisma.size.update({
        where: { id: sizeId },
        data: { quantity: newQuantity },
      });

      res.status(200).json({
        message: 'Quantity has been updated successfully!',
        updatedSize,
      });
      break;

    default:
      res.status(405).end();
      break;
  }
}
