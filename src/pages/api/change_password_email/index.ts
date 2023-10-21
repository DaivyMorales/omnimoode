import type { NextApiRequest, NextApiResponse } from "next";
import RecoverPassword from "@/emails/RecoverPassword";
import { Resend } from "resend";
import prisma from '../../../../lib/prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { subject, email, text },
  } = req;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { name: true },
    });

    const nameFound = user?.name;
    try {
      const data = await resend.emails.send({
        from: "Omnimoode <onboarding@resend.dev>",
        to: [email],
        subject,
        react: RecoverPassword({ nameFound }),
        text,
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(404).json({ error: "Usuario no ha sido encontrado" });
  }
};
