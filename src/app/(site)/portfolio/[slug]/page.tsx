import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPortfolioBySlugAction } from "@/actions/portfolio";
import { ProjectHero } from "../_components/project-hero";
import { ProjectContent } from "../_components/project-content";
import { ProjectGallery } from "../_components/project-gallery";
import { ProjectTechnologies } from "../_components/project-technologies";
import { RelatedProjects } from "../_components/related-projects";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlugAction(slug);

  if (!portfolio.success || !portfolio.data) {
    return {
      title: "Projeto não encontrado - NOVOCODE",
    };
  }

  const project = portfolio.data.portfolio;

  return {
    title: `${project.title} - NOVOCODE`,
    description: project.metaDescription || project.shortDescription,
    keywords: project.keywords,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.thumbnail ? [project.thumbnail] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const portfolio = await getPortfolioBySlugAction(slug);

  if (!portfolio.success || !portfolio.data) {
    notFound();
  }

  const project = portfolio.data.portfolio;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ProjectHero project={project} />

      {/* Main Content */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Project Content */}
            <ProjectContent project={project} />

            {/* Technologies Used */}
            {project.technologies && project.technologies.length > 0 && (
              <ProjectTechnologies technologies={project.technologies} />
            )}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <ProjectGallery gallery={project.gallery} title={project.title} />
            )}
          </div>
        </div>
      </div>

      {/* Related Projects */}
      <RelatedProjects currentProjectId={project.id} />
    </div>
  );
}
