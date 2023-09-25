import type { NextApiRequest, NextApiResponse } from "next";
import VerifyEmail from "@/components/Verify-Email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { subject, email, name, text, number },
  } = req;

  try {
    const data = await resend.emails.send({
      from: "Omnimoode <onboarding@resend.dev>",
      to: [email],
      subject,
      react: VerifyEmail({ name, number }),
      text: "nada",
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
