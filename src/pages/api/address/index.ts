import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function Product(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: {
      names,
      surnames,
      address,
      neighborhood,
      specifications,
      state,
      city,
      phone,
      userId,
    },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const address = await prisma.address.findMany();
        res.status(200).json(address);
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case 'POST':
      try {
        const newAddress = await prisma.address.create({
          data: {
            country: 'Colombia',
            names,
            surnames,
            neighborhood,
            address,
            specifications,
            state,
            city,
            phone,
            userId,
          },
        });
        res.status(200).json(newAddress);
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    default:
      break;
  }
}
