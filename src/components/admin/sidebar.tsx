"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  Briefcase,
  FolderOpen,
  FileText,
  MessageSquare,
  MessageCircle,
  Users,
  HelpCircle,
  Palette,
  Globe,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Serviços",
    href: "/admin/services",
    icon: Briefcase,
  },
  {
    name: "Portfólio",
    href: "/admin/portfolio",
    icon: FolderOpen,
  },
  {
    name: "Tecnologias",
    href: "/admin/technologies",
    icon: Palette,
  },
  {
    name: "Blog",
    href: "/admin/blog",
    icon: FileText,
  },
  {
    name: "Comentários",
    href: "/admin/blog/comments",
    icon: MessageCircle,
  },
  {
    name: "Leads",
    href: "/admin/leads",
    icon: Users,
  },
  {
    name: "Depoimentos",
    href: "/admin/testimonials",
    icon: MessageSquare,
  },
  {
    name: "FAQ",
    href: "/admin/faq",
    icon: HelpCircle,
  },
  {
    name: "Site Público",
    href: "/",
    icon: Globe,
    external: true,
  },
  {
    name: "Configurações",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow pt-5 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">NOVOCODE</h1>
            <p className="text-sm text-gray-500">Painel Admin</p>
          </div>
        </div>

        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));

              const linkProps = item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {};

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  {...linkProps}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      isActive
                        ? "text-gray-500"
                        : "text-gray-400 group-hover:text-gray-500"
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            © 2024 NOVOCODE LTDA
          </div>
        </div>
      </div>
    </div>
  );
}
