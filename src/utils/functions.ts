import {DOOBOOLAB_EMAIL} from './constants';

export const copyEmailAsync = async (): Promise<void> => {
  await navigator.clipboard.writeText(DOOBOOLAB_EMAIL);
  alert('클립보드에 복사되었습니다.');
};
