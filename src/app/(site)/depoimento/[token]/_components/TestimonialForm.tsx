"use client";

import { useState } from "react";
import { Star, Send, User, Building, Briefcase } from "lucide-react";

interface Testimonial {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPosition?: string | null;
  clientCompany?: string | null;
  requestToken: string;
}

interface TestimonialFormProps {
  testimonial: Testimonial;
}

export default function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    content: "",
    rating: 0,
    clientPosition: testimonial.clientPosition || "",
    clientCompany: testimonial.clientCompany || "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.content.trim()) {
      alert("Por favor, escreva seu depoimento.");
      return;
    }

    if (formData.rating === 0) {
      alert("Por favor, selecione uma avaliação.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/testimonials/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: testimonial.requestToken,
          content: formData.content,
          rating: formData.rating,
          clientPosition: formData.clientPosition,
          clientCompany: formData.clientCompany,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        // Recarregar a página após 2 segundos para mostrar a mensagem de sucesso
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        const error = await response.json();
        alert(error.message || "Erro ao enviar depoimento. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar depoimento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Depoimento enviado com sucesso! 🎉
        </h3>
        <p className="text-gray-600">
          Obrigado por dedicar seu tempo para nos ajudar!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informações do cliente */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <User className="w-5 h-5" />
          Suas informações
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo
            </label>
            <input
              type="text"
              value={testimonial.clientName}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={testimonial.clientEmail}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Briefcase className="w-4 h-4 inline mr-1" />
              Cargo (opcional)
            </label>
            <input
              type="text"
              value={formData.clientPosition}
              onChange={(e) =>
                setFormData({ ...formData, clientPosition: e.target.value })
              }
              placeholder="Ex: Diretor, Gerente, CEO..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Building className="w-4 h-4 inline mr-1" />
              Empresa (opcional)
            </label>
            <input
              type="text"
              value={formData.clientCompany}
              onChange={(e) =>
                setFormData({ ...formData, clientCompany: e.target.value })
              }
              placeholder="Nome da sua empresa"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Avaliação */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Como você avalia nosso trabalho? *
        </label>
        <div className="flex items-center gap-2 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingClick(star)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                star <= formData.rating
                  ? "text-yellow-400 hover:text-yellow-500"
                  : "text-gray-300 hover:text-gray-400"
              }`}
            >
              <Star
                className={`w-8 h-8 ${
                  star <= formData.rating ? "fill-current" : ""
                }`}
              />
            </button>
          ))}
        </div>
        <div className="text-sm text-gray-600">
          {formData.rating === 0 && "Clique nas estrelas para avaliar"}
          {formData.rating === 1 && "😞 Muito insatisfeito"}
          {formData.rating === 2 && "😐 Insatisfeito"}
          {formData.rating === 3 && "😊 Neutro"}
          {formData.rating === 4 && "😄 Satisfeito"}
          {formData.rating === 5 && "🤩 Muito satisfeito"}
        </div>
      </div>

      {/* Depoimento */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Conte-nos sobre sua experiência *
        </label>
        <textarea
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          placeholder="Compartilhe sua experiência trabalhando conosco. Você pode falar sobre:
• Qualidade do trabalho desenvolvido
• Atendimento e comunicação da equipe
• Cumprimento de prazos
• Resultados obtidos
• Se recomendaria nossos serviços
• Qualquer outro aspecto que considere importante"
          rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          maxLength={1000}
        />
        <div className="text-right text-sm text-gray-500 mt-1">
          {formData.content.length}/1000 caracteres
        </div>
      </div>

      {/* Dicas */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">
          💡 Dicas para um bom depoimento:
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Seja específico sobre os resultados obtidos</li>
          <li>• Mencione aspectos que mais te impressionaram</li>
          <li>• Fale sobre como nosso trabalho impactou seu negócio</li>
          <li>• Seja honesto e autêntico em sua avaliação</li>
        </ul>
      </div>

      {/* Botão de envio */}
      <button
        type="submit"
        disabled={loading || !formData.content.trim() || formData.rating === 0}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Enviando...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Enviar Depoimento
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Seu depoimento será analisado pela nossa equipe antes da publicação.
        <br />
        Obrigado por dedicar seu tempo para nos ajudar! 🙏
      </p>
    </form>
  );
}
