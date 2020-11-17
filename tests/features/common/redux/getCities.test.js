import {
  COMMON_GET_CITIES,
} from '../../../../src/features/common/redux/constants';

import {
  getCities,
  reducer,
} from '../../../../src/features/common/redux/getCities';

describe('common/redux/getCities', () => {
  it('returns correct action by getCities', () => {
    expect(getCities()).toHaveProperty('type', COMMON_GET_CITIES);
  });

  it('handles action type COMMON_GET_CITIES correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_GET_CITIES }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
