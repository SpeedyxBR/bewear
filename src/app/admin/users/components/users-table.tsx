"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronDown, Shield, User } from "lucide-react";
import { updateUserRole } from "@/actions/admin/update-user-role";
import { toast } from "sonner";

interface UsersTableProps {
  users: Array<{
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: "user" | "admin";
    createdAt: Date;
    emailVerified: boolean;
  }>;
}

export default function UsersTable({ users }: UsersTableProps) {
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "user":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "user":
        return "Usuário";
      default:
        return role;
    }
  };

  const handleRoleUpdate = async (userId: string, role: "user" | "admin") => {
    setIsUpdating(userId);
    try {
      await updateUserRole({ userId, role });
      toast.success("Papel do usuário atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar papel do usuário");
    } finally {
      setIsUpdating(null);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Usuários</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-lg border p-4 transition-colors hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.image || ""} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{user.name}</h3>
                      <Badge className={getRoleColor(user.role)}>
                        {getRoleText(user.role)}
                      </Badge>
                      {user.emailVerified ? (
                        <Badge className="bg-green-100 text-green-800">
                          Verificado
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Não Verificado
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">
                      Cadastrado{" "}
                      {formatDistanceToNow(new Date(user.createdAt), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isUpdating === user.id}
                      >
                        {isUpdating === user.id ? (
                          "Atualizando..."
                        ) : (
                          <>
                            Ações
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleRoleUpdate(user.id, "admin")}
                        disabled={user.role === "admin"}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Tornar Administrador
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRoleUpdate(user.id, "user")}
                        disabled={user.role === "user"}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Tornar Usuário
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
