import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { email, newPassword },
  } = req;

  //Search User
  const user = await prisma.user.findUnique({
    where: { email },
    select: { password: true },
  });

  if (!user) res.status(404).json({ error: "Usuario no ha sido encontrado" });

  //Encript new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  res.status(200).json({ message: "Tu contraseña ha sido actualizada!" });
}
