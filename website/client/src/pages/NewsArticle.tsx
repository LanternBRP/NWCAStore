// NWCA Design System — Dark Navy (#0A1628) base, Gold (#F5C842) accents, Red (#C41E3A) CTAs
// Article detail page — full internal article view with related articles sidebar

import { useParams, Link } from 'wouter';
import { ArrowLeft, Calendar, Tag, ExternalLink, ChevronRight } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { getArticleBySlug, getRecentArticles, type Article } from '@/lib/articles';

function ArticleNotFound() {
  return (
    <div className="min-h-screen bg-[#0A1628] flex flex-col">
      <NavBar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="font-display text-8xl text-[#F5C842] mb-4">404</div>
          <h1 className="font-display text-3xl text-white mb-4">Article Not Found</h1>
          <p className="font-body text-[#c8cdd6] mb-8">This article may have moved or been removed.</p>
          <Link href="/press" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function RelatedCard({ article }: { article: Article }) {
  return (
    <Link href={`/news/${article.slug}`} className="group block border-b border-white/10 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <div className="font-condensed text-[10px] tracking-widest uppercase text-[#F5C842] mb-1">{article.category}</div>
      <h4 className="font-condensed font-700 text-sm text-white group-hover:text-[#F5C842] transition-colors leading-snug mb-1">
        {article.headline}
      </h4>
      <div className="font-body text-[11px] text-[#8892a4]">{article.date}</div>
    </Link>
  );
}

export default function NewsArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || '');

  if (!article) {
    return <ArticleNotFound />;
  }

  const related = getRecentArticles(6).filter(a => a.slug !== article.slug).slice(0, 4);
  const paragraphs = article.body.split('\n\n').filter(p => p.trim().length > 0);

  return (
    <div className="min-h-screen bg-[#0A1628] flex flex-col">
      <NavBar />

      {/* ── HERO ── */}
      <div className="relative bg-[#0D1220] border-b border-white/10">
        {article.imageUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${article.imageUrl})` }}
          />
        )}
        <div className="relative container py-16 md:py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/press" className="font-condensed text-[11px] tracking-widest uppercase text-[#c8cdd6] hover:text-[#F5C842] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> All News
            </Link>
            <span className="text-white/30">/</span>
            <span className="font-condensed text-[11px] tracking-widest uppercase text-[#F5C842]">{article.category}</span>
          </div>

          {/* Category badge */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="bg-[#C41E3A] font-condensed font-700 text-[10px] tracking-widest uppercase text-white px-3 py-1">
              {article.category}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-white leading-tight max-w-4xl mb-6">
            {article.headline}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-[#c8cdd6]">
              <Calendar className="w-4 h-4 text-[#F5C842]" />
              <span className="font-body">{article.date}</span>
            </div>
            {article.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="w-4 h-4 text-[#F5C842]" />
                {article.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/press?tag=${encodeURIComponent(tag)}`}
                    className="font-condensed text-[10px] tracking-widest uppercase text-[#c8cdd6] hover:text-[#F5C842] transition-colors border border-white/20 px-2 py-0.5 hover:border-[#F5C842]/40"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Article body */}
          <article className="lg:col-span-2">
            {article.imageUrl && (
              <div className="mb-8 overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt={article.headline}
                  className="w-full object-cover max-h-96"
                />
              </div>
            )}

            <div className="prose-nwca">
              {paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="font-body text-[#d0d5de] text-base leading-relaxed mb-5"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Back button */}
            <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between">
              <Link href="/press" className="btn-outline inline-flex items-center gap-2 text-white border-white/30 hover:border-white">
                <ArrowLeft className="w-4 h-4" /> All News
              </Link>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="font-condensed text-[11px] tracking-widest uppercase text-[#8892a4] hover:text-[#c8cdd6] transition-colors flex items-center gap-1"
              >
                Original Source <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-[#111827] border border-white/10 p-6 sticky top-24">
              <div className="font-condensed text-[11px] tracking-widest uppercase text-[#F5C842] mb-4">Recent News</div>
              {related.map(a => (
                <RelatedCard key={a.slug} article={a} />
              ))}
              <Link
                href="/press"
                className="mt-4 flex items-center gap-1 font-condensed text-[11px] tracking-widest uppercase text-white hover:text-white transition-colors"
              >
                All News <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
