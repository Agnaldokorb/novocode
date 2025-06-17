import { ReactNode } from "react";

interface MaintenanceLayoutProps {
  children: ReactNode;
}

export default function MaintenanceLayout({ children }: MaintenanceLayoutProps) {
  return <>{children}</>;
}
