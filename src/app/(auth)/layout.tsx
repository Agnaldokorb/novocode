import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
      <Toaster position="top-center" richColors />
    </div>
  );
}
