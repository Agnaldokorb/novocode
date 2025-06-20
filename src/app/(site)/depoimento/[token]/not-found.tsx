import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Link de Depoimento Inválido
        </h1>

        <p className="text-gray-600 mb-6">
          O link que você acessou não é válido ou pode ter expirado.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">Possíveis motivos:</p>
          <ul className="text-sm text-gray-500 text-left space-y-1">
            <li>• Link digitado incorretamente</li>
            <li>• Link já foi utilizado</li>
            <li>• Link expirado</li>
          </ul>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Voltar ao Site
          </Link>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          <p>© 2024 NOVOCODE TECNOLOGIA E SISTEMAS LTDA</p>
        </div>
      </div>
    </div>
  );
}
