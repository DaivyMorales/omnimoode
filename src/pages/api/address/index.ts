import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function Product(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: {
      names,
      surnames,
      address,
      neighborhood,
      specifications,
      state,
      stateNumber,
      city,
      phone,
      userId,
    },
  } = req;

  switch (method) {
    case "GET":
      try {
        const address = await prisma.address.findMany();
        res.status(200).json(address);
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case "POST":
      console.log(req.body);
      try {
        const newAddress = await prisma.address.create({
          data: {
            country: "Colombia",
            names,
            surnames,
            neighborhood,
            address,
            specifications,
            state,
            stateNumber,
            city,
            phone,
            userId,
          },
        });
        res.status(200).json(newAddress);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
        console.log(error);
      }
      break;

    default:
      break;
  }
}
