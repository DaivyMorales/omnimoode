import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function CardById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { id },
  } = req;

  const userId = parseInt(id as string);

  switch (method) {
    case 'GET':
      try {
        const card = await prisma.card.findMany({
          where: { id: userId },
        });

        const cardData = card.map((c) => ({
          ...c,
          card_number: c.card_number.toString(),
        }));
        res.status(200).json(cardData);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
      }
      break;

    case 'DELETE':
      try {
        const cardToRemove = await prisma.card.deleteMany({
          where: { id: userId },
        });
        res.status(200).json("The card has been removed!");
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
      }
      break;

    default:
      res.status(405).json({ message: 'Invalid method' });
      break;
  }
}
