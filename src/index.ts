import './localization';
import options from './options';
import { setupHinqocBrand } from './hinqocBrand';
import { Roulette } from './roulette';

const roulette = new Roulette();

(window as any).roulette = roulette;
(window as any).options = options;

setupHinqocBrand();
