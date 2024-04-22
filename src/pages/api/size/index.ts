import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function Size(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { name, quantity, productId },
    method,
  } = req;

  switch (method) {
    case "POST":
      try {
        const newProduct = await prisma.size.create({
          data: {
            name,
            quantity,
            productId,
          },
        });
        res.status(200).json(newProduct);
      } catch (error) {
        res.status(500).json(error);
        console.log(error);
      }
      break;

    default:
      res.status(500).json("That method is invalid");
      break;
  }
}
