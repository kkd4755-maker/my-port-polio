import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { HtmlTagDescriptor, Plugin } from 'vite'
import { profile } from './src/data/profile.ts'

/**
 * 메타 태그와 robots/sitemap을 src/data/profile.ts 하나에서 만들어낸다.
 *
 * 런타임에 JS로 주입하지 않는 이유: OG 카드를 긁어가는 크롤러 상당수는 JS를 실행하지 않는다.
 * 빌드 시점에 정적 HTML로 박아두어야 공유 링크의 미리보기가 제대로 나온다.
 */

const origin = profile.siteUrl.replace(/\/+$/, '')
// 배포 경로(base)는 siteUrl의 경로에서 뽑는다. GitHub Pages 하위 경로 배포면 '/my-port-polio/', 루트면 '/'.
const base = new URL(origin).pathname.replace(/\/?$/, '/')
const pageTitle = `${profile.nameKo} · ${profile.tagline}`
const ogImage = `${origin}/og.png`

function meta(attrs: Record<string, string>): HtmlTagDescriptor {
  return { tag: 'meta', attrs, injectTo: 'head' }
}

function headMeta(): Plugin {
  return {
    name: 'portfolio-head-meta',
    transformIndexHtml() {
      const sameAs = profile.socials
        .map((link) => link.href)
        .filter((href) => href.startsWith('http'))

      const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.nameKo,
        alternateName: profile.nameEn,
        url: `${origin}/`,
        image: ogImage,
        jobTitle: profile.jobTitle,
        description: profile.description,
        email: `mailto:${profile.email}`,
        sameAs,
      }

      const tags: HtmlTagDescriptor[] = [
        { tag: 'title', children: pageTitle, injectTo: 'head' },
        meta({ name: 'description', content: profile.description }),
        meta({ name: 'author', content: profile.nameKo }),
        { tag: 'link', attrs: { rel: 'canonical', href: `${origin}/` }, injectTo: 'head' },

        meta({ property: 'og:type', content: 'profile' }),
        meta({ property: 'og:site_name', content: profile.nameKo }),
        meta({ property: 'og:locale', content: 'ko_KR' }),
        meta({ property: 'og:url', content: `${origin}/` }),
        meta({ property: 'og:title', content: pageTitle }),
        meta({ property: 'og:description', content: profile.description }),
        meta({ property: 'og:image', content: ogImage }),
        meta({ property: 'og:image:width', content: '1200' }),
        meta({ property: 'og:image:height', content: '630' }),
        meta({ property: 'og:image:alt', content: `${profile.nameKo} — ${profile.tagline}` }),

        meta({ name: 'twitter:card', content: 'summary_large_image' }),
        meta({ name: 'twitter:title', content: pageTitle }),
        meta({ name: 'twitter:description', content: profile.description }),
        meta({ name: 'twitter:image', content: ogImage }),

        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(personSchema),
          injectTo: 'head',
        },
      ]

      return tags
    },
  }
}

function siteFiles(): Plugin {
  return {
    name: 'portfolio-site-files',
    apply: 'build',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: ['User-agent: *', 'Allow: /', '', `Sitemap: ${origin}/sitemap.xml`, ''].join('\n'),
      })

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          '  <url>',
          `    <loc>${origin}/</loc>`,
          `    <lastmod>${profile.lastUpdated}</lastmod>`,
          '  </url>',
          '</urlset>',
          '',
        ].join('\n'),
      })
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), headMeta(), siteFiles()],
})
