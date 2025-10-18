"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createCategory } from "@/actions/admin/create-category";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const createCategorySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
});

type CreateCategoryFormData = z.infer<typeof createCategorySchema>;

interface CreateCategoryFormProps {
  onSuccess: () => void;
}

export default function CreateCategoryForm({
  onSuccess,
}: CreateCategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateCategoryFormData) => {
    setIsLoading(true);
    try {
      await createCategory(data);
      toast.success("Categoria criada com sucesso!");
      onSuccess();
      form.reset();
    } catch (error) {
      toast.error("Erro ao criar categoria");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Categoria</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Tênis, Camisetas, Calças" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Criando..." : "Criar Categoria"}
        </Button>
      </form>
    </Form>
  );
}
