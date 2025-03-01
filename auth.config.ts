
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { signInSchema } from "./lib/zod";
import { getUserByEmail } from "./app/data/user";

export default {
    providers: [
      Credentials({
        async authorize(credentials) {
          const validatedFields = signInSchema.safeParse(credentials);
  
          if (!validatedFields.success) {
            return null;
          }
  
          if (validatedFields.success) {
            const { email, password } = validatedFields.data;
            const user = await getUserByEmail(email);
  
            if (!user || !user.password) return null;
  
           
            if(password === user.password){ 
              return user;
            }
            
          }
          return null;
        },
      }),
    ],
  } satisfies NextAuthConfig;

//Valida si el email que se le esta pasando cumple con las validaciones requeridas en la clase zod

