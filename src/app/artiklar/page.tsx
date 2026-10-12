"use client";

import React from "react";
import Link from "next/link";
import postsData from "@/data/posts.json";
import { BookOpen, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";

export default function ArtiklarPage() {
  return (
    <div className="space-y-12 pb-20">
      
      {/* Full-bleed Hero with authentic background image */}
      <PageHero
        badge="Artiklar & Nyheter"
        badgeIcon={<BookOpen className="w-3.5 h-3.5" />}
        title="Läs det senaste från Skolyoga"
        description="Artiklar och fördjupningar om trygghetsarbete, nervsystemsreglering, forskningsprojekt och hur skolor praktiserar Skolyoga."
        bgImage="/images/heroes/photoshoot_2068.jpg"
        bgAlt="Skolyoga artiklar bakgrund"
        align="center"
        objectPosition="object-[65%_40%]"
      />

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {postsData.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-3xl border border-[#E3DFC9] p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-brand-darkGrey font-medium">
                <Calendar className="w-3.5 h-3.5 text-brand-grey" />
                <span>{post.date}</span>
              </div>

              <h2 className="text-2xl font-bold font-cardo text-brand-dark group-hover:text-brand-purple transition-colors leading-snug">
                <Link href={`/artiklar/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-sm text-brand-darkGrey leading-relaxed line-clamp-4">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-6 border-t border-[#EBE8DC] mt-6">
              <Link
                href={`/artiklar/${post.slug}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-brand-purple hover:underline"
              >
                <span>Läs hela artikeln</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      </div>
    </div>
  );
}
