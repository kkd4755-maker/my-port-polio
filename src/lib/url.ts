/**
 * `public/`의 정적 에셋 경로에 배포 경로(`base`)를 붙인다.
 * GitHub Pages 하위 경로(`/my-port-polio/`)에 올리면 `/icons.svg` 같은 루트 절대 경로는 깨진다.
 * index.html과 CSS의 경로는 Vite가 base를 알아서 붙이지만, 코드 안의 문자열 경로는 이 함수를 거쳐야 한다.
 */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '')
}
