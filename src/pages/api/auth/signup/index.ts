// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { id, name, email, email_verification, password },
  } = req;

  switch (method) {
    case "GET":
      try {
        const allUsers = await prisma.user.findMany();
        res.status(200).json(allUsers);
      } catch (error) {
        res.status(500).json(error);
      }

      break;

    case "POST":
      try {
        //Email validation
        const userWithEmail = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (userWithEmail?.email === email) {
          return res
            .status(400)
            .json("There's somebody with that email, change it!");
        }

        //Password
        if (!password || password.length < 6) {
          return res
            .status(400)
            .json("The password must be at least 6 characters");
        }

        const newUser = await prisma.user.create({
          data: {
            id,
            name,
            email,
            email_verification,
            password,
          },
        });

        return res.status(200).json(newUser);
      } catch (error) {
        res.status(500).json(error);
      }

      break;

    default:
      break;
  }
}
