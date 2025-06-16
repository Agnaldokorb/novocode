import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TestimonialForm from "./_components/TestimonialForm";

interface PageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function TestimonialPage({ params }: PageProps) {
  const { token } = await params;

  // Primeiro, buscar se já existe um testimonial com este token
  let testimonial = await prisma.testimonial.findUnique({
    where: { requestToken: token },
  });

  // Se não existe, buscar o lead pelo token e criar o testimonial
  if (!testimonial) {
    const lead = await prisma.lead.findFirst({
      where: { testimonialToken: token },
    });

    if (!lead) {
      notFound();
    }

    // Criar o testimonial agora que o usuário acessou o link
    testimonial = await prisma.testimonial.create({
      data: {
        clientName: lead.name,
        clientEmail: lead.email,
        clientCompany: lead.company,
        leadId: lead.id,
        requestToken: token,
        requestSentAt: lead.testimonialEmailSentAt,
        status: "PENDING",
      },
    });

    console.log(
      `✅ Testimonial criado quando usuário acessou o link: ${testimonial.id}`
    );
  }

  // Se já foi enviado, mostrar mensagem de agradecimento
  if (testimonial.status === "SUBMITTED") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Obrigado pelo seu depoimento! 🎉
          </h1>
          <p className="text-gray-600 mb-6">
            Seu depoimento foi enviado com sucesso e está sendo analisado pela
            nossa equipe.
          </p>
          <p className="text-sm text-gray-500">
            Agradecemos muito por dedicar seu tempo para nos ajudar!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">NOVOCODE</h1>
            <p className="text-gray-600">Tecnologia e Sistemas</p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Olá, {testimonial.clientName}! 👋
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Gostaríamos muito de saber sua opinião sobre o trabalho que
            desenvolvemos para você. Seu feedback é muito importante para nós!
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <TestimonialForm testimonial={testimonial} />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2024 NOVOCODE TECNOLOGIA E SISTEMAS LTDA</p>
          <p>Este link é único e pessoal. Obrigado por sua colaboração!</p>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { token } = await params;

  const testimonial = await prisma.testimonial.findUnique({
    where: { requestToken: token },
  });

  if (!testimonial) {
    return {
      title: "Depoimento não encontrado",
    };
  }

  return {
    title: `Depoimento - ${testimonial.clientName} | NOVOCODE`,
    description: "Deixe seu depoimento sobre nossos serviços",
    robots: "noindex, nofollow", // Não indexar páginas de depoimento
  };
}
