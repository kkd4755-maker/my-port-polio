"""제목용 세리프 서체 서브셋 생성.

src/ 에서 제목에 쓰이는 문자열을 모아, 그 글자만 남긴 woff2를 public/fonts/ 에 만든다.
콘텐츠(src/data/, Projects.tsx, 섹션 제목)를 바꾼 뒤 직접 실행한다. 빌드에는 포함되지 않는다.

사용법:
  pip install fonttools brotli
  python scripts/subset-serif.py <NotoSerifKR[wght].ttf 경로> [굵기=600]
"""
import re
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'fonts' / 'noto-serif-kr-heading.woff2'

# 제목이 아닌 곳(본문·UI)에는 세리프를 쓰지 않으므로 아래 키의 값만 모은다.
DATA_KEYS = r'(?:title|nameKo|nameEn|tagline|label)'
SOURCES = ['src/data/profile.ts', 'src/data/experience.ts', 'src/data/posts.ts', 'src/components/Projects.tsx']
# 코드 안에 직접 적힌 섹션 제목·라벨. 제목을 바꾸면 여기도 고친다.
EXTRA = '소개경력작업물글연락 0123456789—–-·'
# 라틴 기본 + 자주 쓰는 문장부호는 항상 포함한다 (영문 이름, 숫자, 인용부호 등).
BASE = ''.join(chr(c) for c in range(0x20, 0x7F)) + '「」『』“”‘’…·—–~'


def collect() -> str:
    chars = set(BASE + EXTRA)
    for rel in SOURCES:
        text = (ROOT / rel).read_text(encoding='utf-8')
        for m in re.finditer(DATA_KEYS + r"\s*:\s*(['\"`])(.*?)\1", text):
            chars.update(m.group(2))
    return ''.join(sorted(chars))


def main() -> None:
    src = Path(sys.argv[1])
    weight = int(sys.argv[2]) if len(sys.argv) > 2 else 600

    text = collect()
    print(f'글자 수: {len(text)} (한글 {sum(1 for c in text if "가" <= c <= "힣")})')

    font = TTFont(src)
    font = instancer.instantiateVariableFont(font, {'wght': weight})

    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['kern', 'liga', 'locl']
    opts.name_IDs = [0, 1, 2, 3, 4, 6, 13, 14]  # 저작권·라이선스 이름은 남긴다
    opts.notdef_outline = True
    opts.hinting = False

    sub = subset.Subsetter(opts)
    sub.populate(text=text)
    sub.subset(font)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    font.flavor = 'woff2'
    font.save(OUT)
    print(f'{OUT.relative_to(ROOT)}: {OUT.stat().st_size / 1024:.1f} KB')


if __name__ == '__main__':
    main()
