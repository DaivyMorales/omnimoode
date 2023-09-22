import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "any@omnimoode.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*********",
        },
      },
      async authorize(credentials, req) {
        //Search User
        const userFound = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
          select: {
            id: true,
            password: true,
          },
        });

        if (!userFound)
          throw new Error("Tu correo o contraseña son incorrectos!");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );

        if (!passwordMatch)
          throw new Error("Tu correo o contraseña son incorrectos!");
        +console.log(userFound);

        return {
          id: userFound.id.toString(),
          password: userFound.password,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }: any) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
