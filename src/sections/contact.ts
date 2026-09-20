import { html, icon } from '../lib/html.ts'
import type { RawHtml } from '../lib/html.ts'
import { profile } from '../data/profile.ts'

export function contact(): RawHtml {
  return html`
    <section class="section" id="contact" aria-labelledby="contact-title">
      <h2 class="section__title reveal" id="contact-title">연락</h2>

      <div class="contact reveal">
        <p class="contact__lead">하고 싶은 이야기가 있으면 편하게 메일 주세요. 읽고 답장합니다.</p>

        <!-- 난독화 없이 평범한 mailto: 로 둔다. 스팸 봇 대비보다 접근성과 편의가 우선이다. -->
        <a class="contact__email" href="mailto:${profile.email}">
          ${icon('mail')}
          <span>${profile.email}</span>
        </a>

        <ul class="social-list">
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
      </div>
    </section>
  `
}

export function footer(): RawHtml {
  return html`
    <footer class="footer">
      <div class="footer__inner container">
        <p>© ${new Date().getFullYear()} ${profile.nameKo}</p>
        <p>마지막 업데이트 ${profile.lastUpdated}</p>
      </div>
    </footer>
  `
}
