// @ts-nocheck
// 이 파일은 디자인 시안 `시안\힌콕핀볼-공\ball.js`(디자인 6차)를 그대로 옮긴 것이다(2026-11-23). 그림을 고치려면 시안을 고친 뒤 다시 옮긴다.
// 맨 아래 export 한 줄만 덧붙였다.

// 힌콕 핀볼 공: 콕이 팬 코끼리 (36×36 도트)
// 2026-11-22 대장 대화가 전달한 사용자 요청("힌콕이 버전도 만들려고 하는데 가능해?" → "릴파처럼 도트 공을 새로 그리기" → "릴파는 박쥐라면 힌콕이는 코끼리야").
// 5차(2026-11-23, 사용자 "놀리냐? 이건 힌콕이를 무시하는거랑 욕하는거야. 디자인 장난해? 모르겠으면 퍼스나콘 이미지를 보고서 만들던가")는
//   부위 자리만 재서 도형으로 그렸더니 여전히 물개·고래처럼 보였다(대장 판단).
// 6차(같은 날): 사용자 말대로 퍼스나콘 이미지를 보고 따라 그렸다. 힌콕 구독 퍼스나콘 1개월(36×36)을 SOOP 주소에서 화면에 불러와
//   칸마다 번호를 붙여 60배로 키워 보고, 테두리·귀·눈·볼·코·새싹의 칸을 한 칸씩 옮겨 적었다(원본 파일은 받지 않음).
//   색은 이 시안의 팔레트(몸 4단은 몸 색 후보로 바뀜)로 칠한다.
const N = 36;
const PX = {
  out: '#141c4a',                                                        // 테두리(짙은 남색)
  shade: '#2c3a78',                                                      // 테두리 옆 짙은 남청(퍼스나콘의 두 번째 테두리 색)
  k: '#b8d0f8', kHi: '#d6e4ff', kSh: '#8ca4d8', kSh2: '#5a6aa0',         // 몸(연한 하늘) 4단. 몸 색 후보로 바뀐다
  ear: '#ffffff', earSh: '#eef3ff', gray: '#d2d8e8',                     // 귀 안쪽(하양)
  eye: '#141c4b', eyeW: '#ffffff',                                       // 눈(테두리와 한 끗 다른 값: 까망에서 눈만 뒤집어 칠하려고)
  cheek: '#f08484', cheekHi: '#f6a4ac', cheekSh: '#b07888',
  leaf: '#7ddbbd', leafSh: '#5fb0a4', leafD: '#3a6080',                  // 새싹(민트). 몸 색과 상관없이 고정
};
// 칸 지도(퍼스나콘 1개월을 보고 옮겨 적음). O 테두리, S 짙은 남청, B 몸, l 밝은 몸, b 그늘, s 짙은 그늘, W 하양, w 거의 하양, g 연회색,
// M 새싹, T 새싹 그늘, D 새싹 짙은 색, P 볼, p 연한 볼, q 볼 그늘, E 눈, e 눈 반짝임
const MAP = [
  '....................................',
  '....................................',
  '....................................',
  '................w...................',
  '...............OTDO.................',
  '................SMMO................',
  '..............O.OMMO................',
  '.............OT..MMO................',
  '.....S.......OMw.MMOTO..............',
  '...OOsSOS....OMOOMOMMO.......SSg....',
  '..OBBBBBbO....OOOOMTO.....OOsbbbOS..',
  '.OBwWWBBBBOgOOsbBbsOOO..SOBBBBlBBOS.',
  '.OWWWWWwBBBBBBBBBBBBBBsOsBBWWWWWwBO.',
  '.SWWWWWWBBBBBBBBBBBBBBBBBBWWWWWWWBsg',
  'OwWWWWWgBBBBBBBBBBBBBBBBBlWWWWWWWWBO',
  'OwWWWWWOBBBBBBBBBBBBBBBBBWWWWWWWWWBO',
  'OwWWWWsBBBBBBBBBBBBBBBBBBWWWWWWWWWBO',
  'OBWWWWOBBBBBBBBBBBBBBBBBBWWWWWWWWWbS',
  'SBWWWWOBBbbBBBBBBBBBbbBBBwWWWWWWWwS.',
  '.swWWWSBBBBBBBBBBBBBBBBBBBSOOgWWWBO.',
  '.OBWWWbBEEBBBBBBBBBBEEBBBBBBBSWWWBO.',
  '.SbwWWbEeEbBBBBBBBBEEeEBBBBBBBOWBO..',
  '..OBWWsEEebBBBBBBBBbeEEBBBBBBBOWBO..',
  '..OWWOPPSbBBBBBBBBBBSSppBBBBBsgWBO..',
  '..OWWSPPPplBBBBBBBBBpPPPpBBBOSWWBO..',
  '..OWgqPPplOBBBBBBBBBpPPPpBBWWWWWBO..',
  '..OBWSpppBbBBBBBBBBBpPPPpBBWWWWWBO..',
  '..OBBOBBBOBBBBBBBBBBBpppBBbWWWWWsO..',
  '...OOOOBOlBBBBBBbBBBBBBBbbbBWWwBO...',
  '......gOlBBBBBBOlBBBBOOOOOOOOOOOO...',
  '......OWWBBBBBOOOOOOO...............',
  '......OWWWBBBO......................',
  '.......OOOOOO.......................',
  '....................................',
  '....................................',
  '....................................'
];
const CODE = { O: 'out', S: 'shade', B: 'k', l: 'kHi', b: 'kSh', s: 'kSh2', W: 'ear', w: 'earSh', g: 'gray', M: 'leaf', T: 'leafSh', D: 'leafD', P: 'cheek', p: 'cheekHi', q: 'cheekSh', E: 'eye', e: 'eyeW' };
// 새싹 칸(가로 13~21, 세로 3~10): 장식 뒤에 다시 찍어 어떤 장식에도 가려지지 않게 한다
const SPROUT = []; for (let y = 3; y <= 10; y++) for (let x = 13; x <= 21; x++) if (MAP[y][x] !== '.' && 'MTDw'.includes(MAP[y][x]) || (y <= 9 && MAP[y][x] !== '.' && x >= 13 && x <= 21)) SPROUT.push([x, y, PX[CODE[MAP[y][x]]]]);
function baseGrid() { return MAP.map((row) => [...row].map((c) => (c === '.' ? null : PX[CODE[c]]))); }
function drawSprout(g) { for (const [x, y, c] of SPROUT) g[y][x] = c; }
// 눈 칸(왼쪽 x 7~9, 오른쪽 x 19~22, y 20~22)
const EYE_CELLS = []; MAP.forEach((row, y) => [...row].forEach((c, x) => { if (c === 'E' || c === 'e') EYE_CELLS.push([x, y]); }));
const coverEyes = (g) => { for (const [x, y] of EYE_CELLS) g[y][x] = PX.k; };
function inPoly(P, x, y) {
  let c = false;
  for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
    const [xi, yi] = P[i], [xj, yj] = P[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}
function segD(px, py, [ax, ay], [bx, by]) {
  const dx = bx - ax, dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - ax - t * dx, py - ay - t * dy);
}
const lineD = (px, py, L) => { let m = Infinity; for (let i = 0; i < L.length - 1; i++) m = Math.min(m, segD(px, py, L[i], L[i + 1])); return m; };
const ell = (ex, ey, rx, ry) => (px, py) => ((px - ex) / rx) ** 2 + ((py - ey) / ry) ** 2 <= 1;
const at = (fn) => (x, y) => x >= 0 && y >= 0 && x < N && y < N && fn(x + 0.5, y + 0.5);
const edgeOf = (f, x, y) => !f(x - 1, y) || !f(x + 1, y) || !f(x, y - 1) || !f(x, y + 1);
function drawShape(g, inside, colorAt) {
  const ins = at(inside);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    if (!ins(x, y)) continue;
    g[y][x] = edgeOf(ins, x, y) ? PX.out : colorAt(x, y, (dx, dy) => !ins(x + dx, y + dy));
  }
}
function put(g, x0, y0, rows, pal) {
  rows.forEach((rw, dy) => [...rw].forEach((ch, dx) => {
    const x = x0 + dx, y = y0 + dy;
    if (ch === '.' || pal[ch] === undefined || x < 0 || y < 0 || x >= N || y >= N) return;
    g[y][x] = pal[ch];
  }));
}
const C = {
  gold: '#f0c040', goldHi: '#fff1a0', goldSh: '#c08a18', gem: '#e8384f', gemSh: '#a81e30',
  red: '#e33a4a', redHi: '#ff7a86', redSh: '#a81e30', white: '#ffffff', black: '#15131d',
  hair: '#3d3fa8', hairHi: '#5f63d0', hairSh: '#2c2d82', hairSh2: '#202062', teal: '#3fd2c4', tealSh: '#279f98',
};
const sparkle = (g, x, y, big, col = '#f0b020') => put(g, x, y, big ? ['..Y..', '..Y..', 'YYWYY', '..Y..', '..Y..'] : ['.Y.', 'YWY', '.Y.'], { Y: col, W: C.white });

// 장식: 퍼스나콘 개월별 모습에 있는 것만(선글라스 12, 빨간 리본 18, 금 왕관+반짝이 24, 반짝이 27, 힌콕 머리 33개월).
// 퍼스나콘에 없는 해적 모자·하트 말풍선·웃는 감은 눈·하트 눈은 기본에서 뺐다(남길지는 사용자에게 묻는다).
// 새싹은 장식 뒤에 맨 마지막으로 찍어 어떤 장식에도 가려지지 않는다.
const ITEMS = [
  ['기본', () => {}],
  ['선글라스', (g) => {
    coverEyes(g);
    put(g, 6, 19, ['EEEEEEEEEEEEEEEEEE', 'EWWEEE......EWWEEE', 'EEWWEE......EEWWEE', '.EEEE........EEEE.'], { E: C.black, W: '#e8e8f0' });
  }],
  // 큰 빨간 리본: 새싹을 가리지 않게 정수리 오른쪽(오른쪽 귀와 머리 사이)에
  ['빨간 리본', (g) => {
    const wingL = (px, py) => inPoly([[26.4, 9.6], [20.6, 4.2], [20, 14.4], [23, 13.8]], px, py);
    const wingR = (px, py) => inPoly([[27.6, 9.6], [33.4, 4.2], [34, 14.4], [31, 13.8]], px, py);
    const knot = (px, py) => px >= 24.8 && px <= 29.2 && py >= 7.4 && py <= 12;
    drawShape(g, (px, py) => wingL(px, py) || wingR(px, py) || knot(px, py), (x, y, out) => {
      if (knot(x + 0.5, y + 0.5)) return out(1, 1) || out(0, 1) ? C.redSh : (out(-1, -1) ? C.redHi : C.red);
      if (out(1, 1) || out(0, 1)) return C.redSh;
      return out(-1, -1) || out(0, -1) ? C.redHi : C.red;
    });
  }],
  // 금 왕관 + 반짝이: 새싹을 가리지 않게 정수리 왼쪽(왼쪽 귀와 머리 사이)에 작은 금 왕관
  ['금 왕관', (g) => {
    const pts = [[2.6, 5.4], [3.6, 1.8], [6.4, 5.6], [8.4, 0.8], [10.4, 5.6], [12.8, 1.8], [13.8, 5.4]];
    const topAt = (px) => { for (let k = 0; k < pts.length - 1; k++) { const [x0, y0] = pts[k], [x1, y1] = pts[k + 1]; if (px >= x0 && px <= x1) return y0 + ((y1 - y0) * (px - x0)) / (x1 - x0); } return 99; };
    drawShape(g, (px, py) => px >= 2.6 && px <= 13.8 && py <= 11.4 && py >= topAt(px), (x, y, out) => (out(1, 1) || out(0, 1) ? C.goldSh : (out(-1, -1) || out(-1, 0)) ? C.goldHi : C.gold));
    put(g, 7, 7, ['RR', 'Rr'], { R: C.gem, r: C.gemSh });
    sparkle(g, 29, 2, true); sparkle(g, 1, 31, false); sparkle(g, 31, 31, false);
  }],
  ['반짝이', (g) => {
    sparkle(g, 2, 2, true, '#ff9fd0'); sparkle(g, 28, 2, true, '#9fd8ff');
    sparkle(g, 23, 1, false, '#c8a8ff'); sparkle(g, 1, 31, false, '#9fd8ff'); sparkle(g, 31, 31, false, '#ff9fd0');
  }],
  // 힌콕 머리: 청록 줄이 있는 남색 앞머리 + 빨간 눈. 새싹은 머리카락 위로 솟는다
  ['힌콕 머리', (g) => {
    // 머리 위쪽(몸 칸)만 남색 머리로 덮고, 아래 끝은 뾰족한 앞머리. 눈은 빨갛게
    const BANG = [[6.5, 21], [8.5, 16.4], [10.6, 18], [13, 15.4], [15.4, 17.6], [17.8, 15.2], [20.2, 17.4], [22.6, 15.6], [25, 18.6]];
    const bangY = (px) => { for (let i = 0; i < BANG.length - 1; i++) { const [x0, y0] = BANG[i], [x1, y1] = BANG[i + 1]; if (px >= x0 && px <= x1) return y0 + ((y1 - y0) * (px - x0)) / (x1 - x0); } return -1; };
    const body = new Set([PX.k, PX.kHi, PX.kSh, PX.kSh2]);
    const inHair = (x, y) => y >= 11 && y + 0.5 <= bangY(x + 0.5) && body.has(baseGrid()[y][x]);
    for (let y = 11; y < 22; y++) for (let x = 6; x < 26; x++) {
      if (!inHair(x, y)) continue;
      const px = x + 0.5, py = y + 0.5;
      const teal = lineD(px, py, [[10.6, 12], [8.6, 15.4], [7.6, 19]]) <= 0.8 || lineD(px, py, [[22, 12.4], [24, 15.6]]) <= 0.7;
      g[y][x] = !inHair(x, y + 1) ? C.hairSh2 : teal ? C.teal : (!inHair(x - 1, y) || py < 13.5) ? C.hairHi : C.hair;
    }
    for (const [x, y] of EYE_CELLS) g[y][x] = MAP[y][x] === 'e' ? '#ffffff' : '#c8304a';
  }],
];

// 몸 색 후보: 퍼스나콘 개월별 몸 색(하늘 1·은 3·금 6·파랑 9·분홍 15·무지개 21·파스텔 수정 27·까망 30개월). 새싹은 바뀌지 않는다.
//   [이름, 몸, 밝은 몸, 그늘, 가장 짙은 그늘] 또는 [이름, 'grad', 채도, 밝기] (무지개처럼 칸마다 색이 비스듬히 바뀜)
const FURS = [
  ['하늘(기본)', PX.k, PX.kHi, PX.kSh, PX.kSh2],
  ['은', '#c9ccd6', '#eceef4', '#a3a7b5', '#7f8392'],
  ['금', '#f6c445', '#ffe68a', '#e09a22', '#b97412'],
  ['파랑', '#4f8fe8', '#86b6f7', '#3a6fcf', '#2b55ad'],
  ['분홍', '#ff7fb6', '#ffb6d6', '#e95596', '#c63c7a'],
  ['무지개', 'grad', 85, 58],
  ['파스텔 수정', 'grad', 70, 82],
  ['까망', '#34313f', '#55516a', '#26242f', '#1b1a22', { out: '#6b5bb0', eye: '#ffffff', eyeW: '#141c4a' }],   // 퍼스나콘 30개월처럼 보라 테두리 + 흰 눈
];
// 퍼스나콘 개월별 모습과 같은 짝(시안 맨 위 비교용): [개월, 몸 색 이름, 장식 이름]
const MONTHS = [[1, '하늘(기본)', '기본'], [3, '은', '기본'], [6, '금', '기본'], [9, '파랑', '기본'], [12, '파랑', '선글라스'], [15, '분홍', '기본'],
  [18, '분홍', '빨간 리본'], [21, '무지개', '기본'], [24, '무지개', '금 왕관'], [27, '파스텔 수정', '반짝이'], [30, '까망', '기본'], [33, '하늘(기본)', '힌콕 머리']];
// 바탕색 후보(사이트 바탕). 공이 묻히는지 보려고 밝은 것·어두운 것을 함께 둔다.
const BGS = [
  ['연보라 하늘', '#d4cdf3', '배너 하늘색. 진한 테두리가 또렷하게 보인다'],
  ['밤 보라', '#221d3a', '어두운 보라. 테두리는 묻히고 몸 색이 바탕과 구분돼야 한다'],
  ['먹색', '#16151c', '타요·릴파 계열의 거의 검정'],
  ['크림', '#fff4ea', '밝은 크림'],
];
const hsl2hex = (h, s, l) => {
  s /= 100; l /= 100; const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  const f = (n) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1)))).toString(16).padStart(2, '0');
  return '#' + f(0) + f(8) + f(4);
};
const furRep = (fur, bg) => {
  if (fur[1] !== 'grad') return fur[1];
  const cands = [0, 60, 120, 180, 240, 300].map((h) => hsl2hex(h, fur[2], fur[3]));
  return cands.reduce((a, b) => (contrast(b, bg) < contrast(a, bg) ? b : a));
};
function gridToCanvas(g, fur = FURS[0]) {
  const lv = { [PX.k]: 1, [PX.kHi]: 2, [PX.kSh]: 3, [PX.kSh2]: 4 };   // FURS 칸 순서(몸, 밝은 몸, 그늘, 가장 짙은 그늘)와 맞춘다
  const cv = document.createElement('canvas'); cv.width = cv.height = N;
  const ctx = cv.getContext('2d');
  g.forEach((r, y) => r.forEach((c, x) => {
    if (!c) return;
    let col = c;
    const ex = typeof fur[5] === 'object' ? fur[5] : null;
    if (ex && c === PX.out) col = ex.out; else if (ex && c === PX.eye) col = ex.eye; else if (ex && c === PX.eyeW) col = ex.eyeW;
    else if (lv[c]) col = fur[1] === 'grad' ? hsl2hex(((x * 9 + y * 6) % 360 + 360) % 360, fur[2], fur[3] + [0, 0, 14, -10, -20][lv[c]]) : fur[lv[c]];
    ctx.fillStyle = col; ctx.fillRect(x, y, 1, 1);
  }));
  return cv;
}
// 기본 그림 → 장식 → 새싹(맨 마지막이라 어떤 장식에도 가려지지 않는다)
const itemGrid = (fn) => { const g = baseGrid(); fn(g); drawSprout(g); return g; };
const findFur = (n) => FURS.find((f) => f[0] === n), findItem = (n) => ITEMS.find((i) => i[0] === n);
function contrast(a, b) {
  const L = (h) => { const v = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
  const [x, y] = [L(a), L(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

export { N, PX, ITEMS, FURS, baseGrid, itemGrid, gridToCanvas };
