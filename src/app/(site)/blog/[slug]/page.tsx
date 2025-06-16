import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BlogCommentForm } from "../_components/BlogCommentForm";
import { marked } from "marked";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      comments: {
        orderBy: { createdAt: "desc" },
        where: { isApproved: true },
      },
    },
  });

  if (!post || post.status !== "PUBLISHED") return notFound();

  const totalRatings = post.comments.length;
  const avgRating =
    totalRatings > 0
      ? (
          post.comments.reduce((acc, c) => acc + c.rating, 0) / totalRatings
        ).toFixed(1)
      : null;

  const htmlContent = marked.parse(post.content || "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Header do Post */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                💬 {post.comments.length} comentário(s)
              </span>
              {avgRating && (
                <span className="flex items-center gap-2">
                  ⭐ Média: {avgRating}/5
                </span>
              )}
              {post.readingTime && (
                <span className="flex items-center gap-2">
                  ⏱️ {post.readingTime} min de leitura
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Conteúdo do Post */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>

        {/* Formulário de Comentário */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <BlogCommentForm postId={post.id} />
        </div>

        {/* Seção de Comentários */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            💬 Comentários ({post.comments.length})
          </h2>

          {post.comments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💭</div>
              <p className="text-gray-500 text-lg">
                Seja o primeiro a comentar!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-l-4 border-blue-500 bg-gray-50 rounded-r-lg p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {comment.name}
                        </h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < comment.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }
                            >
                              ⭐
                            </span>
                          ))}
                          <span className="ml-2 text-sm text-gray-500">
                            ({comment.rating}/5)
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">
                      {new Date(comment.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {comment.content && (
                    <p className="text-gray-700 leading-relaxed">
                      {comment.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
