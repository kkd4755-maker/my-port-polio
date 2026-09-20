import { profile } from '../data/profile.ts'

/** 자기소개 산문. 문단 내용은 `data/profile.ts`의 `about` 배열에서 읽는다. */
export function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <h2 className="section__title reveal" id="about-title">
        소개
      </h2>
      <div className="prose reveal">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}
