import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Product(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { name, price, categoryId, imageUrl },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const products = await prisma.product.findMany();
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
            imageUrl,
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
