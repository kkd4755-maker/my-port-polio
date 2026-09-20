import { html } from '../lib/html.ts'
import type { RawHtml } from '../lib/html.ts'
import { profile } from '../data/profile.ts'

export function about(): RawHtml {
  return html`
    <section class="section" id="about" aria-labelledby="about-title">
      <h2 class="section__title reveal" id="about-title">소개</h2>
      <div class="prose reveal">
        ${profile.about.map((paragraph) => html`<p>${paragraph}</p>`)}
      </div>
    </section>
  `
}
