import { Reducer } from 'react';
import { Cat } from '../../components/ChallengerPage/Stepper';

export interface State {
  challenge: {
    secret?: Cat;
    cats: {
      data?: Cat[];
      status: 'STANDBY' | 'LOADING' | 'READY';
    };
  };
  p2p: {
    status: 'STANDBY' | 'LOADING' | 'READY';
    peerId?: string;
  };
}

export type Action =
  | { type: 'LOAD_CATS' }
  | { type: 'SET_CATS'; payload: { cats: Cat[] } }
  | { type: 'SET_SECRET'; payload: { secret: Cat } }
  | { type: 'CREATE_PEER' }
  | { type: 'SET_PEER_ID'; payload: { peerId: string } };

export const initialState: State = {
  challenge: {
    cats: {
      status: 'STANDBY',
    },
  },
  p2p: {
    status: 'STANDBY',
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
            status: 'READY',
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

    case 'CREATE_PEER': {
      return {
        ...state,
        p2p: {
          status: 'LOADING',
        },
      };
    }

    case 'SET_PEER_ID': {
      return {
        ...state,
        p2p: {
          status: 'READY',
          peerId: action.payload.peerId,
        },
      };
    }

    default:
      return state;
  }
};
