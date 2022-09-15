import { hash, compare} from "bcryptjs";
export async function hashPassword(password) {
   //original plain text as password
   const hashedPassword = await hash(password,12);
   return hashedPassword;
}
//find if plain text pwd is same as hash pwd or not?
export async function verifyPassword(password,hashedPassword) {
   //original plain text as password
   const isValid = await compare(password,hashedPassword);
   return isValid;
}

