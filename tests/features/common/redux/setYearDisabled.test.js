import {
  COMMON_SET_YEAR_DISABLED,
} from '../../../../src/features/common/redux/constants';

import {
  setYearDisabled,
  reducer,
} from '../../../../src/features/common/redux/setYearDisabled';

describe('common/redux/setYearDisabled', () => {
  it('returns correct action by setYearDisabled', () => {
    expect(setYearDisabled()).toHaveProperty('type', COMMON_SET_YEAR_DISABLED);
  });

  it('handles action type COMMON_SET_YEAR_DISABLED correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_SET_YEAR_DISABLED }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
