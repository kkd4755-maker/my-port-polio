import { About } from './components/About.tsx'
import { Contact } from './components/Contact.tsx'
import { Header } from './components/Header.tsx'
import { Projects } from './components/Projects.tsx'
import { render } from './lib/html.ts'
import { hero } from './sections/hero.ts'
import { experienceSection } from './sections/experience.ts'
import { writing } from './sections/writing.ts'
import { footer } from './sections/contact.ts'

// 헤더 외 섹션은 아직 문자열 템플릿이므로 그대로 삽입한다.
const heroHtml = render(hero())
const experienceHtml = render(experienceSection())
const writingHtml = render(writing())
const footerHtml = render(footer())

export function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        본문 바로가기
      </a>
      <Header />
      <main className="main" id="main">
        <div dangerouslySetInnerHTML={{ __html: heroHtml }} />
        <About />
        <div dangerouslySetInnerHTML={{ __html: experienceHtml }} />
        <Projects />
        <div dangerouslySetInnerHTML={{ __html: writingHtml }} />
        <Contact />
      </main>
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </>
  )
}
