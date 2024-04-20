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
      neighborhood,
      address,
      specifications,
      state,
      stateId,
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
        const addressesFound = await prisma.address.findMany({
          where: { userId: idNumber },
        });

        if (!addressesFound)
          return res.status(404).json("Address doesn't found");

        res.status(200).json(addressesFound);
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
            neighborhood,
            address,
            specifications,
            state,
            stateId,
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
