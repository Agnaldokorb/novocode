import { ReactNode } from "react";
import { MaintenanceWrapper } from "@/components/maintenance-wrapper";

interface MaintenanceLayoutProps {
  children: ReactNode;
}

export default function MaintenanceLayout({ children }: MaintenanceLayoutProps) {
  return (
    <MaintenanceWrapper allowDuringMaintenance={true}>
      {children}
    </MaintenanceWrapper>
  );
}
