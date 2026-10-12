"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import postsData from "@/data/posts.json";
import { ArrowLeft, Calendar, BookOpen, Share2, Sparkles } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = postsData.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-bold font-cardo text-brand-dark">Artikeln hittades inte</h1>
        <p className="text-brand-darkGrey">Den efterfrågade artikeln finns inte eller har flyttats.</p>
        <Link
          href="/artiklar"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-purple text-white font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tillbaka till artiklar</span>
        </Link>
      </div>
    );
  }

  return (
    <article className="space-y-12 pb-20">
      
      {/* Full-bleed Hero with authentic background image */}
      <PageHero
        badge="Skolyoga Artikel"
        badgeIcon={<BookOpen className="w-3.5 h-3.5" />}
        title={post.title}
        description={`Publicerad: ${post.date} • Skolyoga Redaktionen`}
        bgImage="/images/heroes/photoshoot_2068.jpg"
        bgAlt="Skolyoga artikel bakgrund"
        align="left"
        objectPosition="object-[65%_40%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Back button */}
          <div>
            <Link
              href="/artiklar"
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-darkGrey hover:text-brand-purple transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Tillbaka till alla artiklar</span>
            </Link>
          </div>

      {/* Article Content */}
      <div className="bg-white rounded-3xl border border-[#E3DFC9] p-8 sm:p-12 shadow-sm">
        <div 
          className="prose prose-stone max-w-none text-brand-darkGrey leading-relaxed text-base space-y-4 [&>p]:leading-relaxed [&>h2]:font-cardo [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-brand-dark [&>h2]:mt-8 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>blockquote]:border-l-4 [&>blockquote]:border-brand-turquoise [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-brand-dark"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Bottom CTA */}
      <div className="rounded-3xl bg-brand-sand border border-[#E3DFC9] p-8 text-center space-y-4">
        <h3 className="text-xl font-bold font-cardo text-brand-dark">
          Vill du lära dig mer om hur Skolyoga kan implementeras på er skola?
        </h3>
        <p className="text-sm text-brand-darkGrey max-w-md mx-auto">
          Vi erbjuder skräddarsydda workshops och 100h-utbildning för pedagoger och elevhälsa.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link
            href="/utbildningar"
            className="px-6 py-3 rounded-full bg-brand-purple text-white text-xs font-semibold hover:bg-brand-purple/90 transition-all"
          >
            Se våra utbildningar
          </Link>
          <Link
            href="/kontakt"
            className="px-6 py-3 rounded-full bg-white border border-[#D5D0BE] text-brand-dark text-xs font-semibold hover:bg-stone-50 transition-all"
          >
            Kontakta oss
          </Link>
        </div>
      </div>

        </div>
      </div>
    </article>
  );
}
