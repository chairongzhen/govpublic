import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  REGIONAL_CARD_GETUSER_BEGIN,
  REGIONAL_CARD_GETUSER_SUCCESS,
  REGIONAL_CARD_GETUSER_FAILURE,
  REGIONAL_CARD_GETUSER_DISMISS_ERROR,
} from '../../../../src/features/regional-card/redux/constants';

import {
  getuser,
  dismissGetuserError,
  reducer,
} from '../../../../src/features/regional-card/redux/getuser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('regional-card/redux/getuser', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getuser succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getuser())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', REGIONAL_CARD_GETUSER_BEGIN);
        expect(actions[1]).toHaveProperty('type', REGIONAL_CARD_GETUSER_SUCCESS);
      });
  });

  it('dispatches failure action when getuser fails', () => {
    const store = mockStore({});

    return store.dispatch(getuser({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', REGIONAL_CARD_GETUSER_BEGIN);
        expect(actions[1]).toHaveProperty('type', REGIONAL_CARD_GETUSER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetuserError', () => {
    const expectedAction = {
      type: REGIONAL_CARD_GETUSER_DISMISS_ERROR,
    };
    expect(dismissGetuserError()).toEqual(expectedAction);
  });

  it('handles action type REGIONAL_CARD_GETUSER_BEGIN correctly', () => {
    const prevState = { getuserPending: false };
    const state = reducer(
      prevState,
      { type: REGIONAL_CARD_GETUSER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getuserPending).toBe(true);
  });

  it('handles action type REGIONAL_CARD_GETUSER_SUCCESS correctly', () => {
    const prevState = { getuserPending: true };
    const state = reducer(
      prevState,
      { type: REGIONAL_CARD_GETUSER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getuserPending).toBe(false);
  });

  it('handles action type REGIONAL_CARD_GETUSER_FAILURE correctly', () => {
    const prevState = { getuserPending: true };
    const state = reducer(
      prevState,
      { type: REGIONAL_CARD_GETUSER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getuserPending).toBe(false);
    expect(state.getuserError).toEqual(expect.anything());
  });

  it('handles action type REGIONAL_CARD_GETUSER_DISMISS_ERROR correctly', () => {
    const prevState = { getuserError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: REGIONAL_CARD_GETUSER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getuserError).toBe(null);
  });
});

