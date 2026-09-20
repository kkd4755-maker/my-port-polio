import './App.css'

import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { setupThemeToggle } from './lib/theme.ts'
import { setupHeaderScrollState, setupNavHighlight, setupReveal } from './lib/reveal.ts'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('#app 마운트 지점을 찾을 수 없습니다.')
}

// 동기 렌더해야 아래 DOM 연결이 첫 페인트 전에 실행된다.
flushSync(() => {
  createRoot(app).render(<App />)
})

const themeToggle = document.querySelector<HTMLButtonElement>('#theme-toggle')

if (themeToggle) {
  setupThemeToggle(themeToggle)
}

setupReveal()

const headerElement = document.querySelector<HTMLElement>('.header')

if (headerElement) {
  setupHeaderScrollState(headerElement)
  setupNavHighlight(headerElement.offsetHeight)
}
