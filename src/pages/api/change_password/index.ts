import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { userId, lastPassword, newPassword },
  } = req;

  switch (req.method) {
    case "POST":
      try {
        if (!userId) {
          return res.status(400).json({ error: "Falta el ID del usuario" });
        }

        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { password: true },
        });

        
        if (!user) {
          return res
            .status(404)
            .json({ error: "Usuario no ha sido encontrado" });
        }

        // Verificar si el usuario es nulo
        if (user === null) {
          return res
            .status(404)
            .json({ error: "Usuario no ha sido encontrado" });
        }

        const isPasswordCorrect = await bcrypt.compare(
          lastPassword,
          user.password
        );

        if (!isPasswordCorrect) {
          return res
            .status(401)
            .json({ error: "Tu antigua contraseña es incorrecta" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
          where: { id: userId },
          data: { password: hashedPassword },
        });

        return res
          .status(200)
          .json({ message: "Tu contraseña ha sido actualizada!" });
        break;
      } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
      }

    default:
      break;
  }

  // Buscar al usuario
}
