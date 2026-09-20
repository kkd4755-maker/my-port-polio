/**
 * ⚠️ 플레이스홀더 콘텐츠입니다.
 *
 * 실물 정보가 준비되면 이 파일의 값만 교체하면 됩니다. 섹션 코드나 CSS는 건드릴 필요가 없습니다.
 * 레이아웃이 실물에서 깨지지 않도록, 값은 실제와 비슷하거나 조금 더 긴 분량으로 채워두었습니다.
 */

export type SocialIcon = 'github' | 'pen' | 'mail' | 'linkedin'

export type SocialLink = {
  label: string
  href: string
  icon: SocialIcon
}

export type Profile = {
  /** 사이트 절대 URL. canonical / OG / sitemap 에 쓰인다. 배포 도메인이 정해지면 교체한다. */
  siteUrl: string
  nameKo: string
  nameEn: string
  /** 직함이 아니라 '하는 일'에 대한 한 문장. */
  tagline: string
  /** 검색 결과와 OG 카드에 노출되는 요약. 80~120자를 권장한다. */
  description: string
  /** JSON-LD Person 스키마의 jobTitle. */
  jobTitle: string
  /** 푸터에 표기할 마지막 갱신일. "2026-09-20" */
  lastUpdated: string
  /** Hero 태그라인 아래 보조 문장 1~2줄. */
  heroLines: string[]
  avatar: { src: string; alt: string }
  /** About 섹션 본문. 문단 단위 배열. */
  about: string[]
  email: string
  /** Writing 섹션 하단 '전체 글 보기' 링크. */
  blogUrl: string
  socials: SocialLink[]
}

export const profile: Profile = {
  siteUrl: 'https://kkd4755-maker.github.io/my-port-polio',
  nameKo: '김도현',
  nameEn: 'Dohyun Kim',
  tagline: '쓰는 것으로 생각을 정리하는 프론트엔드 개발자',
  description:
    '웹 성능과 접근성을 중심에 두고 프론트엔드를 만드는 김도현의 홈입니다. 경력과 그동안 쓴 글을 모아두었습니다.',
  jobTitle: '프론트엔드 엔지니어',
  lastUpdated: '2026-09-20',
  heroLines: [
    '웹에서 읽고 쓰는 경험을 만듭니다. 빠르고, 접근 가능하고, 오래 유지보수할 수 있는 쪽을 고릅니다.',
    '배운 것은 글로 남깁니다. 남긴 글이 다음 사람의 시간을 아껴주는 게 좋아서요.',
  ],
  avatar: {
    src: '/avatar.svg',
    alt: '김도현 프로필 사진',
  },
  about: [
    '프론트엔드를 7년째 하고 있습니다. 커머스 플랫폼에서 주문·결제 화면을 만들었고, 지금은 사내 디자인 시스템과 웹 성능을 맡고 있습니다. 화려한 인터랙션보다 페이지가 0.3초 빨라지는 쪽에 더 오래 시간을 씁니다.',
    '제가 생각하는 좋은 프론트엔드는 눈에 띄지 않는 것입니다. 키보드로만 써도 막히지 않고, 스크린리더로 읽어도 순서가 맞고, 3G 환경에서도 첫 화면이 뜨는 것. 이런 건 기능 목록에 안 적히지만 결국 제품의 신뢰를 만듭니다.',
    '팀에서는 주로 "왜 이렇게 했는지"를 남기는 역할을 합니다. 결정의 배경이 사라지면 6개월 뒤의 우리가 같은 논쟁을 반복하게 되니까요. 코드 리뷰에서도 무엇을 고칠지보다 어떤 기준으로 판단했는지를 먼저 적습니다.',
    '요즘은 웹 표준과 플랫폼 기본기에 관심이 많습니다. 프레임워크가 해주던 일을 브라우저가 점점 직접 해내고 있어서, 어디까지 덜어낼 수 있는지 실험해보는 중입니다. 이 사이트도 그 실험의 하나로 의존성 없이 만들었습니다.',
  ],
  email: 'hello@example.com',
  blogUrl: 'https://velog.io/@example',
  socials: [
    { label: 'GitHub', href: 'https://github.com/example', icon: 'github' },
    { label: '블로그', href: 'https://velog.io/@example', icon: 'pen' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/example', icon: 'linkedin' },
    { label: '이메일', href: 'mailto:hello@example.com', icon: 'mail' },
  ],
}

/** 헤더 네비게이션과 스크롤 활성 표시가 공유하는 섹션 목록. */
export const navItems = [
  { id: 'about', label: '소개' },
  { id: 'experience', label: '경력' },
  { id: 'writing', label: '글' },
  { id: 'contact', label: '연락' },
] as const
