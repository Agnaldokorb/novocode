"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  Check,
  X,
  Trash2,
  Eye,
  Star,
  Send,
  Clock,
  Mail,
  User,
} from "lucide-react";

interface Testimonial {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPosition?: string;
  clientCompany?: string;
  content?: string;
  rating?: number;
  status: "PENDING" | "SUBMITTED" | "APPROVED" | "REJECTED";
  publicationStatus: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  requestSentAt?: string;
  submittedAt?: string;
  reminderCount: number;
  createdAt: string;
  leadId?: string;
}

interface TestimonialStats {
  total: number;
  pending: number;
  submitted: number;
  approved: number;
  published: number;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState<TestimonialStats>({
    total: 0,
    pending: 0,
    submitted: 0,
    approved: 0,
    published: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<
    "all" | "pending" | "submitted" | "approved" | "published"
  >("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        status: filter,
        search: search,
      });

      const response = await fetch(`/api/admin/testimonials?${params}`);
      if (!response.ok) throw new Error("Erro ao carregar depoimentos");

      const data = await response.json();
      setTestimonials(data.testimonials);
      setStats(data.stats);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  }, [filter, search, page]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve" }),
      });

      if (response.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Erro ao aprovar:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject" }),
      });

      if (response.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Erro ao rejeitar:", error);
    }
  };

  const handlePublish = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "publish" }),
      });

      if (response.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Erro ao publicar:", error);
    }
  };

  const handleSendReminder = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}/reminder`, {
        method: "POST",
      });

      if (response.ok) {
        fetchTestimonials();
        alert("Lembrete enviado com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao enviar lembrete:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este depoimento?")) return;

    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
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

  const renderStars = (rating?: number) => {
    if (!rating) return <span className="text-gray-400">Sem avaliação</span>;

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "SUBMITTED":
        return "bg-blue-100 text-blue-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pendente";
      case "SUBMITTED":
        return "Enviado";
      case "APPROVED":
        return "Aprovado";
      case "REJECTED":
        return "Rejeitado";
      default:
        return status;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Gerenciar Depoimentos
            </h1>
            <p className="text-gray-600">
              Gerencie solicitações e depoimentos de clientes
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Pendentes</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Enviados</p>
              <p className="text-2xl font-bold">{stats.submitted}</p>
            </div>
            <Send className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Aprovados</p>
              <p className="text-2xl font-bold">{stats.approved}</p>
            </div>
            <Check className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Publicados</p>
              <p className="text-2xl font-bold">{stats.published}</p>
            </div>
            <Eye className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por nome, email ou empresa..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value as
                    | "all"
                    | "pending"
                    | "approved"
                    | "submitted"
                    | "published"
                )
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos</option>
              <option value="pending">Pendentes</option>
              <option value="submitted">Enviados</option>
              <option value="approved">Aprovados</option>
              <option value="published">Publicados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Carregando depoimentos...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Nenhum depoimento encontrado</p>
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-sm border p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-400" />
                      <h3 className="font-semibold text-gray-900">
                        {testimonial.clientName}
                      </h3>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        testimonial.status
                      )}`}
                    >
                      {getStatusText(testimonial.status)}
                    </span>
                    {testimonial.publicationStatus === "PUBLISHED" && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Publicado
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{testimonial.clientEmail}</span>
                    </div>
                    {testimonial.clientCompany && (
                      <p>
                        <span className="font-medium">Empresa:</span>{" "}
                        {testimonial.clientCompany}
                      </p>
                    )}
                    {testimonial.clientPosition && (
                      <p>
                        <span className="font-medium">Cargo:</span>{" "}
                        {testimonial.clientPosition}
                      </p>
                    )}
                  </div>

                  {testimonial.content && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 italic">
                        &quot;{testimonial.content}&quot;
                      </p>
                      <div className="mt-2">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  )}

                  <div className="mt-3 text-xs text-gray-500 space-y-1">
                    <p>Criado em: {formatDate(testimonial.createdAt)}</p>
                    {testimonial.requestSentAt && (
                      <p>
                        Solicitação enviada:{" "}
                        {formatDate(testimonial.requestSentAt)}
                      </p>
                    )}
                    {testimonial.submittedAt && (
                      <p>
                        Depoimento enviado:{" "}
                        {formatDate(testimonial.submittedAt)}
                      </p>
                    )}
                    {testimonial.reminderCount > 0 && (
                      <p>Lembretes enviados: {testimonial.reminderCount}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {testimonial.status === "PENDING" && (
                    <button
                      onClick={() => handleSendReminder(testimonial.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Enviar lembrete"
                    >
                      <Mail className="w-5 h-5" />
                    </button>
                  )}

                  {testimonial.status === "SUBMITTED" && (
                    <>
                      <button
                        onClick={() => handleApprove(testimonial.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Aprovar"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleReject(testimonial.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Rejeitar"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {testimonial.status === "APPROVED" &&
                    testimonial.publicationStatus !== "PUBLISHED" && (
                      <button
                        onClick={() => handlePublish(testimonial.id)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Publicar"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    )}

                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Anterior
          </button>

          <span className="px-4 py-2 text-gray-600">
            Página {page} de {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
