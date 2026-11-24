// 힌콕 핀볼 이름표(왼쪽 위, 미니맵 위): 릴파 시제품(시안\릴파핀볼)의 이름표를 그대로 옮겼다(2026-11-23).
// 글자는 '힌콕 핀볼'로 고정(주소 ?title= 바꾸기 없음). 그림은 1개월 퍼스나콘(2026-11-24, 2026-11-25부터 사이트에 함께 넣은 파일).
// 퍼스나콘은 <img>를 그대로 넣는다. 못 불러오면 1개월 11차 도트 코끼리를 쓴다.
import { hinqocBrandFallbackUrl, loadHinqocBrandImage } from './hinqocBall';

/** 미니맵은 화면 폭 1280px보다 좁으면 비례해 줄어든다. 이름표도 같은 비율로 줄인다 */
function syncMinimapScale() {
  const scale = Math.min(1, window.innerWidth / 1280);
  document.documentElement.style.setProperty('--mm-scale', String(scale));
}

export function setupHinqocBrand() {
  if (typeof document === 'undefined') return;
  syncMinimapScale();
  window.addEventListener('resize', syncMinimapScale);
  const holder = document.querySelector<HTMLElement>('#brandMark .brand-ball');
  loadHinqocBrandImage().then((img) => {
    if (img && holder) {
      // 기존 ::after(그림 + 연하늘 빛)와 같은 자리·크기·빛으로 퍼스나콘을 얹는다(도트 흐림 없음)
      img.alt = '';
      img.style.cssText =
        'position:absolute;inset:4%;width:92%;height:92%;image-rendering:pixelated;' +
        'filter:drop-shadow(0 0 2px rgba(170, 205, 255, 0.9)) drop-shadow(0 0 2px rgba(170, 205, 255, 0.9))';
      holder.append(img);
      holder.dataset.source = 'spcon';
    } else {
      document.documentElement.style.setProperty('--brand-ball', `url("${hinqocBrandFallbackUrl()}")`);
      if (holder) holder.dataset.source = 'dot';
    }
  });
}
