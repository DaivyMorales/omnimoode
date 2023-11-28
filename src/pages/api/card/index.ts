import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function Card(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    body: {
      card_number,
      names,
      surnames,
      due_date,
      security_code,
      number_identification,
      userId,
    },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const allCards = await prisma.card.findMany();
        res.status(200).json(allCards);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;
    case 'POST':
      try {
        const newCard = await prisma.card.create({
          data: {
            card_number,
            names,
            surnames,
            due_date,
            security_code,
            number_identification,
            userId,
          },
        });

        res.status(200).json(newCard);
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
