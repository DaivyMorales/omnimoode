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

  switch (method) {
    case "GET":
      try {
        const productFound = await prisma.product.findUnique({
          where: { id: id as string },
          include: {
            sizes: {
              select: {
                id: true,
                name: true,
                quantity: true,
              },
            },
          },
        });
        console.log({ id });

        if (!productFound) return res.status(404).json("Product doesn't found");

        res.status(200).json(productFound);
      } catch (error) {
        res.status(500).json(error);
        console.log(error);
      }
      break;

    case "PUT":
      try {
        const productUpdated = await prisma.product.update({
          where: {
            id: id as string,
          },
          data: {
            price,
            name,
            categoryId,
          },
          include: {
            sizes: true,
          },
        });

        res.status(200).json(productUpdated);
      } catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
      }
      break;

    case "DELETE":
      try {
        await prisma.size.deleteMany({
          where: {
            productId: id as string,
          },
        });

        await prisma.cartProduct.updateMany({
          where: {
            productId: id as string,
          },
          data: {},
        });

        await prisma.product.delete({
          where: {
            id: id as string,
          },
        });

        res
          .status(200)
          .json({ message: "Producto y relaciones eliminados correctamente" });
      } catch (error) {
        res
          .status(500)
          .json({ error: "No se pudo eliminar el producto y sus relaciones" });
      }
      break;

    default:
      res.status(500).json("That method is invalid");
      break;
  }
}
