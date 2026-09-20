export type Project = {
  title: string
  /** 한 줄 요약. */
  summary: string
  /** 사용 기술 / 키워드. */
  tags: string[]
  /** 데모 또는 저장소 링크. 없으면 제목만 표시한다. */
  url?: string
}

/** 작업물을 추가하려면 이 배열 끝에 항목 하나만 더하면 된다. 아래 컴포넌트는 건드리지 않아도 된다. */
const projects: Project[] = [
  {
    title: '사내 디자인 시스템',
    summary: '흩어져 있던 버튼·폼·모달을 하나의 컴포넌트 라이브러리로 통합하고 접근성 기준을 코드로 강제했습니다.',
    tags: ['TypeScript', 'React', 'Storybook', 'a11y'],
    url: 'https://github.com/example/design-system',
  },
  {
    title: '결제 화면 성능 개선',
    summary: '번들을 나누고 이미지 로딩을 손봐 결제 화면의 첫 렌더링을 0.3초 앞당겼습니다.',
    tags: ['Vite', 'Web Vitals', 'Lighthouse'],
    url: 'https://github.com/example/checkout-perf',
  },
  {
    title: '개인 포트폴리오 사이트',
    summary: '외부 요청 없이 정적으로 배포되는 한 페이지짜리 포트폴리오. 지금 보고 계신 사이트입니다.',
    tags: ['React', 'Vite', 'CSS'],
  },
]

export function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <h2 className="section__title reveal" id="projects-title">
        작업물
      </h2>
      <ul className="project-list">
        {projects.map((project) => (
          <li className="project-card reveal" key={project.title}>
            <h3 className="project-card__title">
              {project.url ? (
                <a className="project-card__link" href={project.url} target="_blank" rel="noopener noreferrer">
                  {project.title}
                  <span className="visually-hidden">(새 창 열림)</span>
                </a>
              ) : (
                project.title
              )}
            </h3>
            <p className="project-card__summary">{project.summary}</p>
            <ul className="tag-list">
              {project.tags.map((tag) => (
                <li className="tag" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}
