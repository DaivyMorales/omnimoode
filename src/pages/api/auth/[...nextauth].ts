import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
          placeholder: "*********"
        },
      },
      authorize(credentials, req) {
        const user = { id: "32", name: "Jose Mora", email: "jose@gmail.com" };

        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
