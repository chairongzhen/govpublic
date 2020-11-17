import {
  COMMON_SET_CATEGORY,
} from '../../../../src/features/common/redux/constants';

import {
  setCategory,
  reducer,
} from '../../../../src/features/common/redux/setCategory';

describe('common/redux/setCategory', () => {
  it('returns correct action by setCategory', () => {
    expect(setCategory()).toHaveProperty('type', COMMON_SET_CATEGORY);
  });

  it('handles action type COMMON_SET_CATEGORY correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_SET_CATEGORY }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
