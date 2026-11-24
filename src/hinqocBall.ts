// 힌콕 핀볼의 공 그림(시제품): 힌콕 구독 퍼스나콘 12개월(2026-11-24 사용자 "그냥 퍼스나콘으로 공 적용 시켜봐", 대장 전달).
// 퍼스나콘은 받아 둔 그림 파일(assets/personacons/NN-month.png)을 사이트에 함께 넣어 쓴다(2026-11-25 사용자 "이미지 받아서 암호화하는 방식으로 바꿔줘",
// 힌콕 쪽 허락은 사용자가 받음). 저장소에는 암호화된 .png.enc만 두고 원본 PNG는 .gitignore로 뺀다(빌드 전 scripts/decrypt-personacons.mjs가 푼다).
// 퍼스나콘은 MIT 대상이 아니다. 이 사이트 밖으로 재배포하지 않는다.
// 공마다 12개월 중 하나를 이름 해시로 고른다(같은 이름은 항상 같은 공, 릴파와 같은 방식).
// 그림은 칸 그대로 4배(144×144, 도트 흐림 없음)로 키워 두고, 경기 중에도 흐림 없이(image smoothing 끔) 공 크기에 맞춰 붙인다.
// 못 불러온 개월은 같은 개월의 11차 도트 코끼리(`src/hinqocElephant11.ts`, 시안 ball.js 그대로)로 대신 그린다.
// 6차 도트 코끼리 파일(`src/hinqocElephant.ts`)은 지우지 않고 남겨 둔다(지금은 쓰지 않음).
// 확인용 주소: ?spcon=0 이면 퍼스나콘을 불러오지 않고 대신 그리는 그림만 쓴다. 공 크기·물리는 그대로다.
import { MONTHS10, month11Canvas, N } from './hinqocElephant11';

/** 경기 중 공 그림을 실제 공 크기의 몇 배로 그릴지(2026-11-24 사용자 "공 크기를 살짝만 줄일 수 있을까?": 그림만 0.85배, 충돌 크기·물리는 그대로) */
export const BALL_ART_SCALE = 0.85;

/** 퍼스나콘 그림(1·3·6·9·12·15·18·21·24·27·30·33개월). 2026-11-25 SOOP 퍼스나콘 주소에서 받은 원본 그대로
 *  (id 순서는 시안 `시안\힌콕핀볼-공\index.html`의 SPCON, 원본 해시는 `_백업\힌콕-퍼스나콘-원본-2026-11-25\sha256.txt`) */
const SPCON = [
  new URL('../assets/personacons/01-month.png', import.meta.url),
  new URL('../assets/personacons/03-month.png', import.meta.url),
  new URL('../assets/personacons/06-month.png', import.meta.url),
  new URL('../assets/personacons/09-month.png', import.meta.url),
  new URL('../assets/personacons/12-month.png', import.meta.url),
  new URL('../assets/personacons/15-month.png', import.meta.url),
  new URL('../assets/personacons/18-month.png', import.meta.url),
  new URL('../assets/personacons/21-month.png', import.meta.url),
  new URL('../assets/personacons/24-month.png', import.meta.url),
  new URL('../assets/personacons/27-month.png', import.meta.url),
  new URL('../assets/personacons/30-month.png', import.meta.url),
  new URL('../assets/personacons/33-month.png', import.meta.url),
].map(String);
const LOAD_TIMEOUT_MS = 6000;
const SPCON_ON = new URLSearchParams(globalThis.location?.search ?? '').get('spcon') !== '0';

const SCALE = 4;

/** 도트 칸 그대로 144×144로 키운다(흐림 없음) */
function upscale(src: CanvasImageSource): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = N * SCALE;
  canvas.height = N * SCALE;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(src, 0, 0, N * SCALE, N * SCALE);
  return canvas;
}

/** 사이트에 함께 넣은 퍼스나콘 한 장을 불러온다. 실패·시간 초과면 null */
function loadSpcon(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    let done = false;
    const finish = (value: HTMLImageElement | null) => {
      if (done) return;
      done = true;
      resolve(value);
    };
    const timer = setTimeout(() => finish(null), LOAD_TIMEOUT_MS);
    img.onload = () => {
      clearTimeout(timer);
      finish(img.naturalWidth > 0 ? img : null);
    };
    img.onerror = () => {
      clearTimeout(timer);
      finish(null);
    };
    img.src = url;
  });
}

type Source = 'spcon' | 'dot';
let skins: HTMLCanvasElement[] = [];
let names: string[] = [];
let sources: Source[] = [];
let loading: Promise<HTMLCanvasElement[]> | null = null;

/** 12개월 그림을 한 번만 준비한다: 먼저 11차 도트로 채우고, 불러온 퍼스나콘으로 바꾼다 */
export function loadHinqocBalls(): Promise<HTMLCanvasElement[]> {
  if (typeof document === 'undefined') return Promise.resolve([]);
  if (!loading) {
    loading = (async () => {
      skins = SPCON.map((_, i) => upscale(month11Canvas(i)));
      names = (MONTHS10 as unknown as [number][]).map(([month]) => `${month}개월`);
      sources = SPCON.map(() => 'dot');
      if (SPCON_ON) {
        const images = await Promise.all(SPCON.map(loadSpcon));
        images.forEach((img, i) => {
          if (!img) return;
          skins[i] = upscale(img);
          sources[i] = 'spcon';
        });
      }
      return skins;
    })();
  }
  return loading;
}

export function getHinqocBalls(): HTMLCanvasElement[] {
  return skins;
}

/** 개월 이름 목록(확인용) */
export function getHinqocBallNames(): string[] {
  return names;
}

/** 개월마다 퍼스나콘('spcon')인지 대신 그린 도트('dot')인지(확인용) */
export function getHinqocBallSources(): Source[] {
  return sources;
}

function nameHash(name: string): number {
  let hash = 0;
  for (const character of name) hash = (Math.imul(hash, 31) + (character.codePointAt(0) ?? 0)) >>> 0;
  return hash;
}

/** 같은 이름은 항상 같은 공. 아직 안 그렸으면 undefined(도트 공으로 그린다) */
export function getHinqocBall(name: string): HTMLCanvasElement | undefined {
  if (skins.length === 0) return undefined;
  return skins[nameHash(name) % skins.length];
}

/** 힌콕 공 그림인지(그릴 때 흐림을 끄려고) */
export function isHinqocBall(image: unknown): boolean {
  return image instanceof HTMLCanvasElement && skins.includes(image);
}

/** 이름표용: 1개월 퍼스나콘을 불러온 <img>. 못 불러오면 null */
export function loadHinqocBrandImage(): Promise<HTMLImageElement | null> {
  if (typeof document === 'undefined' || !SPCON_ON) return Promise.resolve(null);
  return loadSpcon(SPCON[0]);
}

/** 이름표 대신 그림: 1개월 11차 도트 코끼리(이 그림은 같은 출처라 그림 주소로 바꿀 수 있다) */
export function hinqocBrandFallbackUrl(): string {
  if (typeof document === 'undefined') return '';
  return upscale(month11Canvas(0)).toDataURL('image/png');
}

// ── 경기장 위 공 둘레 연보라 빛(릴파 시제품 그대로: 2026-11-18 사용자 "C로 하고서", 기준 시안\릴파핀볼-공\테두리비교.html C 줄의 sized()) ──
// 공 테두리는 그대로 두고 공 그림 뒤에 흐린 연보라 빛을 깐다. 빛 퍼짐은 화면에 그려지는 공 지름의 25%(최소 3px),
// 빛을 켠 채 같은 그림을 두 번 겹쳐 그린다. 공이 많아도 가볍게, 그림 × 화면 지름(px)마다 빛까지 그린 그림을 한 번만 만들어 둔다.
// 퍼스나콘은 도트가 흐려지지 않게 줄일 때도 흐림을 끈다. 당첨 상자 안의 공은 이 빛을 쓰지 않는다(붉은 빛, src/rouletteRenderer.ts).
const GLOW_COLOR = 'rgba(170, 205, 255, 0.9)'; // 힌콕 판: 연하늘 빛(2026-11-24)
const glowCache = new Map<HTMLCanvasElement, Map<number, GlowSprite>>();

export type GlowSprite = { canvas: HTMLCanvasElement; ratio: number };

/** 힌콕 공 그림이면 화면 지름 px에 맞춰 빛을 입힌 그림(ratio = 그림 전체 폭 ÷ 공 지름)을 돌려준다. 아니면 undefined */
/** 비교용(시제품): 주소 뒤 ?glow=0 이면 빛 없이 그린다 */
const GLOW_ON = new URLSearchParams(globalThis.location?.search ?? '').get('glow') !== '0';

export function hinqocGlowSprite(skin: CanvasImageSource, diameterPx: number): GlowSprite | undefined {
  if (!GLOW_ON || !isHinqocBall(skin)) return undefined;
  const key = skin as HTMLCanvasElement;
  const px = Math.max(4, Math.min(256, Math.round(diameterPx)));
  let bySize = glowCache.get(key);
  if (!bySize) {
    bySize = new Map();
    glowCache.set(key, bySize);
  }
  const cached = bySize.get(px);
  if (cached) return cached;
  const pad = Math.ceil(px * 0.35);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = px + pad * 2;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.imageSmoothingEnabled = false; // 도트가 흐려지지 않게
  ctx.shadowColor = GLOW_COLOR;
  ctx.shadowBlur = Math.max(3, px * 0.25);
  ctx.drawImage(key, pad, pad, px, px);
  ctx.drawImage(key, pad, pad, px, px);
  const sprite = { canvas, ratio: canvas.width / px };
  bySize.set(px, sprite);
  return sprite;
}

// 시제품 확인용: 브라우저 콘솔에서 개월 목록·출처와 이름별 공을 볼 수 있게 열어 둔다
(globalThis as any).__hinqocBalls = {
  list: getHinqocBalls,
  names: getHinqocBallNames,
  sources: getHinqocBallSources,
  of: getHinqocBall,
  glow: hinqocGlowSprite,
};
