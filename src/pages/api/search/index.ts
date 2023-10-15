import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const { q: query } = req.query;

        if (typeof query !== "string") {
          throw new Error("Invalid request");
        }

        const products = await prisma.product.findMany({
          where: {
            OR: [
              {
                name: {
                  contains: query,
                  mode: "insensitive",
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
