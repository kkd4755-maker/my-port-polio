import { html, icon } from '../lib/html.ts'
import type { RawHtml } from '../lib/html.ts'
import { profile } from '../data/profile.ts'

export function hero(): RawHtml {
  return html`
    <section class="hero" aria-labelledby="hero-name">
      <img
        class="hero__avatar reveal"
        src="${profile.avatar.src}"
        alt="${profile.avatar.alt}"
        width="120"
        height="120"
      />

      <h1 class="hero__name reveal" id="hero-name">
        ${profile.nameKo}
        <span class="hero__name-en" lang="en">${profile.nameEn}</span>
      </h1>

      <p class="hero__tagline reveal">${profile.tagline}</p>

      <div class="hero__lines reveal">
        ${profile.heroLines.map((line) => html`<p>${line}</p>`)}
      </div>

      <div class="hero__cta reveal">
        <a class="button button--primary" href="#writing">글 읽기</a>
        <a class="button" href="#contact">연락하기</a>
      </div>

      <ul class="social-list reveal">
        ${profile.socials.map(
          (link) => html`
            <li>
              <a
                class="social-list__link"
                href="${link.href}"
                aria-label="${link.label}"
                title="${link.label}"
                ${link.icon === 'mail' ? null : html`target="_blank" rel="noopener noreferrer"`}
              >
                ${icon(link.icon)}
              </a>
            </li>
          `,
        )}
      </ul>
    </section>
  `
}
