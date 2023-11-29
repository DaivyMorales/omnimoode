import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function CardById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { slug },
    body: {
      card_number,
      names,
      surnames,
      due_date,
      security_code,
      number_identification,
    },
  } = req;

  if (slug) {
    const userId = slug[0] === 'null' ? 'null' : parseInt(slug[0]);
    const cardId = slug[1] === 'null' ? 'null' : parseInt(slug[1]);

    switch (method) {
      case 'GET':
        if (typeof userId === 'number' && typeof cardId === 'number') {
          res.status(404).json('Provide only one number');
        }

        if (cardId === 'null' && typeof userId === 'number') {
          try {
            const cardsByUserId = await prisma.card.findMany({
              where: { userId },
            });

            if (!cardsByUserId) res.status(404).json('Cards do not found');

            res.status(200).json(cardsByUserId);
          } catch (error) {
            res.status(500).json({ message: error });
          }
        }

        if (userId === 'null' && typeof cardId === 'number') {
          try {
            const card = await prisma.card.findMany({
              where: { id: cardId },
            });
            if (!card) res.status(404).json('Card do not found');

            res.status(200).json(card);
          } catch (error) {
            res.status(500).json({ message: error });
          }
        }

        if (userId === 'null' && cardId === 'null') {
          res.status(404).json('Provide userId and cardId');
        }
        break;

      default:
        break;

      case 'PUT':
        if (typeof userId === 'number' && typeof cardId === 'number') {
          res.status(404).json({ message: 'You can remove with cardId only' });
        }

        if (cardId === 'null' && typeof userId === 'number') {
          res.status(404).json({ message: 'You can update with cardId only' });
        }

        if (userId === 'null' && typeof cardId === 'number') {
          try {
            const cardUpdated = await prisma.card.update({
              where: { id: cardId },
              data: {
                card_number,
                names,
                surnames,
                due_date,
                security_code,
                number_identification,
              },
            });
            if (!cardUpdated)
              res.status(404).json({ message: 'Card not found' });

            res.status(200).json(cardUpdated); //Why this response with a {count: 1}
          } catch (error) {
            console.log(error)
            res.status(500).json({ message: error });
          }
        }

        if (userId === 'null' && cardId === 'null') {
          res.status(404).json({ message: 'Provide the cardId' });
        }
        break;

      case 'DELETE':
        if (typeof userId === 'number' && typeof cardId === 'number') {
          res.status(404).json({ message: 'You can remove with cardId only' });
        }

        if (cardId === 'null' && typeof userId === 'number') {
          res.status(404).json({ message: 'You can remove with cardId only' });
        }

        if (userId === 'null' && typeof cardId === 'number') {
          try {
            const card = await prisma.card.deleteMany({
              where: { id: cardId },
            });
            if (!card) res.status(404).json({ message: 'Card  not found' });

            res.status(200).json('Card has been removed!');
          } catch (error) {
            res.status(500).json({ message: error });
          }
        }

        if (userId === 'null' && cardId === 'null') {
          res.status(404).json({ message: 'Provide the cardId' });
        }

        break;
    }
  } else {
    res.status(400).json("Slug hasn't been provided");
  }
}
