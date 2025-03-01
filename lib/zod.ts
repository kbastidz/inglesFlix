import {object, string} from 'zod';

export const signInSchema = object({
    email: 
    string({required_error: "Email is required"})
    .min(2, "Email is required")
    .email("Invalid Email"),

    password: 
    string({required_error: "Password is required"})
})
