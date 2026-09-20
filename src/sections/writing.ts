import { html, icon } from '../lib/html.ts'
import type { RawHtml } from '../lib/html.ts'
import { posts } from '../data/posts.ts'
import type { Post } from '../data/posts.ts'
import { profile } from '../data/profile.ts'

/** "2026-03-14" → "2026년 3월 14일". 잘못된 값이 와도 원본을 그대로 보여준다. */
function formatDate(value: string): string {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return `${parsed.getFullYear()}년 ${parsed.getMonth() + 1}월 ${parsed.getDate()}일`
}

function entry(post: Post): RawHtml {
  return html`
    <li class="post reveal">
      <h3 class="post__title">
        <a class="post__link" href="${post.url}" target="_blank" rel="noopener noreferrer">
          ${post.title}${icon('external', 'icon icon--inline')}
          <span class="visually-hidden">(새 창 열림)</span>
        </a>
      </h3>
      <p class="post__summary">${post.summary}</p>
      <p class="post__meta">
        <time datetime="${post.date}">${formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>${post.platform}</span>
      </p>
    </li>
  `
}

export function writing(): RawHtml {
  return html`
    <section class="section" id="writing" aria-labelledby="writing-title">
      <h2 class="section__title reveal" id="writing-title">글</h2>
      <ul class="post-list">
        ${posts.map(entry)}
      </ul>
      <p class="reveal">
        <a class="button" href="${profile.blogUrl}" target="_blank" rel="noopener noreferrer">
          전체 글 보기${icon('external', 'icon icon--inline')}
          <span class="visually-hidden">(새 창 열림)</span>
        </a>
      </p>
    </section>
  `
}
