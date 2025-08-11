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

const signUpSchema = z
  .object({
    username: z.string("Nome inválido").trim().min(2, "Nome inválido"),
    email: z.email("Email inválido"),
    password: z.string("Senha inválida").min(8, "Senha inválida"),
    passwordConfirmation: z.string("Senha inválida"),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    {
      error: "As senhas não coincidem",
      path: ["passwordConfirmation"],
    },
  );

type TSignUpSchema = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const sign_up_form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (values: TSignUpSchema) => {
    await authClient.signUp.email({
      name: values.username,
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          //   toast.success("Conta criada com sucesso!");
          router.push("/");
        },
        onError: (error) => {
          if (error.error.code === "USER_ALREADY_EXISTS") {
            toast.error("E-mail já cadastrado");
            return sign_up_form.setError("email", {
              message: "E-mail já cadastrado",
            });
          }
          toast.error(error.error.message);
        },
      },
    });
  };
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Criar Conta</CardTitle>
          <CardDescription>Crie uma conta para continuar</CardDescription>
        </CardHeader>
        <Form {...sign_up_form}>
          <form
            onSubmit={sign_up_form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <CardContent className="grid gap-6">
              <FormField
                control={sign_up_form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={sign_up_form.control}
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
                control={sign_up_form.control}
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
              <FormField
                control={sign_up_form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme sua senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite a sua senha novamente"
                        {...field}
                        type="password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default SignUpForm;
