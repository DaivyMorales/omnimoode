import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function Product(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { name },
  } = req;

  switch (method) {
    case 'POST':
      try {
        const products = await prisma.product.findMany({
          where: {
            OR: [
              {
                name: {
                  contains: name,
                  mode: 'insensitive',
                },
              },
            ],
          },
        });

        res.json({ products });
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    default:
      break;
  }
}
