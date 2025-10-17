"use client";

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
import GoogleButton from "@/components/ui/google-button";
import ContinueWithoutLoginButton from "@/components/ui/continue-without-login-button";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signUpSchema, type SignUpFormValues } from "@/lib/auth-schemas";

const SignUpForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    setIsLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
        fetchOptions: {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
            router.push("/");
            toast.success("Bem-vindo(a) ao BEWEAR!");
            setIsLoading(false);
          },
          onError: (error) => {
            setIsLoading(false);
            if (error.error.code === "USER_ALREADY_EXISTS") {
              toast.error("E-mail já cadastrado.");

              form.setError("email", {
                message: "E-mail já cadastrado.",
              });
            }

            toast.error(error.error.message);
          },
        },
      });
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>Crie uma conta para continuar</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o seu nome"
                        {...field}
                        type="name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o seu email"
                        {...field}
                        type="email"
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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite a sua senha"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
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
            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
                Criar conta
              </Button>
              <GoogleButton
                disabled={isLoading}
                successMessage="Bem-vindo(a) ao BEWEAR!"
              />
              <ContinueWithoutLoginButton disabled={isLoading} />
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default SignUpForm;
