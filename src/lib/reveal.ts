/**
 * 스크롤 관련 인터랙션 세 가지.
 *
 * 초기 숨김(`.reveal-ready`)은 여기서 클래스를 붙인 뒤에야 적용된다.
 * 번들 로드에 실패하거나 IntersectionObserver가 없으면 클래스가 안 붙으므로 콘텐츠는 그냥 보인다.
 * `innerHTML` 대입 직후 동기적으로 호출되므로 첫 페인트 전에 숨김이 걸려 깜빡임은 없다.
 */

/** 섹션·카드 진입 시 페이드인. 한 번 나타난 요소는 다시 숨기지 않는다. */
export function setupReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('.reveal')

  if (targets.length === 0 || !('IntersectionObserver' in window)) return

  document.documentElement.classList.add('reveal-ready')

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  )

  for (const target of targets) {
    observer.observe(target)
  }
}

/** 현재 보고 있는 섹션의 네비 앵커에 aria-current를 준다. */
export function setupNavHighlight(headerHeight: number): void {
  const links = new Map<string, HTMLAnchorElement>()

  for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')) {
    const id = link.dataset.navLink
    if (id) links.set(id, link)
  }

  if (links.size === 0 || !('IntersectionObserver' in window)) return

  const order = Array.from(links.keys())
  const visible = new Set<string>()

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id)
        else visible.delete(entry.target.id)
      }

      // 여러 섹션이 동시에 보이면 문서 순서상 가장 위의 것을 현재 위치로 본다.
      const active = order.find((id) => visible.has(id))

      for (const id of order) {
        const link = links.get(id)
        if (!link) continue
        if (id === active) link.setAttribute('aria-current', 'location')
        else link.removeAttribute('aria-current')
      }
    },
    // 고정 헤더에 가린 영역은 '보이는' 것으로 치지 않는다.
    { rootMargin: `-${headerHeight}px 0px -55% 0px` },
  )

  for (const id of order) {
    const section = document.getElementById(id)
    if (section) observer.observe(section)
  }
}

/** 페이지가 조금이라도 스크롤되면 헤더에 하단 보더를 띄운다. */
export function setupHeaderScrollState(header: HTMLElement): void {
  let queued = false

  const apply = () => {
    queued = false
    header.dataset.scrolled = String(window.scrollY > 8)
  }

  apply()

  window.addEventListener(
    'scroll',
    () => {
      if (queued) return
      queued = true
      requestAnimationFrame(apply)
    },
    { passive: true },
  )
}
