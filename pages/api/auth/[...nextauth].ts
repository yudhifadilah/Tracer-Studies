// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "username", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Validate that the password is not empty
        if (!credentials?.password) {
          throw new Error("Password cannot be empty");
        }

        try {
          const res = await fetch("http://localhost:8080/api/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          if (res.ok) {
            const user = await res.json();
            return { ...user, roles: user.roles };
          } else {
            const errorData = await res.json();
            throw new Error(errorData.error || "Authentication failed");
          }
        } catch (error) {
          // Handle other errors (e.g., network issues)
          console.error("Error during authentication:", error.message);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // If authentication is successful, this callback is executed
      // You can perform additional actions here if needed

      // Example of rejecting with an error
      // Uncomment the line below to use this feature
      // throw new Error("Custom error message");

      return Promise.resolve(true); // Resolve with true for successful sign-in
    },
    async signOut({ credentials, req, res }) {
      // Custom logic for sign out
      // For example, make a request to your local API to remove authentication
      await fetch("http://localhost:8000/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Include any necessary data in the body for your API endpoint
        body: JSON.stringify({ userId: credentials.id }),
      });

      // Reset the session to null to clear it
      return Promise.resolve(null);
    },
  },
});
