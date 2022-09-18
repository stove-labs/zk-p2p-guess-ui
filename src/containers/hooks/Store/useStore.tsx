import constate from 'constate';
import { reducer, initialState, Action, State } from './reducer';
import { Dispatch, useEffect, useMemo, useReducer } from 'react';

// elevate our reducer into a store
export const useStore = () => {
  return useReducer(reducer, initialState);
};

// expose the store as a provider/context
export const [StoreProvider, useStoreContext] = constate(useStore);
