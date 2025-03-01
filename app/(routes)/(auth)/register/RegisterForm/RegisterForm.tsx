"use client";
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormControl, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';
import { formSchema } from '../../login/LoginForm/LoginForm.form';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: ""
    },
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      //TODO: Envia la peticion
      await axios.post("/api/auth/register", values); 
      toast("El usuario se ah creado correctamente");
      router.push("/profiles")
    } catch (error) {
      console.log(error);
      toast("Ha ocurrido un error", {
        description: "Por favor, inténtalo de nuevo.",
        style: { backgroundColor: "rgb(229 9 20 / var(--tw-bg-opacity, 1))", color: "white" },
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Correo electrónico"
                  {...field}
                  className="h-14"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Contraseña"
                  {...field}
                  className="h-14"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Repite la contraseña"
                  {...field}
                  className="h-14"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-[#E50914]">
          Registrarse
        </Button>
      </form>
    </Form>
  )
}
