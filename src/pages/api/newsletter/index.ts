import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { email },
    method,
  } = req;

  switch (method) {
    case "POST":
      try {
        const newNewsLetter = await prisma.newsletter.create({
          data: {
            email,
          },
        });
        res.status(200).json({ newNewsLetter });
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;

    default:
      break;
  }
}
