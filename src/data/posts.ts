/**
 * ⚠️ 플레이스홀더 콘텐츠입니다.
 *
 * 외부 블로그에 쓴 글 중 대표작만 골라 수동으로 등록합니다.
 * 자동 수집(RSS)은 빌드 스크립트와 의존성을 부르므로, 목록이 관리하기 버거워질 때 옮깁니다.
 * 최신 글이 위로 오도록 배열 순서를 유지하세요.
 */

export type Post = {
  title: string
  /** "2026-03-14" */
  date: string
  summary: string
  /** 게재 매체 이름 */
  platform: string
  url: string
}

export const posts: Post[] = [
  {
    title: '프레임워크 없이 만든 포트폴리오, 6개월 뒤의 후기',
    date: '2026-06-02',
    summary:
      '의존성 없이 만들면 무엇이 편하고 무엇이 불편한지, 실제로 유지보수해본 다음에야 알게 된 것들을 정리했습니다.',
    platform: 'velog',
    url: 'https://velog.io/@example/post-1',
  },
  {
    title: 'LCP 4.1초를 1.6초로 줄이기까지 실제로 효과가 있었던 것들',
    date: '2026-03-14',
    summary: '흔히 권장되는 최적화 목록 중 우리 서비스에서 실제로 숫자를 움직인 항목은 넷뿐이었습니다.',
    platform: 'velog',
    url: 'https://velog.io/@example/post-2',
  },
  {
    title: '한국어 스크린리더에서만 깨지는 것들',
    date: '2025-11-20',
    summary: '영어권 접근성 가이드를 그대로 따랐을 때 한국어 환경에서 놓치게 되는 열두 가지 경우를 모았습니다.',
    platform: '개인 블로그',
    url: 'https://example.com/post-3',
  },
  {
    title: '결정 기록을 남기지 않으면 6개월 뒤의 우리가 같은 논쟁을 한다',
    date: '2025-08-07',
    summary: '코드 리뷰와 설계 문서에 "왜"를 남기는 습관이 팀의 속도를 어떻게 바꿨는지에 대한 기록입니다.',
    platform: 'velog',
    url: 'https://velog.io/@example/post-4',
  },
]
