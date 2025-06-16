"use client";

import { useState } from "react";
import { Send, Star, User, MessageSquare } from "lucide-react";

interface BlogCommentFormProps {
  postId: string;
}

export function BlogCommentForm({ postId }: BlogCommentFormProps) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validações
    if (!name.trim() || name.length < 2) {
      setError("Nome é obrigatório e deve ter pelo menos 2 caracteres.");
      return;
    }

    if (name.length > 50) {
      setError("Nome deve ter no máximo 50 caracteres.");
      return;
    }

    if (rating < 1 || rating > 5) {
      setError("Nota deve ser entre 1 e 5.");
      return;
    }

    if (content.length > 1000) {
      setError("Comentário deve ter no máximo 1000 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/blog/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          name: name.trim(),
          content: content.trim(),
          rating,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erro ao enviar comentário");
      }

      await res.json();
      setSuccess(true);
      setName("");
      setContent("");
      setRating(5);

      // Não recarregar a página - comentário precisa ser aprovado primeiro
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao enviar comentário. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            Deixe seu comentário
          </h3>
          <p className="text-gray-600 text-sm">
            Compartilhe sua opinião sobre este artigo
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <div>
              <span className="text-blue-700 font-medium">
                Comentário enviado com sucesso!
              </span>
              <p className="text-blue-600 text-sm mt-1">
                Seu comentário está aguardando moderação e aparecerá em breve.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4" />
            Nome *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Seu nome completo"
            required
            minLength={2}
            maxLength={50}
            disabled={loading || success}
          />
          <div className="text-xs text-gray-500 mt-1">
            {name.length}/50 caracteres
          </div>
        </div>

        {/* Avaliação */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
            <Star className="w-4 h-4" />
            Sua avaliação *
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl transition-all duration-200 hover:scale-110 ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
                disabled={loading || success}
              >
                ⭐
              </button>
            ))}
            <span className="ml-3 text-sm font-medium text-gray-600">
              {rating}/5 estrelas
            </span>
          </div>
        </div>

        {/* Comentário */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4" />
            Comentário (opcional)
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            rows={4}
            placeholder="Compartilhe seus pensamentos sobre este artigo..."
            maxLength={1000}
            disabled={loading || success}
          />
          <div className="text-xs text-gray-500 mt-1">
            {content.length}/1000 caracteres
          </div>
        </div>

        {/* Botão de envio */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          disabled={loading || success}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Enviando...
            </>
          ) : success ? (
            <>
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              Comentário enviado!
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Enviar comentário
            </>
          )}
        </button>
      </form>
    </div>
  );
}
