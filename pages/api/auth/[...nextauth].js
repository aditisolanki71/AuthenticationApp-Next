import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../helper/db";
import { verifyPassword } from "../../../helper/auth"
export default NextAuth({
   session: { 
      jwt: true
    },
   providers: [
      CredentialsProvider({
         //whn rcv incoming req
         async authorize(credentials) {
            const client = await connectToDatabase();
            const usersCollections = client.db().collection("users");
            const user = await usersCollections.findOne({ email: credentials.email });
            if(!user) {
               client.close();
               throw new Error("No user Found!!!");
            }
            const isValidPwd = await verifyPassword(credentials.password,user.password);
            if(!isValidPwd) {
               client.close();
               throw new Error("Could not log you in!!!");
            } 
            client.close();
            return { email: user.email };
           
         }
      })
   ]
});