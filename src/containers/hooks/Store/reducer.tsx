import { Reducer } from 'react';
import { Cat } from '../../../components/ChallengerPage/Stepper';
import { P2PMessage } from '../../../lib/p2p';

export interface Challenge {
  secret?: string;
}

export type GuessStatus =
  | 'STANDBY'
  | 'GUESSING'
  | 'PROVING'
  | 'SENT'
  | 'VALIDATING'
  | 'VALID'
  | 'INVALID';

export interface State {
  challenge?: Challenge;
  guess: {
    status: GuessStatus;
    proof?: string;
  };
  cats: {
    data?: Cat[];
    status: 'STANDBY' | 'LOADING' | 'READY';
  };
  p2p: {
    status:
      | 'STANDBY'
      | 'LOADING'
      | 'OWN_READY'
      | 'CONNECTED'
      | 'HANDOVER_COMPLETE';
    peerId?: string;
  };
}

// TODO: route all P2P messages via store
export type Action =
  | { type: 'LOAD_CATS' }
  | { type: 'SET_CATS'; payload: { cats: Cat[] } }
  | { type: 'SET_SECRET'; payload: { secret: string } }
  // p2p
  | { type: 'CREATE_PEER' }
  | { type: 'SET_OWN_PEER_ID'; payload: { peerId: string } }
  | { type: 'CONNECT_PEER'; payload: { peerId: string } }
  | { type: 'PEER_CONNECTED' }
  | {
      type: 'CHALLENGE_RECEIVED';
      payload: { cats: Cat[]; challenge: Challenge };
    }
  | { type: 'HANDOVER_COMPLETE' }
  | {
      type: 'SET_GUESS_STATUS';
      payload: {
        guessStatus: GuessStatus;
      };
    }
  | {
      type: 'SET_GUESS';
      payload: {
        proof: string;
      };
    };

export const initialState: State = {
  cats: {
    status: 'STANDBY',
  },
  p2p: {
    status: 'STANDBY',
  },
  guess: {
    status: 'STANDBY',
  },
};

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'LOAD_CATS': {
      return {
        ...state,
        cats: {
          status: 'LOADING',
        },
      };
    }
    case 'SET_CATS': {
      return {
        ...state,
        cats: {
          status: 'READY',
          data: action.payload.cats,
        },
      };
    }
    case 'SET_SECRET': {
      return {
        ...state,
        challenge: {
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

    case 'SET_OWN_PEER_ID': {
      return {
        ...state,
        p2p: {
          status: 'OWN_READY',
          peerId: action.payload.peerId,
        },
      };
    }

    case 'CONNECT_PEER': {
      return {
        ...state,
        p2p: {
          status: 'LOADING',
          peerId: action.payload.peerId,
        },
      };
    }

    case 'PEER_CONNECTED': {
      return {
        ...state,
        p2p: {
          ...state.p2p,
          status: 'CONNECTED',
        },
      };
    }

    case 'CHALLENGE_RECEIVED': {
      return {
        ...state,
        cats: {
          status: 'READY',
          data: action.payload.cats,
        },
      };
    }

    case 'HANDOVER_COMPLETE': {
      return {
        ...state,
        p2p: {
          ...state.p2p,
          status: 'HANDOVER_COMPLETE',
        },
      };
    }

    case 'SET_GUESS_STATUS': {
      return {
        ...state,
        guess: {
          ...state.guess,
          status: action.payload.guessStatus,
        },
      };
    }

    case 'SET_GUESS': {
      return {
        ...state,
        guess: {
          ...state.guess,
          proof: action.payload.proof,
        },
      };
    }

    default:
      return state;
  }
};
