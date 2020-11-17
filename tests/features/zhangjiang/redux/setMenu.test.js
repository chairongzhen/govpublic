import {
  ZHANGJIANG_SET_MENU,
} from '../../../../src/features/zhangjiang/redux/constants';

import {
  setMenu,
  reducer,
} from '../../../../src/features/zhangjiang/redux/setMenu';

describe('zhangjiang/redux/setMenu', () => {
  it('returns correct action by setMenu', () => {
    expect(setMenu()).toHaveProperty('type', ZHANGJIANG_SET_MENU);
  });

  it('handles action type ZHANGJIANG_SET_MENU correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ZHANGJIANG_SET_MENU }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
