import type { ColorTheme } from '../types/ColorTheme';

export const initialZoom = 30;
export const canvasWidth = 1600;
export const canvasHeight = 900;
export const zoomThreshold = 5;
export const STUCK_DELAY = 5000;
export const UI_FONT_FAMILY = `'Pretendard Variable', Pretendard, 'Noto Sans KR', 'Malgun Gothic', 'Apple SD Gothic Neo', system-ui, sans-serif`;
// 오락실 도트 테마의 캔버스용 색과 글꼴(패널 쪽 값은 assets/style.scss의 :root)
export const DOT_LINE = '#4a69c0';
export const DOT_INK = '#0a1024';
export const DOT_TEXT_SOFT = '#d6e4ff';
export const DOT_ACCENT = '#9cf0d2';
export const DOT_RED = '#d9475e';
export const NAME_FONT_FAMILY = `'Noto Sans KR', sans-serif`;
export const DOT_FONT_FAMILY = `'Galmuri11', 'Noto Sans KR', sans-serif`;
export const NUMBER_FONT_FAMILY = `'Press Start 2P', 'Galmuri11', monospace`;
export const WINNER_NAME_FONT_FAMILY = `'Do Hyeon', 'Noto Sans KR', sans-serif`;

export enum Skills {
  None,
  Impact,
}

export const Themes: Record<string, ColorTheme> = {
  light: {
    background: '#eee',
    marbleLightness: 50,
    marbleWinningBorder: 'black',
    skillColor: '#69c',
    coolTimeIndicator: '#999',
    entity: {
      box: {
        fill: '#226f92',
        outline: 'black',
        bloom: 'cyan',
        bloomRadius: 0,
      },
      circle: {
        fill: 'yellow',
        outline: '#ed7e11',
        bloom: 'yellow',
        bloomRadius: 0,
      },
      polyline: {
        fill: 'white',
        outline: 'black',
        bloom: 'cyan',
        bloomRadius: 0,
      },
    },
    rankStroke: 'black',
    minimapBackground: '#fefefe',
    minimapViewport: '#6699cc',

    winnerBackground: 'rgba(255, 255, 255, 0.5)',
    winnerOutline: 'black',
    winnerText: '#cccccc',
  },
  dark: {
    background: '#172042', // 힌콕 판(2026-11-24 "힌콕 밤하늘" 1차안): 짙은 남색 경기장, 바·점은 민트, 벽은 연한 하늘
    marbleLightness: 75,
    marbleWinningBorder: 'white',
    skillColor: 'white',
    coolTimeIndicator: 'red',
    entity: {
      box: {
        fill: '#9cf0d2',
        outline: '#9cf0d2',
        bloom: '#9cf0d2',
        bloomRadius: 15,
      },
      circle: {
        fill: '#9cf0d2',
        outline: '#9cf0d2',
        bloom: '#9cf0d2',
        bloomRadius: 15,
      },
      polyline: {
        fill: '#8fb8ff',
        outline: '#8fb8ff',
        bloom: '#8fb8ff',
        bloomRadius: 22,
      },
    },
    rankStroke: '',
    minimapBackground: '#121a36',
    minimapViewport: 'white',
    winnerBackground: 'rgba(10, 16, 36, 0.88)',
    winnerOutline: '',
    winnerText: 'white',
  },
};
