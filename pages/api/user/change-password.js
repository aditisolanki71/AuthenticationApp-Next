// /api/user/change-password
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../helper/db";
import { verifyPassword, hashPassword } from "../../../helper/auth";
async function handler(req,res) {
   if(req.method !== 'PATCH') {
         return;
   }
   const session =  await getSession({ req: req })
   if(!session) {
      res.status(401).json({ message: "Not Authenticated!" });
      return;
   }
   const userEmail = session.user.email;
   const oldPassword = req.body.oldPassword;
   const newPassword = req.body.newPassword;

   const client = await connectToDatabase();
   const db = client.db();
   const userCollections = await db.collection("users");
console.log("users",userCollections);
   const user = await userCollections.findOne({ email: userEmail });
   console.log("user is",user);
   if(!user) {
      res.status(404).json({ message: "User not found" });
      client.close();
      return;
   }
   const currentPassword = user.password;
   console.log("current ppwd",currentPassword);
   const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);
   console.log("pwd are equal",passwordAreEqual);
   if(!passwordAreEqual) {
      res.status(403).json({ message: "Invalid Password." })
      client.close();
      return;
   }
   
   const hashedPassword = await hashPassword(newPassword);
   const result = await userCollections.updateOne(
      {email: userEmail},
      {$set: { password: hashedPassword }}
   );
   client.close();
   res.status(200).json({ message: "Password updated!!!" })
}
export default handler;