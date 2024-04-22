import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function SizeById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { subtractQuantity, quantity },
    query: { id },
  } = req;

  const sizeId = id as string;

  switch (method) {
    case "PATCH":
      const currentSize = await prisma.size.findUnique({
        where: { id: sizeId },
      });

      if (!currentSize) {
        res.status(404).json({ error: "Size not found" });
        return;
      }

      const newQuantity = currentSize.quantity - subtractQuantity;

      const updatedSize = await prisma.size.update({
        where: { id: sizeId },
        data: { quantity: newQuantity },
      });

      res.status(200).json({
        message: "Quantity has been updated successfully!",
        updatedSize,
      });
      break;

    case "PUT":
      try {
        const sizeUpdated = await prisma.size.update({
          where: { id: sizeId },
          data: { quantity },
        });

        res.status(200).json({
          message: "Size has been updated successfully!",
          sizeUpdated,
        });
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;

    case "DELETE":
      try {
        const sizeToRemove = await prisma.size.delete({
          where: { id: sizeId },
        });

        if (!sizeToRemove) return res.status(500).json("Size doesn't found");

        res.status(200).json({
          message: "Size has been removed successfully!",
        });
      } catch (error) {
        res.status(500).json({ message: error });
        console.log(error);
      }
      break;

    default:
      res.status(405).end();
      break;
  }
}
