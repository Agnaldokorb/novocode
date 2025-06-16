"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Users,
  TrendingUp,
  Calendar,
  Target,
  UserCheck,
  UserX,
  Clock,
  CheckCircle,
} from "lucide-react";
import { LeadStatus } from "@prisma/client";

interface LeadsStatsProps {
  stats: {
    total: number;
    byStatus: Record<LeadStatus, number>;
    recent: number;
    conversionRate: number;
  };
}

const statusConfig = {
  NEW: {
    label: "Novos",
    color: "bg-blue-500",
    icon: Users,
  },
  CONTACTED: {
    label: "Contatados",
    color: "bg-yellow-500",
    icon: Clock,
  },
  QUALIFIED: {
    label: "Qualificados",
    color: "bg-purple-500",
    icon: UserCheck,
  },
  PROPOSAL: {
    label: "Proposta",
    color: "bg-orange-500",
    icon: Target,
  },
  WON: {
    label: "Ganhos",
    color: "bg-green-500",
    icon: CheckCircle,
  },
  LOST: {
    label: "Perdidos",
    color: "bg-red-500",
    icon: UserX,
  },
};

export default function LeadsStats({ stats }: LeadsStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total de Leads */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">
            Leads cadastrados no sistema
          </p>
        </CardContent>
      </Card>

      {/* Leads Recentes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Últimos 30 dias</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.recent}</div>
          <p className="text-xs text-muted-foreground">Novos leads este mês</p>
        </CardContent>
      </Card>

      {/* Taxa de Conversão */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Taxa de Conversão
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.conversionRate}%</div>
          <p className="text-xs text-muted-foreground">
            Leads convertidos em vendas
          </p>
        </CardContent>
      </Card>

      {/* Leads Ativos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Leads Ativos</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(stats.byStatus.NEW || 0) +
              (stats.byStatus.CONTACTED || 0) +
              (stats.byStatus.QUALIFIED || 0) +
              (stats.byStatus.PROPOSAL || 0)}
          </div>
          <p className="text-xs text-muted-foreground">Leads em processo</p>
        </CardContent>
      </Card>

      {/* Detalhamento por Status */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-lg">Leads por Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(statusConfig).map(([status, config]) => {
              const count = stats.byStatus[status as LeadStatus] || 0;
              const IconComponent = config.icon;

              return (
                <div
                  key={status}
                  className="flex items-center space-x-3 p-3 rounded-lg border"
                >
                  <div className={`w-3 h-3 rounded-full ${config.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {config.label}
                    </p>
                    <p className="text-lg font-bold text-gray-600">{count}</p>
                  </div>
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
