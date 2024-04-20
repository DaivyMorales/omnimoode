import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { email, lastPassword, newPassword },
  } = req;

  //Search User
  const user = await prisma.user.findUnique({
    where: { email },
    select: { password: true },
  });

  if (!user) res.status(404).json({ error: "Usuario no ha sido encontrado" });
  if (user?.password !== lastPassword)
    res.status(401).json({ error: "Tu antigua contraseña es incorrecta" });

  //Encript new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  res.status(200).json({ message: "Tu contraseña ha sido actualizada!" });
}
