import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../../lib/prisma';
import bcrypt from "bcryptjs";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { email, oldPassword, newPassword },
  } = req;

  //Search User
  const user = await prisma.user.findUnique({
    where: { email },
    select: { password: true },
  });

  if (!user) res.status(404).json({ error: "Usuario no ha sido encontrado" });

  //To verify old password
  const passwordMatch =
    user && (await bcrypt.compare(oldPassword, user.password));

  if (!passwordMatch) res.status(401).json({ error: "Contraseña incorrecta" });

  //Encript new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  res.status(200).json({ message: "Tu contraseña ha sido actualizada!" });
}
