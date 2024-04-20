// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import validator from "validator";

export default async function UpdateEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { newEmail },
    query: { id },
    method,
  } = req;

  const userId = parseInt(id as string);

  switch (method) {
    case "PUT":
      try {
        //Email validation

        if (!validator.isEmail(newEmail)) {
          return res.status(400).json("Formato de email invalido");
        }

        const userWithEmail = await prisma.user.findFirst({
          where: {
            email: newEmail,
          },
        });

        if (userWithEmail?.email === newEmail) {
          return res
            .status(400)
            .json("Hay alguien con tu mismo email, cambialo!");
        }

        const userUpdated = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            email: newEmail,
            email_verification: false,
          },
        });

        res.status(200).json(userUpdated);
      } catch (error) {
        res.status(500).json({ message: error });
      }
      break;

    default:
      break;
  }
}
