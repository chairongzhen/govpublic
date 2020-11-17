import {
  COMMON_SEARCH,
} from '../../../../src/features/common/redux/constants';

import {
  search,
  reducer,
} from '../../../../src/features/common/redux/search';

describe('common/redux/search', () => {
  it('returns correct action by search', () => {
    expect(search()).toHaveProperty('type', COMMON_SEARCH);
  });

  it('handles action type COMMON_SEARCH correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_SEARCH }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
