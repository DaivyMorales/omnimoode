import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function idClient(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body,
    query: { id },
    method,
  } = req;

  const userId = parseInt(id as string);

  switch (method) {
    case "GET":
      try {
        const user = await prisma.user.findMany({
          where: { id: userId },
        });

        res.status(200).json(user[0]);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;

    case "PUT":
      try {
        const userUpdated = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            ...body,
          },
        });

        res.status(200).json(userUpdated);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;

    case "DELETE":
      try {
        const userRemoved = await prisma.user.deleteMany({
          where: { id: userId },
        });
        res.status(200).json(userRemoved);
      } catch (error) {
        res.status(500).json({ message: error });
      }

      break;

    default:
      res.status(500).json("That method doesn't exist");
      break;
  }
}
