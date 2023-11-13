import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import { startOfMonth } from "date-fns";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);

  switch (method) {
    case "GET":
      try {
        const newestProducts = await prisma.product.findMany({
          where: {
            createdAt: {
              gte: firstDayOfMonth,
            },
            categoryId: 5,
          },
        });
        res.status(200).json(newestProducts);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;

    default:
      break;
  }
}
