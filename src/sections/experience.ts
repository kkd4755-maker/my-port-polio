import { html, icon } from '../lib/html.ts'
import type { RawHtml } from '../lib/html.ts'
import { experience } from '../data/experience.ts'
import type { ExperienceItem } from '../data/experience.ts'

function item(entry: ExperienceItem): RawHtml {
  const org = entry.orgUrl
    ? html`<a class="timeline__org-link" href="${entry.orgUrl}" target="_blank" rel="noopener noreferrer">
        ${entry.org}${icon('external', 'icon icon--inline')}
        <span class="visually-hidden">(새 창 열림)</span>
      </a>`
    : html`${entry.org}`

  return html`
    <li class="timeline__item reveal">
      <p class="timeline__period">${entry.period}</p>
      <h3 class="timeline__title">${entry.title}</h3>
      <p class="timeline__org">${org}</p>
      <p class="timeline__summary">${entry.summary}</p>

      <ul class="timeline__highlights">
        ${entry.highlights.map((highlight) => html`<li>${highlight}</li>`)}
      </ul>

      <ul class="tag-list">
        ${entry.tags.map((tag) => html`<li class="tag">${tag}</li>`)}
      </ul>
    </li>
  `
}

export function experienceSection(): RawHtml {
  return html`
    <section class="section" id="experience" aria-labelledby="experience-title">
      <h2 class="section__title reveal" id="experience-title">경력</h2>
      <ol class="timeline">
        ${experience.map(item)}
      </ol>
    </section>
  `
}
