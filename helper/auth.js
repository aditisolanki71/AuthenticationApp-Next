import { hash } from "bcryptjs";
export async function hashPassword(password) {
   //original plain text as password
   const hashedPassword = await hash(password,12);
   return hashedPassword;
}