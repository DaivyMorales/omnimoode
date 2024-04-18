// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";
import bcrypt from "bcryptjs";
import validator from "validator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body: { id, name, email, email_verification, password, roleId },
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

        if (!validator.isEmail(email)) {
          return res.status(400).json("Invalid email format");
        }

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

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
          data: {
            id,
            name,
            email,
            email_verification,
            password: hashedPassword,
            roleId: 2
          },
        });

        const userId = newUser.id;

        const newCart = await prisma.cart.create({
          data: { userId },
        });

        const cartId = newCart.id;

        const addCartToUser = await prisma.user.update({
          where: { id: userId },
          data: { cartId },
        });

        return res.status(200).json(addCartToUser);
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).json({ message: error.message });
        }
      }

      break;

    default:
      break;
  }
}
