import constate from 'constate';
import { reducer, initialState, Action, State } from './reducer';
import { Dispatch, useEffect, useMemo, useReducer } from 'react';
import { useCats } from './selectors';

export const useStore = () => {
  return useReducer(reducer, initialState);
};

export const [StoreProvider, useStoreContext] = constate(useStore);
