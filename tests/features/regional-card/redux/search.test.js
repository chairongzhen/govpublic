import {
  REGIONAL_CARD_SEARCH,
} from '../../../../src/features/regional-card/redux/constants';

import {
  search,
  reducer,
} from '../../../../src/features/regional-card/redux/search';

describe('regional-card/redux/search', () => {
  it('returns correct action by search', () => {
    expect(search()).toHaveProperty('type', REGIONAL_CARD_SEARCH);
  });

  it('handles action type REGIONAL_CARD_SEARCH correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: REGIONAL_CARD_SEARCH }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
