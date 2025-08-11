import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const signInSchema = z.object({
  email: z.email("Email inválido!"),
  password: z.string("Senha inválida"),
});

type TSignInSchema = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const router = useRouter();
  const sign_in_form = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: TSignInSchema) => {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          if (ctx.error.code === "USER_NOT_FOUND") {
            toast.error("E-mail não encontrado");
            return sign_in_form.setError("email", {
              message: "E-mail não encontrado",
            });
          }
          if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            toast.error("E-mail ou senha inválido");
            return sign_in_form.setError("email", {
              message: "E-mail ou senha inválido",
            });
          }
          toast.error(ctx.error.message);
        },
      },
    });
  };

  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Faça login para continuar</CardDescription>
        </CardHeader>
        <Form {...sign_in_form}>
          <form
            onSubmit={sign_in_form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <CardContent className="grid gap-6">
              <FormField
                control={sign_in_form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={sign_in_form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite sua senha"
                        {...field}
                        type="password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full">
                Entrar
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleSignInWithGoogle}
              >
                Entrar com Google
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default SignInForm;
