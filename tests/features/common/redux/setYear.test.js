import {
  COMMON_SET_YEAR,
} from '../../../../src/features/common/redux/constants';

import {
  setYear,
  reducer,
} from '../../../../src/features/common/redux/setYear';

describe('common/redux/setYear', () => {
  it('returns correct action by setYear', () => {
    expect(setYear()).toHaveProperty('type', COMMON_SET_YEAR);
  });

  it('handles action type COMMON_SET_YEAR correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_SET_YEAR }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
