import { Reducer } from 'react';
import { Cat } from '../../components/ChallengerPage/Stepper';

export interface State {
  challenge: {
    secret?: Cat;
    cats: {
      data?: Cat[];
      status: 'STANDBY' | 'LOADING' | 'LOADED';
    };
  };
}

export type Action =
  | { type: 'LOAD_CATS' }
  | { type: 'SET_CATS'; payload: { cats: Cat[] } }
  | { type: 'SET_SECRET'; payload: { secret: Cat } };

export const initialState: State = {
  challenge: {
    cats: {
      status: 'STANDBY',
    },
  },
};

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'LOAD_CATS': {
      return {
        ...state,
        challenge: {
          ...state.challenge,
          cats: {
            status: 'LOADING',
          },
        },
      };
    }
    case 'SET_CATS': {
      return {
        ...state,
        challenge: {
          ...state.challenge,
          cats: {
            status: 'LOADED',
            data: action.payload.cats,
          },
        },
      };
    }
    case 'SET_SECRET': {
      return {
        ...state,
        challenge: {
          ...state.challenge,
          secret: action.payload.secret,
        },
      };
    }
    default:
      return state;
  }
};
