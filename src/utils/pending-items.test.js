import {STAGE_PENDING} from 'constants/stages';
import {displayPendingContent} from './pending-items';

const mockPendingChain = [
    {
        chain_id: 'test',
        external_ids: [],
        href: 'test',
        stage: STAGE_PENDING,
    },
];

test('pendingItems should return true', () => {
    expect(displayPendingContent(mockPendingChain)).toBe(true);
});
