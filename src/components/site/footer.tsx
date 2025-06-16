import Link from "next/link";
import { Github, Linkedin, Mail, Phone, MapPin, Heart } from "lucide-react";
import { getSiteConfig } from "@/actions/site-config";
import { OptimizedImage } from "@/components/ui/optimized-image";

export default async function SiteFooter() {
  const currentYear = new Date().getFullYear();
  
  // Tentar buscar configurações, mas não falhar se não conseguir
  let siteConfig = null;
  try {
    siteConfig = await getSiteConfig();
  } catch (error) {
    console.log("⚠️ Usando configurações padrão - erro ao buscar do banco:", error);
  }

  // Dados padrão caso não haja configuração
  const companyName = siteConfig?.companyName || "NOVOCODE";
  const companyDescription =
    siteConfig?.companyDescription ||
    "Transformamos ideias em soluções digitais inovadoras. Especialistas em desenvolvimento web, mobile e consultoria tecnológica.";
  const email = siteConfig?.email || "novocode.tec@gmail.com";
  const phone = siteConfig?.phone || "(47) 98881-5799";
  const whatsapp = siteConfig?.whatsapp || "5547988815799";
  const address = siteConfig?.address || "Brusque, SC";
  const socialGithub =
    siteConfig?.socialGithub || "https://github.com/NovoCode-Tec";
  const socialLinkedin =
    siteConfig?.socialLinkedin || "https://linkedin.com/company/novocode";
  const logo = siteConfig?.logo;

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {" "}
          {/* Company Info */}{" "}
          <div className="space-y-4">
            {" "}
            <div className="flex items-center space-x-3">
              {logo ? (
                <div className="w-12 h-12 relative">
                  <OptimizedImage
                    src={logo}
                    alt={`${companyName} Logo`}
                    fill
                    sizes="48px"
                    className="object-contain object-center"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {companyName.charAt(0)}
                  </span>
                </div>
              )}
              <span className="text-xl font-bold text-white">
                {companyName}
              </span>
            </div>
            <p className="text-sm leading-relaxed">{companyDescription}</p>
            <div className="flex space-x-4">
              {socialGithub && (
                <a
                  href={socialGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {socialLinkedin && (
                <a
                  href={socialLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Nossos Serviços
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/servicos/desenvolvimento-web"
                  className="text-sm hover:text-white transition-colors"
                >
                  Desenvolvimento Web
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/aplicativos-mobile"
                  className="text-sm hover:text-white transition-colors"
                >
                  Aplicativos Mobile
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/consultoria"
                  className="text-sm hover:text-white transition-colors"
                >
                  Consultoria Tecnológica
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/automacao"
                  className="text-sm hover:text-white transition-colors"
                >
                  Automação de Processos
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos/integracao"
                  className="text-sm hover:text-white transition-colors"
                >
                  Integração de Sistemas
                </Link>
              </li>
            </ul>
          </div>
          {/* Resources */}{" "}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/portfolio"
                  className="text-sm hover:text-white transition-colors"
                >
                  Portfólio
                </Link>
              </li>
              <li>
                <Link
                  href="/leads"
                  className="text-sm hover:text-white transition-colors"
                >
                  Geração de Leads
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/tecnologias"
                  className="text-sm hover:text-white transition-colors"
                >
                  Tecnologias
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="text-sm hover:text-white transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/carreira"
                  className="text-sm hover:text-white transition-colors"
                >
                  Carreira
                </Link>
              </li>
            </ul>
          </div>{" "}
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contato</h3>
            <div className="space-y-3">
              {email && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <a
                    href={`mailto:${email}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {email}
                  </a>
                </div>
              )}
              {phone && whatsapp && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-green-400" />
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              )}
              {address && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">
                    {address}
                    <br />
                    <span className="text-xs text-gray-400">
                      Atendimento Remoto
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm">
              <span>
                © {currentYear} NOVOCODE. Todos os direitos reservados.
              </span>
            </div>

            <div className="flex items-center space-x-1 text-sm">
              <span>Feito com</span>
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span>em Busque/SC</span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacidade"
                className="hover:text-white transition-colors"
              >
                Privacidade
              </Link>
              <Link
                href="/termos"
                className="hover:text-white transition-colors"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { SiteFooter };
