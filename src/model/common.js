import { atom } from 'recoil';

const NS = 'common';

export const codeState = atom({
  key: `${NS}/codeState`,
  default: ''
});
