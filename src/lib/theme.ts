export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

/**
 * `localStorage`는 프라이빗 모드나 사이트 데이터 차단 상태에서 읽기·쓰기 모두 예외를 던질 수 있다.
 * 테마는 있으면 좋은 편의 기능이지 필수 상태가 아니므로, 실패는 조용히 삼키고 시스템 설정으로 돌아간다.
 */
function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function writeStored(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* 저장에 실패해도 이번 세션의 테마 적용은 유효하다 */
  }
}

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/** `index.html`의 인라인 스크립트가 이미 확정해둔 값을 읽는다. */
export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function applyTheme(theme: Theme, button: HTMLButtonElement): void {
  document.documentElement.dataset.theme = theme
  const toDark = theme === 'light'
  button.setAttribute('aria-pressed', String(theme === 'dark'))
  button.setAttribute('aria-label', toDark ? '다크 모드로 전환' : '라이트 모드로 전환')
  button.setAttribute('title', toDark ? '다크 모드로 전환' : '라이트 모드로 전환')
}

export function setupThemeToggle(button: HTMLButtonElement): void {
  applyTheme(currentTheme(), button)

  button.addEventListener('click', () => {
    const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
    applyTheme(next, button)
    writeStored(next)
  })

  // 사용자가 직접 고르기 전까지는 시스템 설정 변화를 따라간다.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (readStored() === null) {
      applyTheme(systemTheme(), button)
    }
  })
}
