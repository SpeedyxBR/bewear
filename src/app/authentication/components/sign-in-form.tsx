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
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { getUseCartQueryKey } from "@/hooks/queries/use-cart";
import { signInSchema, type SignInFormValues } from "@/lib/auth-schemas";

const SignInForm = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInFormValues) {
    setIsLoading(true);
    try {
      await authClient.signIn.email({
        email: values.email,
        password: values.password,
        fetchOptions: {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: getUseCartQueryKey(),
              exact: false,
            });
            router.push("/");
            toast.success("Seja bem-vindo(a) de volta!");
            setIsLoading(false);
          },
          onError: (error) => {
            setIsLoading(false);
            if (error.error.code === "INVALID_EMAIL_OR_PASSWORD") {
              toast.error("E-mail ou senha invalidos.");
              form.setError("email", {
                message: "E-mail ou senha inválidos.",
              });
              return form.setError("password", {
                message: "E-mail ou senha inválidos.",
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
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Faça login para continuar</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o seu email" {...field} />
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
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
                Entrar
              </Button>
              <GoogleButton
                disabled={isLoading}
                onSuccess={() => {
                  queryClient.invalidateQueries({
                    queryKey: [getUseCartQueryKey(), session?.user?.id],
                  });
                }}
              />
              <ContinueWithoutLoginButton disabled={isLoading} />
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default SignInForm;
