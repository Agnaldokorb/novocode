import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { MaintenanceWrapper } from "@/components/maintenance-wrapper";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <MaintenanceWrapper allowDuringMaintenance={true}>
      <div className="min-h-screen">
        {children}
        <Toaster position="top-center" richColors />
      </div>
    </MaintenanceWrapper>
  );
}
