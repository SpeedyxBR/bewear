import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("E-mail invalido. Tente novamente."),
  password: z
    .string("Senha inválida. Tente novamente.")
    .min(8, "A senha precisa ter pelo menos 8 caracteres."),
});

export const signUpSchema = z
  .object({
    name: z.string("Nome inválido.").trim().min(1, "Nome é obrigatório."),
    email: z.email("E-mail invalido. Tente novamente."),
    password: z
      .string("Senha inválida. Tente novamente.")
      .min(8, "A senha precisa ter pelo menos 8 caracteres."),
    passwordConfirmation: z
      .string("Senha inválida.")
      .min(8, "A senha precisa ter pelo menos 8 caracteres."),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    {
      error: "As senhas não coincidem..",
      path: ["passwordConfirmation"],
    },
  );

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
