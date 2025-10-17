"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProduct } from "@/actions/admin/create-product";
import { Plus, X } from "lucide-react";

const createProductSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  markId: z.string().optional(),
  variants: z
    .array(
      z.object({
        name: z.string().min(1, "Nome da variante é obrigatório"),
        color: z.string().min(1, "Cor é obrigatória"),
        priceInCents: z.number().min(1, "Preço deve ser maior que zero"),
        imageUrl: z.string().url("URL da imagem inválida"),
      }),
    )
    .min(1, "Pelo menos uma variante é obrigatória"),
});

type CreateProductFormData = z.infer<typeof createProductSchema>;

interface CreateProductFormProps {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  marks: Array<{
    id: string;
    name: string;
    imageUrl: string;
  }>;
  onSuccess: () => void;
}

export default function CreateProductForm({
  categories,
  marks,
  onSuccess,
}: CreateProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      markId: "",
      variants: [
        {
          name: "",
          color: "",
          priceInCents: 0,
          imageUrl: "",
        },
      ],
    },
  });

  const variants = form.watch("variants");

  const addVariant = () => {
    form.setValue("variants", [
      ...variants,
      {
        name: "",
        color: "",
        priceInCents: 0,
        imageUrl: "",
      },
    ]);
  };

  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      const newVariants = variants.filter((_, i) => i !== index);
      form.setValue("variants", newVariants);
    }
  };

  const onSubmit = async (data: CreateProductFormData) => {
    setIsLoading(true);
    try {
      await createProduct(data);
      toast.success("Produto criado com sucesso!");
      onSuccess();
      form.reset();
    } catch (error) {
      toast.error("Erro ao criar produto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Produto</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Tênis Nike Air Max" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descrição detalhada do produto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="markId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marca (Opcional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma marca" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {marks.map((mark) => (
                    <SelectItem key={mark.id} value={mark.id}>
                      {mark.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <div className="mb-4 flex items-center justify-between">
            <FormLabel>Variantes do Produto</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addVariant}
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Variante
            </Button>
          </div>

          <div className="space-y-4">
            {variants.map((_, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-medium">Variante {index + 1}</h4>
                  {variants.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeVariant(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`variants.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Variante</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Branco, Tamanho 42"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`variants.${index}.color`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cor</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Branco, Preto, Azul"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`variants.${index}.priceInCents`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço (em centavos)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ex: 19999 (R$ 199,99)"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`variants.${index}.imageUrl`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL da Imagem</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://exemplo.com/imagem.jpg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Criando..." : "Criar Produto"}
        </Button>
      </form>
    </Form>
  );
}
