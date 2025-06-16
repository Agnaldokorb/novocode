import { prisma } from "@/lib/prisma";

// Função para buscar estatísticas gerais do site
export async function getSiteStats() {
  try {
    // Buscar quantidade de serviços publicados
    const servicesCount = await prisma.service.count({
      where: {
        status: "PUBLISHED",
      },
    });

    // Buscar quantidade de projetos publicados no portfólio
    const projectsCount = await prisma.portfolio.count({
      where: {
        publicationStatus: "PUBLISHED",
      },
    });

    // Buscar quantidade de clientes (leads com status WON)
    const clientsCount = await prisma.lead.count({
      where: {
        status: "WON",
      },
    });

    // Buscar quantidade de tecnologias ativas
    const technologiesCount = await prisma.technology.count({
      where: {
        isActive: true,
      },
    });

    // Calcular anos de experiência (2023 até ano atual)
    const currentYear = new Date().getFullYear();
    const startYear = 2023;
    const yearsOfExperience = currentYear - startYear + 1;

    return {
      services: servicesCount,
      projects: projectsCount,
      clients: clientsCount,
      technologies: technologiesCount,
      years: yearsOfExperience,
      satisfaction: 100, // Valor fixo para satisfação
      categories: 5, // Valor baseado nas categorias de tecnologia
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);

    // Retornar valores padrão em caso de erro
    return {
      services: 5,
      projects: 100,
      clients: 50,
      technologies: 9,
      years: 3,
      satisfaction: 100,
      categories: 5,
    };
  }
}

// Função específica para estatísticas de serviços
export async function getServicesStats() {
  try {
    const stats = await getSiteStats();
    return {
      services: stats.services,
      projects: stats.projects,
      clients: stats.clients,
      years: stats.years,
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas de serviços:", error);
    return {
      services: 5,
      projects: 100,
      clients: 50,
      years: 3,
    };
  }
}

// Função específica para estatísticas de tecnologias
export async function getTechnologiesStats() {
  try {
    const stats = await getSiteStats();
    return {
      technologies: stats.technologies,
      categories: stats.categories,
      years: stats.years,
      projects: stats.projects,
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas de tecnologias:", error);
    return {
      technologies: 9,
      categories: 5,
      years: 3,
      projects: 100,
    };
  }
}

// Função específica para estatísticas de portfólio
export async function getPortfolioStats() {
  try {
    const stats = await getSiteStats();
    return {
      projects: stats.projects,
      satisfaction: stats.satisfaction,
      years: stats.years,
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas de portfólio:", error);
    return {
      projects: 50,
      satisfaction: 100,
      years: 3,
    };
  }
}

// Função específica para estatísticas da página sobre
export async function getAboutStats() {
  try {
    const stats = await getSiteStats();
    return {
      projects: stats.projects,
      clients: stats.clients,
      years: stats.years,
      satisfaction: stats.satisfaction,
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas sobre:", error);
    return {
      projects: 50,
      clients: 30,
      years: 3,
      satisfaction: 100,
    };
  }
}
