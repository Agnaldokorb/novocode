"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserPlus, MoreHorizontal, Edit, Trash2, KeyRound } from "lucide-react";
import { CreateUserForm } from "./create-user-form";
import { EditUserForm } from "./edit-user-form";
import { ResetPasswordForm } from "./reset-password-form";
import {
  createUserAction,
  updateUserAction,
  deleteUserAction,
  resetUserPasswordAction,
  type SafeUser,
} from "@/actions/users";
import type {
  CreateUserInput,
  UpdateUserInput,
  ResetPasswordInput,
} from "@/lib/schemas-users";
import { UserRole } from "@prisma/client";

interface UserManagementProps {
  initialUsers: SafeUser[];
}

export function UserManagement({ initialUsers }: UserManagementProps) {
  const [users, setUsers] = useState<SafeUser[]>(initialUsers);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<SafeUser | null>(null);
  const [resettingUser, setResettingUser] = useState<SafeUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<SafeUser | null>(null);

  const handleCreateUser = async (data: CreateUserInput) => {
    const result = await createUserAction(data);

    if (result.success && result.data) {
      setUsers([result.data.user, ...users]);
      setIsCreateDialogOpen(false);
      toast.success(result.data.message);
    } else {
      toast.error(result.error || "Erro ao criar usuário");
    }
  };

  const handleUpdateUser = async (data: UpdateUserInput) => {
    const result = await updateUserAction(data);

    if (result.success && result.data) {
      setUsers(
        users.map((user) => (user.id === data.id ? result.data!.user : user))
      );
      setEditingUser(null);
      toast.success(result.data.message);
    } else {
      toast.error(result.error || "Erro ao atualizar usuário");
    }
  };

  const handleResetPassword = async (data: ResetPasswordInput) => {
    const result = await resetUserPasswordAction(data);

    if (result.success && result.data) {
      setResettingUser(null);
      toast.success(result.data.message);
    } else {
      toast.error(result.error || "Erro ao resetar senha");
    }
  };

  const handleDeleteUser = async (id: string) => {
    const result = await deleteUserAction(id);

    if (result.success && result.data) {
      setUsers(users.filter((user) => user.id !== id));
      setDeletingUser(null);
      toast.success(result.data.message);
    } else {
      toast.error(result.error || "Erro ao deletar usuário");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Usuários</h3>
          <p className="text-sm text-muted-foreground">
            Total de {users.length} usuário(s)
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.role === UserRole.ADMIN
                        ? "default"
                        : user.role === UserRole.EDITOR
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {user.role === UserRole.ADMIN
                      ? "Admin"
                      : user.role === UserRole.EDITOR
                      ? "Editor"
                      : "Visualizador"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.isActive ? "success" : "destructive"}>
                    {user.isActive ? "Ativo" : "Inativo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(user.createdAt)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingUser(user)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setResettingUser(user)}>
                        <KeyRound className="h-4 w-4 mr-2" />
                        Resetar Senha
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeletingUser(user)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Deletar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog para criar usuário */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Usuário</DialogTitle>
            <DialogDescription>
              Adicione um novo usuário ao sistema
            </DialogDescription>
          </DialogHeader>
          <CreateUserForm
            onSubmit={handleCreateUser}
            onCancel={() => setIsCreateDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog para editar usuário */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Atualize as informações do usuário
            </DialogDescription>
          </DialogHeader>
          {editingUser && (
            <EditUserForm
              user={editingUser}
              onSubmit={handleUpdateUser}
              onCancel={() => setEditingUser(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog para resetar senha */}
      <Dialog
        open={!!resettingUser}
        onOpenChange={() => setResettingUser(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resetar Senha</DialogTitle>
            <DialogDescription>
              Defina uma nova senha para {resettingUser?.name}
            </DialogDescription>
          </DialogHeader>
          {resettingUser && (
            <ResetPasswordForm
              userId={resettingUser.id}
              onSubmit={handleResetPassword}
              onCancel={() => setResettingUser(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Alert Dialog para confirmar deleção */}
      <AlertDialog
        open={!!deletingUser}
        onOpenChange={() => setDeletingUser(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Deleção</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar o usuário{" "}
              <strong>{deletingUser?.name}</strong>? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingUser && handleDeleteUser(deletingUser.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
