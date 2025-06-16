"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "@/lib/schemas-users";

interface ResetPasswordFormProps {
  userId: string;
  onSubmit: (data: ResetPasswordInput) => Promise<void>;
  onCancel: () => void;
}

export function ResetPasswordForm({
  userId,
  onSubmit,
  onCancel,
}: ResetPasswordFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      id: userId,
    },
  });

  const newPassword = watch("newPassword");

  const handleFormSubmit = async (data: ResetPasswordInput) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="newPassword">Nova Senha</Label>
        <Input
          id="newPassword"
          type="password"
          placeholder="Digite a nova senha (min. 6 caracteres)"
          {...register("newPassword")}
          className={errors.newPassword ? "border-red-500" : ""}
        />
        {errors.newPassword && (
          <p className="text-sm text-red-600">{errors.newPassword.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirme a nova senha"
          className={
            newPassword && newPassword.length >= 6
              ? "border-green-500"
              : errors.newPassword
              ? "border-red-500"
              : ""
          }
        />
        <p className="text-xs text-muted-foreground">
          Certifique-se de que a senha seja segura e tenha pelo menos 6
          caracteres.
        </p>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetando...
            </>
          ) : (
            "Resetar Senha"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
