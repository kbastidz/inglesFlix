

import { NextResponse } from 'next/server';
import {db} from '@/lib/db';
import { getUserByEmail } from '@/app/data/user';

export async function POST(request: Request) {
    const { email, password } = await request.json();
    console.log({ email });
    
    try {
        
        
        //TODO: Consulta si existe un usuario con el email
        const existingUser = await getUserByEmail(email);
        //TODO: Valida si existe
        if(existingUser){
            return new NextResponse("Email already exists", {status: 400});
        }
        //TODO: Si no existe lo crea
        const userCreated = await db.user.create({
            data: {
                email: email,
                password: password
                
            }
        });
        return NextResponse.json(userCreated);
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error" , {status: 500})
    }
    
}
