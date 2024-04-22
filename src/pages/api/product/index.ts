import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function Product(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { name, price, categoryId, imageLink },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const products = await prisma.product.findMany({
          include: {
            sizes: true,
          },
        });
        res.status(200).json(products);
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case "POST":
      try {
        const newProduct = await prisma.product.create({
          data: {
            name,
            price,
            categoryId,
            imageUrl: imageLink,
          },
        });
        res.status(200).json(newProduct);
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    default:
      break;
  }
}
