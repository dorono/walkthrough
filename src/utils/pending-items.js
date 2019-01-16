import {STAGE_PENDING} from 'constants/stages';

export const displayPendingContent = (items) => items.findIndex(item => item.stage === STAGE_PENDING) !== -1;
