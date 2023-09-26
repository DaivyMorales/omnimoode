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

    // case "PUT":
    //   try {
    //     const clientUpdated = await prisma.client.update({
    //       where: {
    //         id: clientId,
    //       },
    //       data: {
    //         ...body,
    //       },
    //     });

    //     res.status(200).json(clientUpdated);
    //   } catch (error) {
    //     res.status(500).json({ message: error });
    //   }
    //   break;

    // case "DELETE":
    //   try {
    //     const clientDeleted = await prisma.client.deleteMany({
    //       where: { id: clientId },
    //     });
    //     res.status(200).json(clientDeleted);
    //   } catch (error) {
    //     res.status(500).json({ message: error });
    //   }

    //   break;

    default:
      res.status(500).json("That method doesn't exist");
      break;
  }
}
