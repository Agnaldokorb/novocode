import { Metadata } from "next";
import { getBlogPosts } from "@/actions/blog";
import Link from "next/link";

export default async function BlogPage() {
  // Buscar posts publicados
  interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
  }
  
  let posts: BlogPost[] = [];
  try {
    const result = await getBlogPosts();
    if (result.success) {
      posts = result.data || [];
    }
  } catch (error) {
    console.error("Erro ao buscar posts do blog:", error);
    // Continua com array vazio se não conseguir conectar ao banco
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog & Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compartilhamos conhecimento, tendências e insights sobre tecnologia,
            desenvolvimento e inovação.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nenhum post publicado ainda. Volte em breve!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Ler mais →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Blog - Novocode",
  description:
    "Insights, tendências e conhecimento sobre tecnologia e desenvolvimento.",
};
