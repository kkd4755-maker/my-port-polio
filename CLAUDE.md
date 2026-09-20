# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

- `npm install` — 가장 먼저 실행해야 합니다. 의존성을 설치하기 전에는 `vite`를 사용할 수 없습니다.
- `npm run dev` — HMR이 적용된 Vite 개발 서버 (http://localhost:5173/).
- `npm run build` — `tsc`로 타입 검사(출력 없음)를 한 뒤 `vite build`를 실행합니다.
- `npm run preview` — 프로덕션 빌드를 로컬에서 서빙합니다.

테스트 러너와 린터는 설정되어 있지 않습니다.

## 아키텍처

React + TypeScript + Vite로 만든 싱글 페이지 포트폴리오입니다. 런타임 의존성은 `react`, `react-dom`뿐입니다.
Header, About, Projects, Contact는 React 컴포넌트이고 Hero·Experience·Writing·footer는 아직 문자열 템플릿인 과도기 구조입니다.
요구사항과 설계 결정의 배경은 `docs/요구사항.md`에 있습니다. 구조를 바꾸기 전에 읽어주세요.

- `index.html`이 `src/main.tsx`를 불러오며, `#app` 마운트 지점이 있습니다. `<head>`의 인라인 스크립트는 FOUC 방지를 위해 번들보다 먼저 테마를 확정합니다.
- `src/main.tsx`는 `flushSync`로 `<App />`을 `#app`에 동기 렌더한 뒤, 테마 토글·스크롤 애니메이션 등 DOM 동작을 연결합니다. 첫 페인트 전에 실행돼야 하므로 동기 렌더를 유지합니다.
- `src/App.tsx`는 React 컴포넌트와 문자열 섹션을 순서대로 조립합니다. 문자열 섹션(hero, experience, writing, footer)은 `<div>`로 감싸 `dangerouslySetInnerHTML`로 삽입합니다. React 자식과 `dangerouslySetInnerHTML`은 한 요소에 함께 쓸 수 없기 때문입니다.
- `src/components/` — React 컴포넌트. 파일 하나에 컴포넌트 하나입니다.
  - `Header.tsx` — 로고, 네비게이션, 테마 토글 버튼. 토글의 aria 속성과 클릭 동작은 마운트 후 `lib/theme.ts`가 연결합니다.
  - `About.tsx`, `Contact.tsx` — 내용은 `data/profile.ts`에서 읽습니다.
  - `Projects.tsx` — 작업물 섹션. 요구사항 원안에는 없던 추가 섹션이며, 데이터 배열(`projects`)이 이 파일 상단에 있습니다. 항목은 배열 끝에 추가합니다. 상단 네비에는 링크가 없습니다.
- **콘텐츠와 표현을 분리합니다.** 글·경력·프로필 내용을 고칠 때는 `src/data/`만 건드리고, HTML 구조는 `src/components/`(React)와 `src/sections/`(문자열 템플릿)에서만 바꿉니다.
  - `src/data/` — `profile.ts`(이름·소개·소셜·사이트 메타), `experience.ts`, `posts.ts`. 전부 플레이스홀더입니다.
  - `src/sections/` — 섹션별로 `RawHtml`을 반환하는 순수 함수. `header.ts`와 `about.ts`는 React 컴포넌트로 대체되어 더 이상 쓰이지 않습니다. `contact.ts`는 `footer()`만 씁니다.
  - `src/lib/` — `html.ts`(태그드 템플릿 + 이스케이프), `theme.ts`, `reveal.ts`(IntersectionObserver).
- `innerHTML`에 데이터를 넣으므로 문자열 조립은 `lib/html.ts`의 `` html`` `` 태그드 템플릿을 씁니다. 보간값은 자동 이스케이프되고, HTML을 그대로 넣어야 하면 `raw()`로 감쌉니다.
- `vite.config.ts`의 플러그인이 `src/data/profile.ts`를 읽어 `<title>`·description·OG·Twitter Card·JSON-LD와 `robots.txt`·`sitemap.xml`을 **빌드 시점에** 생성합니다. 메타를 `index.html`에 직접 적지 마세요.
- `public/`의 정적 에셋은 절대 경로로 참조합니다 (예: `/icons.svg#github` 스프라이트).
- 스타일은 `src/App.css` 한 파일이며, 색은 전부 CSS 커스텀 프로퍼티입니다. 다크 테마는 `:root[data-theme='dark']`에서 값만 바꿉니다. 하드코딩된 색을 새로 추가하지 마세요.

## TypeScript 설정 참고

`tsconfig.json`은 사용하지 않는 코드와 문법에 엄격하며, 위반 시 `npm run build`가 실패합니다.
- `noUnusedLocals` / `noUnusedParameters`가 켜져 있습니다.
- `erasableSyntaxOnly` — enum, namespace, 생성자 매개변수 프로퍼티를 사용할 수 없습니다.
- `verbatimModuleSyntax` — 타입 전용 import에는 `import type`을 사용합니다.
- `allowImportingTsExtensions` — 로컬 import는 확장자를 명시합니다 (예: `./theme.ts`, `./App.tsx`).
- `jsx: react-jsx` — `.tsx`에서 `import React`가 필요 없습니다.

## 진행 상태 (docs/요구사항.md v1.1 기준, 2026-09-20)

0~7단계 구현이 끝났습니다. 남은 단계는 다음 두 가지입니다.

- **8단계, 공개:** GitHub 원격(`kkd4755-maker/my-port-polio`)에는 푸시를 마쳤습니다. 남은 것은 GitHub Pages 배포입니다. 저장소 이름을 `kkd4755-maker.github.io`로 바꿔 루트 주소로 서비스하므로 `base` 설정은 필요 없습니다. 워크플로(`.github/workflows/deploy.yml`)와 `siteUrl`은 준비돼 있고, 저장소 이름 변경과 Pages Source 설정이 남았습니다.
- **9단계, 실물 콘텐츠 교체:** `src/data/`의 `profile.ts`, `experience.ts`, `posts.ts`를 실제 내용으로 바꿉니다.

배포 전에 반드시 바꿔야 할 값 (요구사항 §8.4):

- `src/data/profile.ts`의 `siteUrl` — 현재 `https://example.com`입니다.
- `public/avatar.svg` — 이니셜 아바타를 실물 사진으로 교체합니다.
- `docs/og-source.svg`의 이름·태그라인을 고친 뒤 `public/og.png`(1200×630)를 다시 만듭니다.
