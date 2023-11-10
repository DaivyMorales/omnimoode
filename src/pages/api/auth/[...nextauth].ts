import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma";

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
        // Search User
        const userFound = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
          select: {
            id: true,
            name: true,
            email: true,
            email_verification: true,
            password: true,
            cartId: true,
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
        console.log(userFound);

        return {
          id: userFound.id.toString(),
          name: userFound.name,
          email: userFound.email,
          email_verification: userFound.email_verification,
          cartId: userFound.cartId,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }: any) {
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
