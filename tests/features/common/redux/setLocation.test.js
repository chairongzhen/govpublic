import {
  COMMON_SET_LOCATION,
} from '../../../../src/features/common/redux/constants';

import {
  setLocation,
  reducer,
} from '../../../../src/features/common/redux/setLocation';

describe('common/redux/setLocation', () => {
  it('returns correct action by setLocation', () => {
    expect(setLocation()).toHaveProperty('type', COMMON_SET_LOCATION);
  });

  it('handles action type COMMON_SET_LOCATION correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_SET_LOCATION }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
