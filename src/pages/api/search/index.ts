import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { query },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const products = await prisma.product.findMany({
          where: {
            OR: [
              {
                name: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            ],
          },
        });

        res.json({ products });
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;

    default:
      break;
  }
}
