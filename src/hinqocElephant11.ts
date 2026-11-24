// @ts-nocheck
// 이 파일은 디자인 시안 `시안\힌콕핀볼-공\ball.js`(11차까지 들어 있는 2026-11-24 판)를 그대로 옮긴 것이다. 그림을 고치려면 시안을 고친 뒤 다시 옮긴다.
// 맨 아래 export 한 줄만 덧붙였다. 시제품에서는 퍼스나콘을 못 불러올 때 대신 그리는 11차 개월별 도트 코끼리(month11Canvas)로만 쓴다.

// 힌콕 핀볼 공: 콕이 팬 코끼리 (36×36 도트)
// 2026-11-22 대장 대화가 전달한 사용자 요청("힌콕이 버전도 만들려고 하는데 가능해?" → "릴파처럼 도트 공을 새로 그리기" → "릴파는 박쥐라면 힌콕이는 코끼리야").
// 5차(2026-11-23, 사용자 "놀리냐? 이건 힌콕이를 무시하는거랑 욕하는거야. 디자인 장난해? 모르겠으면 퍼스나콘 이미지를 보고서 만들던가")는
//   부위 자리만 재서 도형으로 그렸더니 여전히 물개·고래처럼 보였다(대장 판단).
// 6차(같은 날): 사용자 말대로 퍼스나콘 이미지를 보고 따라 그렸다. 힌콕 구독 퍼스나콘 1개월(36×36)을 SOOP 주소에서 화면에 불러와
//   칸마다 번호를 붙여 60배로 키워 보고, 테두리·귀·눈·볼·코·새싹의 칸을 한 칸씩 옮겨 적었다(원본 파일은 받지 않음).
//   색은 이 시안의 팔레트(몸 4단은 몸 색 후보로 바뀜)로 칠한다. 이 6차 칸 지도(MAP, baseGrid6)는 지우지 않고 남겨 둔다.
// 7차(같은 날): 사용자가 6차 '힌콕 머리' 공 그림(누운 코끼리)과 힌콕 머리 그림을 주며 "이 머리 디자인을 넣은채로 내가 다시 그리라는거 넣어봐".
//   몸은 그대로 두고 머리를 다시 그렸다(아래 drawHinqocHair). 7차 2판: 대장이 '누운 코끼리'는 6차 힌콕 머리 장식을 잘라 낸 것이라 하여
//   기본 공은 6차 그대로(머리 없음), 새 머리는 '힌콕 머리' 장식으로 되돌렸다. ?hairbase 판에서는 새 머리가 기본. 새싹 있음/없음은 맨 위에서 비교.
const N = 36;
const PX = {
  out: '#141c4a',                                                        // 테두리(짙은 남색)
  shade: '#2c3a78',                                                      // 테두리 옆 짙은 남청(퍼스나콘의 두 번째 테두리 색)
  k: '#b8d0f8', kHi: '#d6e4ff', kSh: '#8ca4d8', kSh2: '#5a6aa0',         // 몸(연한 하늘) 4단. 몸 색 후보로 바뀐다
  ear: '#ffffff', earSh: '#eef3ff', gray: '#d2d8e8',                     // 귀 안쪽(하양)
  eye: '#141c4b', eyeW: '#ffffff',                                       // 눈(테두리와 한 끗 다른 값: 까망에서 눈만 뒤집어 칠하려고)
  cheek: '#f08484', cheekHi: '#f6a4ac', cheekSh: '#b07888',
  leaf: '#4fd65c', leafSh: '#2a9e48', leafD: '#1c6a3c',                  // 새싹(선명한 초록, 7차 2판에서 민트→초록). 몸 색과 상관없이 고정
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
function baseGrid6() { return MAP.map((row) => [...row].map((c) => (c === '.' ? null : PX[CODE[c]]))); }
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
  // 힌콕 머리(퍼스나콘 33개월): 8차에서 명암을 살려 새로 찍음(아래 drawHinqocHair8). 7차 2판은 예시로 남김(drawHinqocHair)
  ['힌콕 머리', (g) => drawHinqocHair8(g)],
  ['힌콕 머리(7차 예시)', (g) => drawHinqocHair(g)],
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
  // 힌콕 머리: 청록 줄이 있는 남색 앞머리 + 빨간 눈. 새싹은 머리카락 위로 솟는다
const OLD_HAIR6 = (g) => {   // 6차 '힌콕 머리' 장식(사용자가 '누운 코끼리'로 다시 준 그림의 머리). 기록용으로만 남김
    // 머리 위쪽(몸 칸)만 남색 머리로 덮고, 아래 끝은 뾰족한 앞머리. 눈은 빨갛게
    const BANG = [[6.5, 21], [8.5, 16.4], [10.6, 18], [13, 15.4], [15.4, 17.6], [17.8, 15.2], [20.2, 17.4], [22.6, 15.6], [25, 18.6]];
    const bangY = (px) => { for (let i = 0; i < BANG.length - 1; i++) { const [x0, y0] = BANG[i], [x1, y1] = BANG[i + 1]; if (px >= x0 && px <= x1) return y0 + ((y1 - y0) * (px - x0)) / (x1 - x0); } return -1; };
    const body = new Set([PX.k, PX.kHi, PX.kSh, PX.kSh2]);
    const inHair = (x, y) => y >= 11 && y + 0.5 <= bangY(x + 0.5) && body.has(baseGrid6()[y][x]);
    for (let y = 11; y < 22; y++) for (let x = 6; x < 26; x++) {
      if (!inHair(x, y)) continue;
      const px = x + 0.5, py = y + 0.5;
      const teal = lineD(px, py, [[10.6, 12], [8.6, 15.4], [7.6, 19]]) <= 0.8 || lineD(px, py, [[22, 12.4], [24, 15.6]]) <= 0.7;
      g[y][x] = !inHair(x, y + 1) ? C.hairSh2 : teal ? C.teal : (!inHair(x - 1, y) || py < 13.5) ? C.hairHi : C.hair;
    }
    for (const [x, y] of EYE_CELLS) g[y][x] = MAP[y][x] === 'e' ? '#ffffff' : '#c8304a';
  };

// 7차(2026-11-23): 사용자가 준 '누운 코끼리'(6차 공 + 힌콕 머리) 그림을 바탕으로, 머리를 힌콕 머리 참고 그림대로 다시 그렸다.
//   페리윙클(보랏빛 파랑) 앞머리 + 형광 초록 브릿지 몇 가닥 + 얼굴 양옆으로 내려오는 옆머리(끝이 초록). 눈은 빨강.
const HAIR = { base: '#7b84e0', hi: '#a6aef6', sh: '#555dc2', edge: '#2e3184', grn: '#45ee78', grnSh: '#1fae5a' };
// 7차 2판(대장 피드백: 납작한 직사각형 → 머리 윗곡선을 따라 둥글게, 귀 하양은 덮지 않음, 초록은 1~2가닥만 휘게, 끝은 들쭉날쭉 뾰족하게 눈썹 위에서 끝).
// 칸을 직접 정한다(x 가로, y 세로). HAIR_COL[x] = [시작 y, 끝 y]. 위는 머리 테두리 바로 안, 양끝은 한 칸씩 낮게 시작해 둥근 모서리.
//   끝 y는 눈썹(y 18)보다 위: 양옆 14, 뾰족한 끝 x 10(16)·14(17)·19(17)·22(16), 가르마 x 16은 14
const HAIR_COL = { 8: [13, 14], 9: [12, 15], 10: [12, 16], 11: [12, 15], 12: [11, 14], 13: [11, 16], 14: [11, 17], 15: [11, 16], 16: [11, 14], 17: [11, 15], 18: [11, 16],
  19: [11, 17], 20: [11, 15], 21: [12, 14], 22: [12, 16], 23: [13, 15] };
const HAIR_HI = [[10, 13], [11, 12], [12, 12], [14, 12], [15, 12], [17, 12], [18, 12], [20, 12], [21, 13], [22, 13]];   // 머리 윗곡선을 따라 휘는 반짝임
const HAIR_SH = [[16, 11], [16, 12], [16, 13], [13, 14], [13, 15], [18, 14], [19, 15], [19, 16]];   // 가르마와 가닥 사이 그늘(조금만)
const HAIR_GRN = [[13, 11], [12, 12], [11, 13], [10, 14], [10, 15], [10, 16], [19, 11], [20, 12], [21, 13], [21, 14]];   // 초록 브릿지: 왼쪽 한 가닥은 앞머리 따라 휘어 끝까지, 오른쪽은 짧게
// 옆머리: 얼굴 가장자리(귀 하양 안쪽)로 짧게 내려와 끝이 초록. 눈에서 떨어뜨림
const LOCKS = [[7, 15, 'xH'], [7, 16, 'xH'], [7, 17, 'Gg'], [7, 18, 'g'], [23, 16, 'Hx'], [23, 17, 'Hx'], [24, 18, 'G'], [24, 19, 'g']];
// 정수리를 한 칸 둥글게 부풀린다: 원래 머리 윗선(y 11)을 머리카락으로 덮고 그 위 y 10에 테두리를 새로 긋는다
const HAIR_TOP_OUT = [[12, 10], [13, 10], [14, 10], [15, 10], [16, 10], [17, 10], [18, 10], [19, 10], [20, 10], [11, 11], [21, 11]];
function drawHinqocHair(g) {
  for (const [x, y] of HAIR_TOP_OUT) g[y][x] = PX.out;
  const key = (x, y) => x + ',' + y;
  const sh = new Set(HAIR_SH.map(([x, y]) => key(x, y))), hi = new Set(HAIR_HI.map(([x, y]) => key(x, y))), grn = new Set(HAIR_GRN.map(([x, y]) => key(x, y)));
  for (const [xs, [y0, y1]] of Object.entries(HAIR_COL)) {
    const x = +xs;
    for (let y = y0; y <= y1; y++) {
      const k = key(x, y), last = y === y1;
      g[y][x] = grn.has(k) ? (last ? HAIR.grnSh : HAIR.grn) : last ? HAIR.edge : sh.has(k) ? HAIR.sh : hi.has(k) ? HAIR.hi : HAIR.base;
    }
  }
  const L = { H: HAIR.base, d: HAIR.sh, x: HAIR.edge, G: HAIR.grn, g: HAIR.grnSh };
  for (const [x0, y, row] of LOCKS) [...row].forEach((c, i) => { g[y][x0 + i] = L[c]; });
  for (const [x, y] of EYE_CELLS) g[y][x] = MAP[y][x] === 'e' ? '#ffffff' : '#c8304a';
}
// 8차(2026-11-24, 사용자 "지금 살짝 흐리잖아. 명암 살려서 제대로 찍어봐 지금 건 일단 예시로 남기고"):
//   7차 2판(위 drawHinqocHair)은 '힌콕 머리(7차 예시)'로 남기고, 명암을 5단(밝은 면·기본·그늘·진한 그늘·테두리)으로 또렷하게 나눠 새로 찍었다.
//   바깥 테두리는 몸 테두리와 같은 진한 남색(PX.out), 가르마와 가닥 사이 홈은 진한 그늘, 가닥 위쪽은 하이라이트.
//   초록 브릿지는 밝은·기본·진한 초록 3단이고, 머리 테두리를 따라 돌지 않고 앞머리 안쪽 가닥으로만 넣었다(머리띠처럼 보이던 문제).
const HAIR8 = { 1: '#bcc4ff', 2: '#7f89ea', 3: '#5560c8', 4: '#2a2f86', O: PX.out, a: '#a6ffb4', g: '#3fe06c', n: '#12894a' };
// 칸 지도: 가로 x 7~25, 세로 y 10~18. '.'은 그대로 둠. 1 밝은 면, 2 기본, 3 그늘, 4 진한 그늘(가르마·홈), O 테두리, a/g/n 초록 3단
const HAIR8_MAP = [
  '.....OOOOOOOOO.....',   // y10 정수리를 한 칸 둥글게 올린 테두리
  '....O211241123O....',   // y11 가르마(x16) 진한 그늘, 양쪽 가닥 위쪽 하이라이트
  '.OO11241a4212412.O.',   // y12 왼쪽 홈(x13) 시작, 초록 가닥 시작(x15), 오른쪽 홈(x20)
  '.O12224g242a242232O',   // y13
  '.O22241g2422g24223O',   // y14 가르마 끝 뾰족(x16)
  '.22224n24.42g24232O',   // y15 옆머리(x8, x24) 시작
  'Og443.434..4n4.44gO',   // y16 앞머리 끝: 들쭉날쭉 뾰족(x11, x14, x19)
  'On4.4..4....4...4nO',   // y17 눈썹(y18) 위에서 끝. 옆머리 끝은 진한 초록
  '.4..............4..',   // y18 옆머리 아래 끝(진한 그늘)
];
function drawHinqocHair8(g) {
  HAIR8_MAP.forEach((row, dy) => [...row].forEach((c, dx) => { if (c !== '.') g[10 + dy][7 + dx] = HAIR8[c]; }));
  for (const [x, y] of EYE_CELLS) g[y][x] = MAP[y][x] === 'e' ? '#ffffff' : '#c8304a';
}
// 기본 그림 = 6차 칸 지도(머리 없음). 주소 끝에 ?hairbase 를 붙이면 새 힌콕 머리(8차)를 기본으로 한 판을 본다(사용자가 둘 중 고르도록)
const HAIR_BASE = typeof location !== 'undefined' && new URLSearchParams(location.search).has('hairbase');
function baseGrid() { const g = baseGrid6(); if (HAIR_BASE) drawHinqocHair8(g); return g; }
// 새싹 없이: 새싹 칸을 지우고 정수리 테두리를 닫는다
function removeSprout(g) { for (let y = 3; y <= 9; y++) for (let x = 13; x <= 21; x++) g[y][x] = null; for (let x = 13; x <= 21; x++) if (g[10][x]) g[10][x] = PX.out; }
let LEAF = true;   // 맨 위 비교에서 '새싹 있음 / 없음'을 나란히 보여 준다. 기본은 새싹 있음
// 기본 그림 → 장식 → 새싹(맨 마지막이라 어떤 장식에도 가려지지 않는다)
const itemGrid = (fn, leaf = LEAF) => { const g = baseGrid(); fn(g); if (leaf) drawSprout(g); else removeSprout(g); return g; };
const findFur = (n) => FURS.find((f) => f[0] === n), findItem = (n) => ITEMS.find((i) => i[0] === n);
function contrast(a, b) {
  const L = (h) => { const v = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)); return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]; };
  const [x, y] = [L(a), L(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

// ───────────────────────── 9차(2026-11-24) ─────────────────────────
// 사용자 "전체 공을 퍼스나콘 처럼 맞춰주는데, 비슷한 디자인으로 하고 싶거든? 한번 해볼래?"
// 퍼스나콘 개월별 모습을 화면에서 크게 보며 눈으로 따라 그렸다(원본 파일·픽셀 값은 받지 않음, SOOP 그림은 읽을 수도 없음).
// 8차 그림(gridToCanvas + FURS)은 그대로 두고, 9차는 '재질'(광택 명암)로 몸을 다시 칠한다.
//   몸·귀 칸마다 빛(왼쪽 위) 기준 밝기를 계산해 재질의 6단 색(진한 그늘 → 반사 하양)으로 칠하고, 반사 하이라이트는 칸을 직접 찍는다.
//   새싹은 재질 색을 따른다(하늘·33개월은 초록). 볼은 퍼스나콘처럼 하늘·33개월에만 둔다.
const FILL9 = 'BlbsWwgPpqEe';
let LV9_OFF = -0.38, EAR9 = 0.4;   // 전체 밝기 조절(재질마다 m.off 로 더 조절)
const LV9 = (() => {   // 칸마다 밝기 값(클수록 밝음): 둥근 덩어리처럼 안쪽이 밝고 가장자리가 어둡게(테두리까지 거리) + 왼쪽 위가 밝게(전체 기울기)
  const fill = (x, y) => x >= 0 && y >= 0 && x < N && y < N && FILL9.includes(MAP[y][x]);
  const D = MAP.map((row, y) => [...row].map((c, x) => (fill(x, y) ? 99 : 0)));
  for (let pass = 0; pass < 6; pass++) for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    if (!D[y][x]) continue;
    const nb = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => (fill(x + dx, y + dy) ? D[y + dy][x + dx] : 0));
    D[y][x] = Math.min(D[y][x], Math.min(...nb) + 1);
  }
  return MAP.map((row, y) => [...row].map((c, x) => {
    if (!fill(x, y)) return null;
    const bevel = Math.min(D[y][x], 4) / 4;
    let v = 0.45 * bevel + 0.75 - 0.5 * (y - 11) / 21 - 0.2 * (x - 1) / 34;
    if (!fill(x + 1, y) || !fill(x, y + 1)) v -= 0.12;
    if (!fill(x - 1, y) || !fill(x, y - 1)) v += 0.15;
    return v;
  }));
})();
const EDGE9 = (x, y) => [[1, 0], [0, 1], [1, 1]].some(([dx, dy]) => !FILL9.includes((MAP[y + dy] || '')[x + dx] || '.'));   // 오른쪽·아래가 테두리인 칸(반사광)
const hex9 = (h, s, l) => hsl2hex(((h % 360) + 360) % 360, s, Math.max(0, Math.min(100, l)));
// 재질: ramp 6단(0 진한 그늘, 1 그늘, 2 중간, 3 밝음, 4 아주 밝음, 5 반사 하양), out 테두리, shade 두 번째 테두리, eye/eyeW 눈
// spec: 반사 하이라이트 칸(5단), hi: 밝음(4단) 칸. 퍼스나콘을 보고 자리를 찍음
const SPEC9 = [[11, 13], [12, 13], [10, 14], [11, 14], [12, 14], [11, 15], [2, 13], [2, 14], [3, 12], [29, 12], [30, 12], [9, 27], [8, 29], [7, 30], [7, 31], [24, 23]];
const HI9 = [[10, 13], [13, 13], [11, 12], [12, 12], [9, 14], [13, 14], [10, 15], [12, 15], [11, 16], [4, 12], [3, 13], [2, 15], [2, 16], [28, 12], [31, 12], [29, 13], [30, 13], [9, 26], [9, 28], [8, 30], [8, 31], [9, 29], [23, 23], [14, 26], [15, 26]];
// 무지개: 왼쪽 위 빨강 → 가운데 노랑·초록 → 왼쪽 아래 청록 → 오른쪽 아래 보라·자홍(퍼스나콘 21개월을 보고 맞춤)
const RB9 = (x, y) => 2.5 * x + 7.6 * (y - 12) - 12 + 0.22 * x * (y - 12);
const MATS9 = {
  '하늘': null,   // 1개월: 퍼스나콘도 평평한 파스텔이라 6차 그림 그대로
  '은': { off: 0.14, ramp: ['#6c6e78', '#9597a2', '#bfc1ca', '#dcdde3', '#e6e7ec', '#ffffff'], out: '#26262e', shade: '#4d4e58' },
  '금': { off: 0.16, ramp: ['#b86a0c', '#e09a18', '#f6c030', '#ffdc5a', '#fff2a0', '#fffbe6'], out: '#5e3206', shade: '#8f520c' },
  '파랑': { off: 0.08, ramp: ['#2a62cc', '#468cea', '#6fb4f7', '#a2d6fc', '#d2efff', '#ffffff'], out: '#111d86', shade: '#2440b8' },
  '분홍': { off: 0.12, ramp: ['#c22074', '#e0449a', '#f466b4', '#ff96cc', '#ffcce6', '#ffffff'], out: '#6e0c37', shade: '#a3195a' },
  '무지개': { off: 0.06, hue: RB9, s: 92, l: [40, 50, 58, 67, 80, 97], out: (x, y) => hex9(RB9(x, y), 80, 22), shade: (x, y) => hex9(RB9(x, y), 85, 32) },
  '파스텔 수정': { off: 0.26, hue: (x, y) => (x > 24 ? 50 + 3 * (y - 12) : 335 - 4.5 * (x - 4) - 2.5 * Math.max(0, y - 20)), s: 48, l: [72, 79, 85, 90, 95, 100], out: '#4b2bb6', shade: '#7a5bd8', eye: '#5a3ad0' },
  '까망': { ramp: ['#0a090d', '#0e0d12', '#121118', '#16151c', '#1a1922', '#24232d'], out: '#6b5bb0', shade: '#4a3f86', eye: '#ffffff', eyeW: '#15141b' },
};
function matColor(m, lv, x, y) {
  lv = Math.max(0, Math.min(5, lv));
  if (m.hue) return hex9(m.hue(x, y), m.sAt ? m.sAt(x, y) : m.s, m.l[lv]);
  return m.ramp[lv];
}
const pick9 = (v, x, y) => (typeof v === 'function' ? v(x, y) : v);
const SPEC9S = new Set(SPEC9.map(([x, y]) => x + ',' + y)), HI9S = new Set(HI9.map(([x, y]) => x + ',' + y));
// 몸·귀 칸을 재질로 다시 칠한다. 장식·머리 등 다른 색은 그대로 둔다(MAP 원래 색과 같은 칸만 바꿈)
function gridToCanvas9(g, mname, opt = {}) {
  const m = MATS9[mname];
  const cv = document.createElement('canvas'); cv.width = cv.height = N;
  const ctx = cv.getContext('2d');
  const orig = baseGrid6();
  g.forEach((r, y) => r.forEach((c, x) => {
    if (!c) return;
    let col = c;
    const mc = MAP[y][x], same = orig[y][x] === c;
    if (m) {
      if (c === PX.out) col = pick9(m.out, x, y);
      else if (c === PX.shade) col = pick9(m.shade, x, y);
      else if (mc === 'E' && same) col = m.eye || pick9(m.out, x, y);
      else if (mc === 'e' && same) col = m.eyeW || matColor(m, 3, x, y);   // 퍼스나콘처럼 눈 안쪽이 밝은 고리
      else if ([PX.leaf, PX.leafSh, PX.leafD].includes(c) && !opt.greenLeaf) col = matColor(m, c === PX.leaf ? 3 : c === PX.leafSh ? 1 : 0, x, y);
      else if (same && LV9[y][x] !== null && FILL9.includes(mc) && mc !== 'E' && mc !== 'e') {
        const k = x + ',' + y;
        const ear = 'Wwg'.includes(mc) ? 1 : 0;
        const tone = { b: -1, s: -1 }[mc] || 0;
        const v = LV9[y][x] + ear * EAR9 + (m.off || 0) + LV9_OFF;
        let lv = v < 0.3 ? 0 : v < 0.48 ? 1 : v < 0.68 ? 2 : v < 0.95 ? 3 : 4;
        lv += tone;
        if (HI9S.has(k)) lv = Math.max(lv, 4);
        if (SPEC9S.has(k)) lv = 5;
        col = matColor(m, Math.min(lv, 5), x, y);
      }
    }
    ctx.fillStyle = col; ctx.fillRect(x, y, 1, 1);
  }));
  if (opt.thick && m) {   // 테두리를 바깥으로 한 칸 더(까망처럼 두꺼운 테두리)
    for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
      if (g[y][x] || y < 10) continue;   // 털 갈래는 얇게 두고 몸만 두껍게
      if ([[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => g[y + dy] && g[y + dy][x + dx])) { ctx.fillStyle = pick9(m.out, x, y); ctx.fillRect(x, y, 1, 1); }
    }
  }
  return cv;
}

// 30개월 까망: 퍼스나콘처럼 삐죽한 검은 털(새싹 자리), 커다란 흰 눈(검은 눈동자), 아래 가운데 하얀 입 부분, 두꺼운 보라 테두리
const KK = { K: '#0c0b10', k: '#1d1b26', P: '#7a62b8', W: '#ffffff', G: '#c4c3cc', g: '#7d7c88' };
const KK_PUT = [
  // 새싹 자리의 삐죽한 털(큰 갈래 + 오른쪽 작은 갈래, 가운데 하얀 결)
  [16, 3, 'P'], [15, 4, 'PKP'], [15, 5, 'PWKP'], [14, 6, 'PKWKPP'], [14, 7, 'PKWKKKP'], [13, 8, 'PKKWKKKKP'], [13, 9, 'PKKKKKKKP'],
  // 정수리 털 끝
  [11, 10, 'P'], [10, 11, 'PK'], [22, 10, 'P'], [22, 11, 'KP'],
  // 왼쪽 눈(x 7~11, y 19~23), 오른쪽 눈(x 19~24, y 20~24)
  [8, 19, 'WWG'], [7, 20, 'WWWWG'], [7, 21, 'WWKWW'], [7, 22, 'WWGWW'], [8, 23, 'WWW'],
  [22, 20, 'WWW'], [19, 21, 'GWWWWW'], [19, 22, 'WKWWWW'], [19, 23, 'WWWWWG'], [20, 24, 'gWWg'],
  // 눈 둘레 보라
  [12, 23, 'PP'], [11, 25, 'PP'], [18, 19, 'PP'], [17, 20, 'PP'],
  // 아래 가운데 하얀 입 부분
  [22, 25, 'WW'], [21, 26, 'WGg'], [17, 27, 'GWWWG'], [16, 28, 'WWWWWWK'], [16, 29, 'GGGGG'],
];
function drawKkamang(g) {
  removeSprout(g);   // 새싹 대신 삐죽한 털
  for (const [x0, y, row] of KK_PUT) [...row].forEach((c, i) => { if (c !== '.') g[y][x0 + i] = KK[c]; });
}
const kkamangGrid = () => { const g = baseGrid6(); drawKkamang(g); return g; };

// 9차 장식: 퍼스나콘 개월별 모습의 자리·크기를 칸으로 읽어 다시 그림(새싹 위에 얹으므로 새싹을 가린다. 퍼스나콘도 그렇다)
// 12개월 선글라스: 연보라 윗테(y 19) + 큰 검은 렌즈 둘(왼쪽 x 5~12, 오른쪽 x 17~25) + 하얀 반사
function drawShades9(g) {
  const P = { F: '#8e8cf0', K: '#0f0f16', k: '#262838', W: '#ffffff', G: '#c9c8ff' };
  put(g, 5, 19, [
    'FFFFFFFFFFFFFFFFFFFFF',
    'GGKKKKKKKKKKKKWKKKKKK',
    'KGKKKKKKKKKKKKWGKKKKK',
    'KKWGKKKk....KKWWKKKKK',
    'KKWGKKKk....KKKKKKKkK',
    '.KKKKKKk....kKKKKKK..',
  ], P);
}
// 18개월 큰 빨간 리본: 정수리 가운데 위(x 7~29, y 2~17). 위 날개는 밝은 빨강, 아래 날개는 진한 빨강, 가운데 매듭
function drawRibbon9(g) {
  const R = { hi: '#ff8a80', base: '#e0393c', mid: '#c42a30', sh: '#94161e', dk: '#6a0a10' };
  // 큰 고리 둘(위쪽은 밝은 빨강, 아래쪽 절반은 그늘진 진한 빨강), 가운데 매듭
  const loopL = (px, py) => inPoly([[15.6, 6.6], [10.5, 1.8], [7.2, 2.6], [6.8, 12], [8.6, 15.6], [12.4, 16.4], [15.4, 12]], px, py);
  const loopR = (px, py) => inPoly([[17.4, 6.6], [24, 1.8], [28.8, 2.6], [29.8, 9], [28, 13], [22.6, 16.8], [17.6, 12]], px, py);
  const knot = (px, py) => px >= 14.6 && px <= 18.6 && py >= 6 && py <= 13;
  drawShape(g, (px, py) => loopL(px, py) || loopR(px, py) || knot(px, py), (x, y, out) => {
    const px = x + 0.5, py = y + 0.5;
    if (knot(px, py)) return out(0, -1) || (px < 15.6 && py < 8.5) ? R.base : py > 10.5 ? R.dk : R.sh;
    if (loopL(px, py) && Math.abs((py - 6.8) - (px - 15.4) * 0.5) < 0.55 && px < 14 && px > 9) return R.sh;   // 고리 안 주름
    if (loopR(px, py) && Math.abs((py - 6.8) + (px - 17.6) * 0.4) < 0.55 && px > 19 && px < 27) return R.sh;
    if (py > 10.5) return out(0, 1) || out(1, 1) ? R.dk : (py > 13 ? R.dk : R.sh);
    if (out(0, -1) || out(-1, 0)) return R.hi;
    return py > 8.5 ? R.mid : R.base;
  });
}
// 왕관 모양(24·27개월 공통): 왼쪽·가운데(높음)·오른쪽 세 봉우리, x 10.6~23.4, 아래 y 13
const CROWN9 = [[10.6, 13.6], [10.6, 4.8], [12.6, 3], [14.4, 5.6], [16.9, 0.8], [19.4, 5.6], [21.8, 4], [23.4, 5.6], [23.4, 13.6]];
function drawCrown9(g, colAt) {
  drawShape(g, (px, py) => inPoly(CROWN9, px, py), (x, y, out) => colAt(x, y, out));
}
const GOLD9 = { out: '#5a2406', dk: '#a8480a', or: '#e0780e', mid: '#f5a820', lt: '#ffd84a', wh: '#fff6c0', band: '#7a2e08' };
function drawGoldCrown9(g) {
  drawCrown9(g, (x, y, out) => {
    if (y >= 12) return GOLD9.band;
    if (x <= 11) return GOLD9.dk; if (x <= 13) return GOLD9.or; if (x === 14) return GOLD9.mid;
    if (x === 16 && y >= 3 && y <= 10) return GOLD9.wh;
    if (x <= 18) return GOLD9.lt; if (x <= 20) return GOLD9.mid; if (x <= 21) return GOLD9.or; return GOLD9.dk;
  });
  for (const [x, y] of [[3, 3], [27, 4], [30, 7], [29, 31], [3, 32]]) sparkle(g, x - 1, y - 1, false, '#bfefff');
}
const CRY9 = ['#7a3cc8', '#d8c0f0', '#b0e4f0', '#ffffff', '#fff4c0', '#a8e0f0', '#4a9af0', '#5a8af0', '#6a50e8', '#6a50e8', '#a8dcf0', '#3a3fa0', '#26307a'];
function drawCrystalCrown9(g) {
  drawCrown9(g, (x, y) => (y >= 12 ? '#3a2a8a' : CRY9[Math.max(0, Math.min(CRY9.length - 1, x - 11))]));
  put(g, 15, 6, ['.D.', 'DMD', 'DMD', '.D.'], { D: '#3a0a4a', M: '#c040a0' });
  const ring = (x, y) => put(g, x - 1, y - 1, ['.P.', 'PWP', '.P.'], { P: '#f6a6d6', W: '#ffe6f4' });
  for (const [x, y] of [[2, 2], [5, 4], [28, 3], [31, 6], [3, 32], [28, 32], [31, 30]]) ring(x, y);
}
// 9차 개월별 짝: [개월, 재질, 그리기(g), 옵션]. 하늘·33개월은 초록 새싹과 볼을 둔다
const MONTHS9 = [
  [1, '하늘', (g) => {}],
  [3, '은', (g) => {}],
  [6, '금', (g) => {}],
  [9, '파랑', (g) => {}],
  [12, '파랑', drawShades9],
  [15, '분홍', (g) => {}],
  [18, '분홍', drawRibbon9],
  [21, '무지개', (g) => {}],
  [24, '무지개', drawGoldCrown9],
  [27, '파스텔 수정', drawCrystalCrown9],
  [30, '까망', null, { thick: true, grid: () => kkamangGrid() }],
  [33, '하늘', null, { grid: () => grid33v9() }],
];
function month9Canvas(i) {
  const [, mat, fn, opt = {}] = MONTHS9[i];
  const g = opt.grid ? opt.grid() : (() => { const b = baseGrid6(); fn(b); return b; })();
  return gridToCanvas9(g, mat, opt);
}

// 33개월: 퍼스나콘 33개월은 머리가 정수리부터 왼쪽 귀까지 덮고 눈이 크다(구도가 1개월과 다름).
//   6차처럼 화면에서 크게 보며 칸 배치를 한 칸씩 따라 적고, 색은 이 시안의 팔레트로 칠했다.
//   O 테두리, L 몸, l 밝은 몸, W 귀 하양, 2 머리(라벤더 회색), 3 머리 그늘, d 진한 남회색 선, m 민트 가닥, t 진한 청록,
//   R 진한 빨강, r 빨강, k 검붉은색(눈동자), p 분홍 회색(눈 반사), P 볼, q 연한 볼, g 회색
const MAP33 = [
  '....................................',
  '..............R.....................',
  '..............RR.......OOOOOO.......',
  '..............pkOOO.gO2222222O.RR...',
  '...............ROmmO1O222mmmmmRR....',
  '...............RrmmtO223m22RRR......',
  '..............O2rOmtO22m22RrRdd.....',
  '.............OmOROmdOO2m22RrR3gdg...',
  '...gOOOO.....OOd2dOOtt23RRrrR222O...',
  '.OLLLdOd22dOO2m2222222OkrrrROOOOOg..',
  '.dLLgO2222mm2O2m222m2222OkOLLLLLLdO.',
  'OLLg2223m2m22dO2m222222222OLWWWWLdOd',
  'lgWd22mmm2222OO2m222m222222OWWWWWLOO',
  'dLO22mm3222dOOO2m222m2232222OWWWWWLO',
  'Ol22m2m222OLLLd2m2222m222222dWWWWWLd',
  'Od2m2m322OLLLLO2m2222m22m2222OWWWWLd',
  'OO2m2m22kLLLLLO2m2222m222m2222OdLLLO',
  'OOmg2mk2OkkLLLO2m2dk2m222mmt2222OLLO',
  'gdm22m2kRrRRLLO2m2kkRRO2222tmmmOlWLO',
  '.Ot22mmkWkWkLLO2mRrWRk2222OdOgWWWLO.',
  '.OOt2dkRpRpRLLdOdRRWWRkkO22OLOWWLLO.',
  '..dOOdORpkrRLLLLOLRRkRRRO22OLgWWLLO.',
  '..OldOORWRprLLLLLLkkrRRkkOOOOOWWLLO.',
  '..OdmmPPWRrLLLLLLLpRrqkRkmmOLLOWLLO.',
  '..OOmOPPPqLLLLLLLLLkrRPPtmmlOOWWLLO.',
  '..OmmOPPqLOLLLLLLLLLqPPPOmOlWWWWWdO.',
  '..OmmOqqqLOLLLLLLLLLqPPPdmOLWWWWWdO.',
  '..OmmOLLLOLLLLLLLLLLLqqLOmOLWWWWWO..',
  '..dmmOOdOLLLLLLLOLLLLLLLOmtLWWLOOO..',
  '...OmO.OLLLLLLLOOdddOOOOOtmOOOOOO...',
  '....OOdglLLLLLOOOOOOOgWWOmO22m222O..',
  '......lO..LLLOg........OmO.O2222O...',
  '.......OOOOOO.........OOg...O2mO....',
  '............................O2g2O...',
  '............................OOg22O..',
  '.............................gOO....',
];
const PAL33 = { O: '#141c4a', L: PX.k, l: PX.kHi, W: '#ffffff', 2: '#8a8abf', 1: '#b4b4e0', 3: '#6c6ca4', d: '#3e4680', m: '#7fe3c4', t: '#3f8a9a',
  R: '#7a0a1c', r: '#e8204e', k: '#2a0610', p: '#c8a0ac', P: PX.cheek, q: PX.cheekHi, g: '#a0a8c4' };
const grid33 = () => MAP33.map((row) => [...row].map((c) => (c === '.' ? null : PAL33[c])));
// 9차 때의 33개월 칸 지도(9차 예시 그림용으로 그대로 둠. 10차에서 고친 것은 위 MAP33)
const MAP33_9 = [
  '....................................',
  '..............R.....................',
  '..............RR......OOOOOOO.......',
  '..............pkOOO.gO2222222O.RR...',
  '...............ROmmO1O222mmmmmRR....',
  '...............RrmmtO223m22RRR......',
  '..............O2rOmtO22m22RrRdd.....',
  '.............OmOROmdOO2m22RrR3gdg...',
  '...gOOOO.....OOd2dOOtt23RRrrR222O...',
  '.OLLLdOd22dOO2m2222222OkrrrROOOOOg..',
  '.dLLgO2222mm2O2m222m2222OkOLLLLLLdO.',
  'OLLg2223m2m22dO2m222222222OLWWWWLdOd',
  'lgWd22mmm2222OO2m222m222222OWWWWWLOO',
  'dLO22mm3222dOOO2m222m2232222OWWWWWLO',
  'Ol22m2m222OLLLd2m2222m222222dWWWWWLd',
  'Od2m2m322OLLLLO2m2222m22m2222OWWWWLd',
  'OO2m2m22kLLLLLO2m2222m222m2222OdLLLO',
  'OOmg2mk2OkkLLLO2m2dk2m222mmt2222OLLO',
  'gdm22m2kRrRRLLO2m2kkRRO2222tmmmOlWLO',
  '.Ot22mmkWkWkLLO2mRrWRk2222OdOgWWWLO.',
  '.OOt2dkRpRpRLLdOdRRWWRkkO22OLOWWLO..',
  '..dOOdORpkrRLLLLOLRRkRRRO22OLgWWLO..',
  '..OldOORWRprLLLLLLkkrRRkkOOOOOWWLO..',
  '..OdmmPPWRrLLLLLLLpRrqkRkmmOLLOWLd..',
  '..OOmOPPPqLLLLLLLLLkrRPPtmmlOOWWLd..',
  '..OmmOPPqLOLLLLLLLLLqPPPOmOlWWWWOd..',
  '..OmmOqqqLOLLLLLLLLLqPPPdmOLWWWWOg..',
  '..OmmOLLLOLLLLLLLLLLLqqLOmOLWWWWO...',
  '..dmmOOdOLLLLLLLOLLLLLLLOmtLWWLOO...',
  '...OmO.OLLLLLLLOOdddOOOOOtmOOOOOO...',
  '....OOdglLLLLLOOOOOOOgWWOmO22m222O..',
  '......lO..LLLOg.......OmO.O22m22O...',
  '.......OOOOOO.........OO2...O2m2O...',
  '...........................O22gO....',
  '............................O2mO....',
  '....................................',
];
const grid33v9 = () => MAP33_9.map((row) => [...row].map((c) => (c === '.' ? null : PAL33[c])));

// ───────────────────────── 10차(2026-11-24) ─────────────────────────
// 사용자 "코끼리 디자인을 제대로 잡아봐". 9차는 몸을 1개월 칸 지도 하나로 그려 개월마다 윤곽이 퍼스나콘과 어긋났다.
// 10차는 개월마다 퍼스나콘을 화면에서 크게(한 칸 35px, 칸 격자를 겹쳐) 보며 윤곽·안쪽 선·눈 칸을 한 칸씩 따라 적었다(파일·픽셀 값은 받지 않음).
// 칸 글자: '.' 빈칸, O 테두리·안쪽 선(재질의 테두리색), B 몸(재질 광택으로 칠함), e 눈 안쪽 밝은 칸. 색은 9차 재질(MATS9)을 쓴다.
const MAP10 = {};
MAP10[9] = [
  '....................................',
  '....................................',
  '....................................',
  '................OOO.................',
  '...............OBBBO................',
  '................OBBO................',
  '..............O..BBB................',
  '.............OBO.OBB.O..............',
  '....OOO......OBO.OBOBB..............',
  '...BBBBBO....OOO.OOOBO........OOO...',
  '..OBBBBBBOO...OOOOOBO.....OOBBBBBOO.',
  '.OBBBBBBBBOOOBBBBBBBBOO..OBBBBBBBBO.',
  '.BBBBBBBBBBBBBBBBBBBBBBBOBBBBBBBBBBO',
  '.BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBO',
  'OBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBO',
  'OBBBBBBOBBBBBBBBBBBBBBBBBBBBBBBBBBBO',
  'OBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBO',
  'OBBBBBOBBBBBBBBBBBBBBBBBBBBBBBBBBBBO',
  'OBBBBBOBBBBBBBBBBBBBBBBBBBBBBBBBBBBO',
  'OBBBBBOBBBBBBBBBBBBBBBBBBBBOOOBBBBBO',
  '.OBBBBOBOOBBBBBBBBBBBOOBBBBBBBOBBBO.',
  '.OBBBBOOeeOBBBBBBBBBOeeOBBBBBBOBBBO.',
  '..OBBBOOeOOBBBBBBBBBOeOOBBBBBBOBBBO.',
  '..OBBOBBOOBBBBBBBBBBBOOBBBBBBBOBBBO.',
  '..OBBOBBBBBBBBBBBBBBBBBBBBBBBOBBBBO.',
  '..OBBOBBBBBBBBBBBBBBBBBBBBBBBBBBBOO.',
  '..OBBOBBBBBBBBBBBBBBBBBBBBBBBBBBBOO.',
  '..OOBOBBBBBBBBBBBBBBBBBBBBBBBBBBBO..',
  '...OOOOBOBBBBBBBBBBBBBBBBBBBBBBBOO..',
  '.......OBBBBBBBOBBBBBBBOOOOOOOOOO...',
  '......OBBBBBBBBOOOOOOOO.............',
  '......OBBBBBBOO.....................',
  '.......OBBBOOO......................',
  '....................................',
  '....................................',
  '....................................',
];
// 칸 지도마다 밝기(9차 LV9와 같은 방식: 테두리까지 거리 + 왼쪽 위 빛)
function lvOf(map) {
  const fill = (x, y) => x >= 0 && y >= 0 && x < N && y < N && 'Be'.includes(map[y][x]);
  const D = map.map((row, y) => [...row].map((c, x) => (fill(x, y) ? 99 : 0)));
  for (let pass = 0; pass < 6; pass++) for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    if (!D[y][x]) continue;
    const nb = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => (fill(x + dx, y + dy) ? D[y + dy][x + dx] : 0));
    D[y][x] = Math.min(D[y][x], Math.min(...nb) + 1);
  }
  return map.map((row, y) => [...row].map((c, x) => {
    if (!fill(x, y)) return null;
    let v = 0.45 * Math.min(D[y][x], 4) / 4 + 0.75 - 0.5 * (y - 11) / 21 - 0.2 * (x - 1) / 34;
    if (!fill(x + 1, y) || !fill(x, y + 1)) v -= 0.12;
    if (!fill(x - 1, y) || !fill(x, y - 1)) v += 0.15;
    return v;
  }));
}
// 칸 지도 + 재질 → 그림. spec/hi: 반사 칸 목록(없으면 9차 것), deco(g): 장식을 덧그림(재질과 상관없는 색)
function render10(map, mname, o = {}) {
  const m = MATS10[mname];
  const LV = lvOf(map);
  const spec = new Set((o.spec || SPEC9).map(([x, y]) => x + ',' + y)), hi = new Set((o.hi || HI9).map(([x, y]) => x + ',' + y));
  const cv = document.createElement('canvas'); cv.width = cv.height = N;
  const ctx = cv.getContext('2d');
  const cell = (x, y) => {
    const c = map[y][x];
    if (c === '.') return null;
    if (c === 'O') return pick9(m.out, x, y);
    if (c === 'e') return m.eyeW || matColor(m, 4, x, y);
    let lv = LV[y][x] + (m.off || 0) + LV9_OFF + (o.ear ? o.ear(x, y) : 0);
    lv = lv < 0.3 ? 0 : lv < 0.48 ? 1 : lv < 0.68 ? 2 : lv < 0.95 ? 3 : 4;
    const k = x + ',' + y;
    if (hi.has(k)) lv = Math.max(lv, 4);
    if (spec.has(k)) lv = 5;
    return matColor(m, lv, x, y);
  };
  const g = map.map((row, y) => [...row].map((c, x) => cell(x, y)));
  if (o.deco) o.deco(g);
  g.forEach((r, y) => r.forEach((c, x) => { if (c) { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); } }));
  return cv;
}
// 겹쳐 보니 3·6·9·12·15·18·21·24·27·30개월은 몸 윤곽이 모두 같았다(9개월 칸 지도와 일치). 그래서 공통 몸 BASE10에
// 개월별로 다른 칸만 고친다(MAP10_FIX). 1개월은 6차 칸 지도, 33개월은 9차의 MAP33을 그대로 쓴다.
const BASE10 = MAP10[9];
const MAP10_FIX = {
  3: [[32, 9, '.'], [6, 29, 'O'], [4, 8, 'B'], [7, 8, 'B'], [19, 10, 'O'], [21, 10, 'B'], [20, 8, 'O']],
  6: [[7, 8, 'O'], [29, 9, 'O'], [32, 9, '.'], [0, 11, 'O'], [0, 12, 'O'], [6, 29, 'O'], [2, 28, 'B']],
  12: [[4, 8, 'B'], [7, 8, 'O'], [29, 9, 'O'], [21, 10, 'O'], [0, 11, 'O'], [0, 12, 'O'], [2, 28, 'B'], [6, 29, 'O']],
  18: [[2, 28, 'B'], [6, 29, 'O'], [2, 9, 'O'], [4, 8, 'B'], [29, 9, 'O'], [32, 9, '.'], [0, 11, 'O'], [0, 12, 'B'], [0, 13, 'B']],
  15: [[15, 3, 'O'], [18, 3, '.'], [19, 4, '.'], [18, 4, 'B'], [15, 7, 'B'], [16, 7, 'B'], [20, 7, 'O'], [15, 8, 'B'], [16, 8, 'B'], [2, 9, 'O'], [13, 10, 'B'], [1, 10, 'B'], [24, 11, 'O'], [35, 12, '.'], [34, 12, 'O'], [0, 13, 'B'], [35, 17, 'B'], [29, 9, 'O'], [32, 9, '.'], [25, 10, 'B'], [34, 10, '.'], [35, 18, '.'], [34, 18, 'O'], [35, 19, '.'], [34, 19, 'O'], [33, 20, 'O'], [34, 20, 'B'], [33, 21, 'O'], [34, 21, '.'], [33, 22, 'O'], [34, 22, '.'], [33, 23, 'O'], [34, 23, '.'], [33, 24, 'O'], [34, 24, '.'], [33, 25, 'O'], [34, 25, '.'], [33, 26, 'O'], [34, 26, '.'], [32, 27, 'O'], [33, 27, 'B'], [31, 28, 'O'], [32, 28, '.'], [31, 29, '.'], [32, 29, '.'], [25, 29, 'B'], [26, 29, 'B'], [2, 28, 'B'], [6, 30, 'B'], [6, 31, 'B'], [7, 32, 'B'], [15, 30, 'B'], [16, 30, 'B'], [17, 30, 'B'], [18, 30, 'B'], [19, 30, 'B'], [20, 30, '.'], [21, 30, '.'], [22, 30, '.'], [33, 28, '.']],
};
const map10 = (mo) => { const rows = BASE10.map((r) => [...r]); for (const [x, y, c] of MAP10_FIX[mo] || MAP10_FIX[MAP10_SAME[mo]] || []) rows[y][x] = c; return rows.map((r) => r.join('')); };
MAP10_FIX[21] = MAP10_FIX[15].concat([[6, 30, 'O'], [6, 31, 'O'], [7, 32, 'O'], [6, 29, 'B']]);   // 21개월 몸은 15개월과 같고 코 끝 테두리만 진함
MAP10_FIX[24] = [[2, 9, 'O'], [7, 8, 'B'], [29, 9, 'O'], [0, 11, 'O'], [0, 12, 'B'], [0, 13, 'B'], [25, 10, 'O'], [24, 11, 'B'], [35, 11, 'B'],
  [6, 29, 'B'], [6, 31, '.'], [7, 31, 'O'], [7, 32, '.'], [8, 32, 'O'], [14, 31, '.'], [2, 28, 'B']];
MAP10_FIX[27] = [[2, 9, 'O'], [7, 8, 'B'], [0, 10, 'B'], [1, 10, 'B'], [0, 11, 'B'], [0, 12, 'B'], [0, 13, 'B'], [29, 9, 'O'], [28, 9, 'B'], [32, 9, '.'], [24, 11, 'B'], [25, 10, 'B'], [35, 11, 'B'], [16, 29, 'O'], [17, 29, 'O'], [18, 29, 'O'], [19, 29, 'O'], [20, 29, 'O'], [21, 29, 'O'], [22, 29, 'O'], [15, 30, 'B'], [16, 30, 'B'], [17, 30, 'B'], [18, 30, 'B'], [19, 30, 'B'], [20, 30, '.'], [21, 30, '.'], [22, 30, '.'], [33, 20, 'O'], [33, 21, 'O'], [33, 22, 'O'], [33, 23, 'O'], [33, 24, 'O'], [33, 25, 'O'], [33, 26, 'O'], [34, 20, '.'], [34, 21, '.'], [34, 22, '.'], [34, 23, '.'], [34, 24, '.'], [34, 25, '.'], [34, 26, '.'], [34, 19, 'O'], [35, 19, '.'], [2, 28, 'B'], [32, 29, '.']];
const MAP10_SAME = {};   // 장식만 다르고 몸은 같은 개월(겹쳐 보니 모두 조금씩 달라 개월마다 따로 고침)
// 귀 칸은 조금 밝게(퍼스나콘도 귀가 머리보다 밝다)
const EAR10 = (x, y) => (x <= 5 || (x >= 26 && y <= 19) || x >= 31 ? 0.3 : 0);
// 10차 재질: 9차 재질을 쓰되 무지개·파스텔 수정의 색 배치를 퍼스나콘 21·27개월을 다시 보고 고침(9차 재질은 그대로 둠)
const MATS10 = Object.assign({}, MATS9, {
  '금': Object.assign({}, MATS9['금'], { off: 0.12 }),
  '은': Object.assign({}, MATS9['은'], { off: 0.2 }),
  '파랑': Object.assign({}, MATS9['파랑'], { off: 0.16 }),
  // 무지개: 왼쪽 위 빨강 → 위 주황·노랑 → 오른쪽 귀 연두·하늘 → 가운데 초록 → 오른쪽 아래 파랑·자홍, 왼쪽 아래 초록·청록, 코 끝 남보라
  '무지개': Object.assign({}, MATS9['무지개'], { hue: (x, y) => RB10(x, y), out: (x, y) => hex9(RB10(x, y), 80, 22), shade: (x, y) => hex9(RB10(x, y), 85, 32) }),
  // 파스텔 수정: 가운데를 중심으로 빙 돌며 색이 바뀐다(왼쪽 위 분홍 → 위 복숭아 → 오른쪽 위 연노랑 → 오른쪽 아래 민트 → 아래 하늘 → 왼쪽 아래 보라)
  '파스텔 수정': Object.assign({}, MATS9['파스텔 수정'], { hue: (x, y) => PS10(x, y), s: 50, sAt: (x, y) => Math.min(60, 12 + 4.2 * Math.hypot(x - 17, y - 20)) }),
});
// 파스텔: 가운데(18,21)에서 본 방향마다 색(왼쪽 -180°부터 45°씩: 라벤더, 분홍, 연분홍, 연노랑, 연노랑, 민트, 하늘, 보라, 라벤더)
function PS10(x, y) {
  const T = [280, 320, 340, 400, 420, 525, 570, 620, 640];
  const a = Math.atan2(y - 21, x - 18) * 180 / Math.PI + 180, i = Math.min(7, Math.floor(a / 45)), t = (a - i * 45) / 45;
  return (T[i] + (T[i + 1] - T[i]) * t) % 360;
}
function RB10(x, y) { return Math.min(320, 3.2 * x + 7.5 * y - 106 + 0.6 * Math.max(0, x - 5) * Math.max(0, y - 12)); }
// 24개월 금 왕관: 퍼스나콘에서 칸을 읽음(가운데 기둥이 가장 높고, 왼쪽·오른쪽 기둥, 아래 진한 띠)
const GOLD10 = { d: '#5a2406', b: '#8a3a08', o: '#e07010', y: '#f8c828', l: '#fff0b0', w: '#fffbe8' };
const GOLD10_MAP = [
  [17, 1, 'od'], [16, 2, 'yyyd'], [15, 3, 'yylyod'], [12, 4, 'od.ylyyod'], [11, 5, 'boollyyyoddood'],
  [11, 6, 'boolwyyyydbyod'], [11, 7, 'boolwyyyydbyod'], [11, 8, 'boolwyyyydbyod'], [11, 9, 'boolwyyyydbyod'],
  [10, 10, 'dooollyyyydbyod'], [10, 11, 'dbooylyyyybbyod'], [11, 12, 'bbboyyyyoddbbd'], [13, 13, 'dddddddd'],
];
// 27개월 수정 왕관: 퍼스나콘에서 칸을 읽음(세로 줄무늬: 보라·라벤더·하늘·하양·연노랑·파랑·보라, 가운데 보석)
const CRY10 = { P: '#7a3cc8', v: '#d8c0f0', c: '#b0e4f0', w: '#ffffff', y: '#fff4c0', u: '#4a90f0', U: '#5a7af0', V: '#6a50e8', n: '#2a2a80', k: '#2a0a32', m: '#c040a0' };
const CRY10_MAP = [
  [16, 1, 'PP'], [15, 2, 'Pccn'], [12, 3, 'P..PccuP'], [11, 4, 'PvnPycuUn..nn'], [11, 5, 'PvcvykuUUPnvn'],
  [10, 6, 'PvvcPwkkuUVVcn'], [10, 7, 'PvvcwkmkuUVVcn'], [10, 8, 'PvvcwkmkuUVVcn'], [10, 9, 'PvvcwkkuuUVVcn'],
  [10, 10, 'PvvcwycuuUVVvn'], [10, 11, 'PvvcwycuuUVVvn'], [11, 12, 'nnnvwcuuUVnnn'], [15, 13, 'nnnnnnn'],
];
const putRows = (g, rows, pal) => { for (const [x0, y, row] of rows) [...row].forEach((c, i) => { if (c !== '.' && pal[c]) g[y][x0 + i] = pal[c]; }); };
const KK10 = [
  [8, 19, 'WWG'], [7, 20, 'WWWWG'], [7, 21, 'WWKWW'], [7, 22, 'WWGWW'], [8, 23, 'WWW'],
  [22, 20, 'WWW'], [19, 21, 'GWWWWW'], [19, 22, 'WKWWWW'], [19, 23, 'WWWWWG'], [20, 24, 'gWWg'],
  [12, 23, 'PP'], [11, 25, 'PP'], [18, 19, 'PP'], [17, 20, 'PP'],
  [21, 26, 'WW'], [19, 27, 'WWGg'], [16, 28, 'WWWWWG'], [16, 29, 'WWWWWWK'], [16, 30, 'GGGGGG'],
];
// 18개월 큰 빨간 리본: 퍼스나콘에서 칸을 읽음(위 고리는 밝은 빨강, 아래 절반과 꼬리는 진한 빨강, 틈으로 새싹이 보임)
const RIB10 = { d: '#3a0006', D: '#6a0a10', m: '#9a1820', r: '#c8282e', R: '#e03a3c', h: '#f07070' };
const RIB10_MAP = [
  [8, 2, 'rRRRh'], [26, 2, 'rRh'],
  [8, 3, 'DhhhrR'], [22, 3, 'RRRhhhhr'],
  [8, 4, 'rRRRhrR'], [20, 4, 'RRhhhhhRRD'],
  [7, 5, 'DRRRRRhr'], [19, 5, 'rhRRRRRRRRD'],
  [7, 6, 'DrRRRRRrr'], [18, 6, 'rRRRRRRRRRRD'],
  [7, 7, 'DRRRmmrrD'], [17, 7, 'mrDDmRRRRRRrd'],
  [7, 8, 'DRRRRmDDmrrmDDRRRRRRmDD'],
  [7, 9, 'DmRRRRrDRRRDRRRRRRRmDd'],
  [7, 10, 'drrrrrrdddddrrrrrrrDD'],
  [7, 11, 'dDDDmmDdDddDDmmrrrrDd'],
  [7, 12, 'dDDmDddDd.ddDDDDDDDdd'],
  [7, 13, 'dDDDdDDdd.ddDmDDDDDDd'],
  [7, 14, 'dddDdmrD..dmdDDDDDDdd'],
  [9, 15, 'DrrRRD'], [17, 15, 'DRRDddDDD'],
  [9, 16, 'DDdDRD'], [17, 16, 'DmDDd'],
  [13, 17, 'md'], [18, 17, 'd'],
];
// 개월표(10차): [개월, 재질, 장식(g), 옵션]
const MONTHS10 = [
  [1, '하늘', null, { old: () => gridToCanvas9(itemGrid(() => {}, true), '하늘') }],
  [3, '은'], [6, '금'], [9, '파랑'],
  [12, '파랑', drawShades9], [15, '분홍'], [18, '분홍', (g) => putRows(g, RIB10_MAP, RIB10)],
  [21, '무지개'], [24, '무지개', (g) => { putRows(g, GOLD10_MAP, GOLD10); for (const [x, y] of [[3, 3], [27, 4], [30, 7], [29, 31], [3, 32]]) sparkle(g, x - 1, y - 1, false, '#bfefff'); }],
  [27, '파스텔 수정', (g) => { putRows(g, CRY10_MAP, CRY10); const ring = (x, y) => put(g, x - 1, y - 1, ['.P.', 'PWP', '.P.'], { P: '#f6a6d6', W: '#ffe6f4' }); for (const [x, y] of [[2, 2], [5, 4], [28, 3], [31, 6], [3, 32], [28, 32], [31, 30]]) ring(x, y); }],
  [30, '까망', (g) => putRows(g, KK10, KK), { thickIn: true }],
  [33, '하늘', null, { old: () => gridToCanvas9(grid33(), '하늘') }],
];
function month10Canvas(i) {
  const [mo, mat, deco, opt = {}] = MONTHS10[i];
  if (opt.old) return opt.old();
  let map = map10(mo);
  if (opt.thickIn) {   // 까망: 퍼스나콘처럼 몸 가장자리 칸도 보라 테두리(테두리가 안쪽으로 두 칸)
    const out = (x, y) => x < 0 || y < 0 || x >= N || y >= N || map[y][x] === '.';
    map = map.map((row, y) => [...row].map((c, x) => (c === 'B' && [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => out(x + dx, y + dy)) ? 'O' : c)).join(''));
  }
  const cv = render10(map, mat, { deco, ear: EAR10 });
  if (opt.thick) {   // 까망: 테두리를 바깥으로 한 칸 더(털 갈래 위쪽 y<10은 얇게)
    const ctx = cv.getContext('2d'); const m = MATS10[mat];
    for (let y = 10; y < N; y++) for (let x = 0; x < N; x++) {
      if (map[y][x] !== '.') continue;
      if ([[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => map[y + dy] && map[y + dy][x + dx] && map[y + dy][x + dx] !== '.')) { ctx.fillStyle = pick9(m.out, x, y); ctx.fillRect(x, y, 1, 1); }
    }
  }
  return cv;
}

// ───────────────────────── 11차(2026-11-24) ─────────────────────────
// 사용자 "그렇게 또렷하게 고쳐봐". 모양(칸 지도·장식 자리)은 10차 그대로, 칠하는 방식만 바꾼다.
//   테두리는 거의 검정에 가까운 진한 색(재질 기운만 남김), 몸은 4단(진한 그늘 · 중간 · 밝음 · 거의 순수한 흰 반사)으로 줄이고 단계 사이를 크게 벌림.
//   반사 칸·밝은 칸 자리(SPEC9·HI9)는 10차와 같다.
// 무지개(11차): 위쪽 가운데 주황·노랑이 넓고, 왼쪽 아래 초록, 오른쪽 아래 파랑·자홍(퍼스나콘 21개월을 다시 보고 맞춤)
function RB11(x, y) { return Math.max(-20, Math.min(320, x + 6 * y - 77 + Math.max(0, x - 8) * Math.max(0, y - 12))); }
const MATS11 = {
  '은': { out: '#16161e', t: ['#5a5c68', '#a9abb6', '#d6d8df', '#ffffff'] },
  '금': { out: '#2e1402', t: ['#b8600a', '#f2b424', '#ffe57a', '#fffdf0'] },
  '파랑': { off: 0.08, out: '#070c4a', t: ['#1a4cc0', '#4b9cf2', '#aadfff', '#ffffff'] },
  '분홍': { off: 0, out: '#3c0420', t: ['#a8105a', '#ec4c9e', '#ff9ccd', '#ffffff'] },
  '무지개': { out: (x, y) => hex9(RB11(x, y), 70, 13), hue: (x, y) => RB11(x, y), s: 95, l: [36, 54, 74, 97] },
  '파스텔 수정': { out: '#24127a', hue: PS10, sAt: MATS10['파스텔 수정'].sAt, l: [58, 78, 91, 100] },
  '까망': { out: '#7a62c8', t: ['#060509', '#0b0a0f', '#131219', '#1e1d26'] },   // 퍼스나콘 30개월처럼 몸은 거의 고른 검정(흰 눈·입이 또렷하게)
};
let T11 = [0.3, 0.58];   // 단계 나누는 밝기 기준(진한 그늘 < T11[0] ≤ 중간 < T11[1] ≤ 밝음)
const tone11 = (m, lv, x, y) => (m.t ? m.t[lv] : hex9(m.hue(x, y), m.sAt ? m.sAt(x, y) : m.s, m.l[lv]));
function render11(map, mname, o = {}) {
  const m = MATS11[mname];
  const LV = lvOf(map);
  const spec = new Set(SPEC9.map(([x, y]) => x + ',' + y)), hi = new Set(HI9.map(([x, y]) => x + ',' + y));
  const off = (m.off !== undefined ? m.off : (MATS10[mname].off || 0)) + LV9_OFF;   // 재질마다 밝기(11차 값이 있으면 그것)
  const g = map.map((row, y) => [...row].map((c, x) => {
    if (c === '.') return null;
    if (c === 'O') return pick9(m.out, x, y);
    if (c === 'e') return tone11(m, 2, x, y);
    const v = LV[y][x] + off + (o.ear ? o.ear(x, y) : 0);
    let lv = v < T11[0] ? 0 : v < T11[1] ? 1 : 2;   // 3단: 진한 그늘 / 중간 / 밝음
    const k = x + ',' + y;
    if (hi.has(k) || spec.has(k)) lv = 3;        // 반사 칸과 그 둘레를 거의 순수한 흰색으로(퍼스나콘처럼 반사가 크게 보이게)
    return tone11(m, lv, x, y);
  }));
  if (o.deco) o.deco(g);
  const cv = document.createElement('canvas'); cv.width = cv.height = N;
  const ctx = cv.getContext('2d');
  g.forEach((r, y) => r.forEach((c, x) => { if (c) { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); } }));
  return cv;
}
// 1개월·33개월은 퍼스나콘도 평평한 파스텔이고 이미 또렷해서 10차 그대로
function month11Canvas(i) {
  const [mo, mat, deco, opt = {}] = MONTHS10[i];
  if (opt.old) return opt.old();
  let map = map10(mo);
  if (opt.thickIn) {
    const out = (x, y) => x < 0 || y < 0 || x >= N || y >= N || map[y][x] === '.';
    map = map.map((row, y) => [...row].map((c, x) => (c === 'B' && [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => out(x + dx, y + dy)) ? 'O' : c)).join(''));
  }
  return render11(map, mat, { deco, ear: EAR10 });
}

export { N, MONTHS10, month11Canvas };
