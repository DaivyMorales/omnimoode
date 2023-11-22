import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function ProductById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: {
      country,
      names,
      surnames,
      birthday,
      address,
      specifications,
      state,
      city,
      phone,
      userId,
    },
    method,
    query: { id },
  } = req;

  const idNumber = parseInt(id as string);

  switch (method) {
    case 'GET':
      try {
        const addressFound = await prisma.address.findUnique({
          where: { id: idNumber },
        });

        if (!addressFound) return res.status(500).json("Address doesn't found");

        res.status(200).json(addressFound);
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    case 'PUT':
      try {
        const addressUpdated = await prisma.address.update({
          where: {
            id: idNumber,
          },
          data: {
            country,
            names,
            surnames,
            birthday,
            address,
            specifications,
            state,
            city,
            phone,
            userId,
          },
        });

        res.status(200).json(addressUpdated);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;

    case 'DELETE':
      try {
        const addressToRemove = await prisma.address.deleteMany({
          where: { id: idNumber },
        });
        if (!addressToRemove)
          return res.status(500).json("Address doesn't found");

        res.status(200).json('Address removed sucessfully');
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    default:
      res.status(500).json('That method is invalid');
      break;
  }
}
