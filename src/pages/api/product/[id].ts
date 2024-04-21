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
        const productFound = await prisma.product.findUnique({
          where: { id: idNumber },
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

        if (!productFound) return res.status(500).json("Product doesn't found");

        res.status(200).json(productFound);
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    case "PUT":
      try {
        const productUpdated = await prisma.product.update({
          where: {
            id: idNumber,
          },
          data: {
            name,
            price,
            categoryId,
          },
          include: {
            sizes: true,
          },
        });

        res.status(200).json(productUpdated);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;

    case "DELETE":
      try {
        // Eliminar los tamaños asociados al producto
        await prisma.size.deleteMany({
          where: {
            productId: idNumber,
          },
        });

        // Actualizar los CartProduct que hacen referencia al producto eliminado
        await prisma.cartProduct.updateMany({
          where: {
            productId: idNumber,
          },
          data: {
            productId: 0, // Desligar el producto
          },
        });

        // Eliminar el producto por su ID
        await prisma.product.delete({
          where: {
            id: idNumber,
          },
        });

        // Si el producto y sus relaciones se eliminaron correctamente, enviar una respuesta de éxito
        res
          .status(200)
          .json({ message: "Producto y relaciones eliminados correctamente" });
      } catch (error) {
        // Si ocurrió algún error, enviar una respuesta de error
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
