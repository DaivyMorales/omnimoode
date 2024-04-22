import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function ProductById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { name, price, categoryId },
    method,
    query: { id },
  } = req;

  const idNumber = parseInt(id as string);

  switch (method) {
    case "GET":
      try {
        const category = await prisma.category.findUnique({
          where: { id: idNumber },
          include: {
            product: true,
          },
        });

        if (!category) return res.status(500).json("Category doesn't found");

        res.status(200).json(category);
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    default:
      res.status(500).json("That method is invalid");
      break;
  }
}
