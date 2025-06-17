import { Metadata } from "next";
import MaintenancePageClient from "./maintenance-client";

export const metadata: Metadata = {
  title: "Site em Manutenção - NovoCode",
  description: "O site está temporariamente em manutenção. Voltaremos em breve!",
};

export default function MaintenancePage() {
  return <MaintenancePageClient />;
}
