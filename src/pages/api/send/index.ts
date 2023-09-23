import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["daivymorales7705@gmail.com"],
      subject: "HOLA",
      react: EmailTemplate({ firstName: "John" }),
      text: "nada",
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
