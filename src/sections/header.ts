import { html, icon } from '../lib/html.ts'
import type { RawHtml } from '../lib/html.ts'
import { navItems, profile } from '../data/profile.ts'

/**
 * 모바일(~639px)에서는 앵커 목록을 CSS로 숨기고 로고와 테마 토글만 남긴다.
 * 섹션이 5개뿐이라 햄버거 메뉴를 여닫는 비용이 그냥 스크롤하는 것보다 크다.
 */
export function header(): RawHtml {
  return html`
    <header class="header" id="top">
      <div class="header__inner container">
        <a class="header__logo" href="#top">${profile.nameKo}</a>

        <nav class="nav" aria-label="섹션 바로가기">
          <ul class="nav__list">
            ${navItems.map(
              (item) => html`
                <li>
                  <a class="nav__link" href="#${item.id}" data-nav-link="${item.id}">${item.label}</a>
                </li>
              `,
            )}
          </ul>
        </nav>

        <button class="theme-toggle" type="button" id="theme-toggle" aria-pressed="false">
          ${icon('sun', 'icon theme-toggle__sun')} ${icon('moon', 'icon theme-toggle__moon')}
        </button>
      </div>
    </header>
  `
}
