import { asset } from './url.ts'

/**
 * `innerHTML`에 문자열을 그대로 대입하는 구조이므로, 보간되는 값은 기본적으로 이스케이프한다.
 * 지금은 저장소 안의 데이터만 들어가지만 규약으로 세워두면 나중에 외부 데이터를 넣을 때 사고를 막는다.
 *
 * 이미 HTML인 값(중첩된 섹션 등)은 `raw()`로 감싸거나, `html` 태그드 템플릿이 반환한
 * `RawHtml`을 그대로 보간하면 이스케이프 없이 삽입된다.
 */

export type RawHtml = { __raw: string }

export function raw(value: string): RawHtml {
  return { __raw: value }
}

export function isRaw(value: unknown): value is RawHtml {
  return typeof value === 'object' && value !== null && '__raw' in value
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function stringify(value: unknown): string {
  if (value === null || value === undefined || value === false) return ''
  if (isRaw(value)) return value.__raw
  if (Array.isArray(value)) return value.map(stringify).join('')
  return escapeHtml(String(value))
}

export function html(strings: TemplateStringsArray, ...values: unknown[]): RawHtml {
  let out = strings[0]
  for (let i = 0; i < values.length; i += 1) {
    out += stringify(values[i]) + strings[i + 1]
  }
  return raw(out)
}

/** `RawHtml`을 DOM에 넣을 수 있는 문자열로 꺼낸다. */
export function render(value: RawHtml): string {
  return value.__raw
}

/** `/icons.svg` 스프라이트의 심볼을 참조하는 인라인 아이콘. 장식용이므로 접근성 트리에서 숨긴다. */
export function icon(name: string, className = 'icon'): RawHtml {
  return html`<svg class="${className}" aria-hidden="true" focusable="false">
    <use href="${asset('/icons.svg')}#${name}"></use>
  </svg>`
}
