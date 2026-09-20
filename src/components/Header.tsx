import { navItems, profile } from '../data/profile.ts'
import { asset } from '../lib/url.ts'

/**
 * 모바일(~639px)에서는 앵커 목록을 CSS로 숨기고 로고와 테마 토글만 남긴다.
 * 테마 토글의 aria 속성과 클릭 동작은 `lib/theme.ts`가 마운트 후에 연결한다.
 */
export function Header() {
  return (
    <header className="header" id="top">
      <div className="header__inner container">
        <a className="header__logo" href="#top">
          {profile.nameKo}
        </a>

        <nav className="nav" aria-label="섹션 바로가기">
          <ul className="nav__list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a className="nav__link" href={`#${item.id}`} data-nav-link={item.id}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button className="theme-toggle" type="button" id="theme-toggle" aria-pressed="false">
          <svg className="icon theme-toggle__sun" aria-hidden="true" focusable="false">
            <use href={`${asset('/icons.svg')}#sun`} />
          </svg>{' '}
          <svg className="icon theme-toggle__moon" aria-hidden="true" focusable="false">
            <use href={`${asset('/icons.svg')}#moon`} />
          </svg>
        </button>
      </div>
    </header>
  )
}
