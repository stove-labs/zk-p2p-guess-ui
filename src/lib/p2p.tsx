import { DataConnection, Peer } from 'peerjs';
import { Cat } from '../components/ChallengerPage/Stepper';
import {
  Challenge,
  GuessStatus,
  State,
} from '../containers/hooks/Store/reducer';
import { JsonProof } from './zk/getProofFromGuess';

export type P2PMessage =
  | { type?: 'REQUEST_CHALLENGE' }
  | {
      type?: 'HANDOVER_CHALLENGE';
      payload: {
        cats: Cat[];
        challenge: Challenge['public'];
      };
    }
  | {
      type: 'GUESS_STATUS_UPDATE';
      payload: {
        guessStatus: GuessStatus;
      };
    }
  | {
      type: 'SUBMIT_GUESS';
      payload: {
        // TODO: add challenge here to solidify the protocol?
        proof?: JsonProof;
      };
    };

export const createPeer = () => {
  return new Promise<{ peer: Peer; id: string }>((resolve, reject) => {
    const peer = new Peer();
    peer.on('open', (id) => {
      resolve({
        peer,
        id,
      });
    });
  });
};

export const awaitConnection = async (peer: Peer): Promise<DataConnection> => {
  return new Promise((resolve, reject) => {
    peer.on('connection', (connection) => {
      resolve(connection);
    });
  });
};

export const handoverChallenge = async (
  connection: DataConnection,
  challenge: Challenge['public'],
  cats: Cat[]
): Promise<DataConnection> => {
  return new Promise((resolve, reject) => {
    connection.on('data', (data) => {
      const message: P2PMessage = {
        type: 'HANDOVER_CHALLENGE',
        payload: { challenge, cats },
      };
      connection.send(message);
      resolve(connection);
    });
  });
};

export const receiveGuessStatusUpdates = (
  connection: DataConnection,
  onGuessStatusUpdate: (status: GuessStatus) => void
) => {
  connection.on('data', (data) => {
    const message = data as P2PMessage | undefined;
    if (message?.type === 'GUESS_STATUS_UPDATE') {
      onGuessStatusUpdate(message.payload.guessStatus);
    }
  });
};

export const sendGuessStatusUpdate = (
  connection: DataConnection,
  guessStatus: GuessStatus
) => {
  const message: P2PMessage = {
    type: 'GUESS_STATUS_UPDATE',
    payload: { guessStatus },
  };
  connection.send(message);
};

export const receiveGuess = async (
  connection: DataConnection
): Promise<JsonProof | undefined> => {
  return new Promise((resolve, reject) => {
    connection.on('data', (data) => {
      const message = data as P2PMessage | undefined;
      if (message?.type === 'SUBMIT_GUESS') {
        resolve(message.payload.proof);
      }
    });
  });
};

export const submitGuess = (connection: DataConnection, proof?: JsonProof) => {
  const message: P2PMessage = {
    type: 'SUBMIT_GUESS',
    payload: { proof },
  };
  connection.send(message);
};

// timeout the connection if it doesnt happen within 5 seconds
export const CONNECTION_TIMEOUT = 5000;

export const connectToPeer = async (peer: Peer, connectToId: string) => {
  const connection = peer.connect(connectToId);
  await new Promise<void>((resolve, reject) => {
    connection.on('open', () => {
      resolve();
    });
  });
  return connection;
};

export const requestChallenge = async (
  connection: DataConnection
): Promise<{ cats: Cat[]; challenge: Challenge['public'] }> => {
  return new Promise((resolve, reject) => {
    connection.on('data', (data) => {
      const message = data as P2PMessage | undefined;
      if (message?.type === 'HANDOVER_CHALLENGE') {
        resolve(message.payload);
      }
    });

    const message: P2PMessage = { type: 'REQUEST_CHALLENGE' };
    connection.send(message);
  });
};

export default {
  awaitConnection,
  connectToPeer,
  createPeer,
  handoverChallenge,
  receiveGuess,
  receiveGuessStatusUpdates,
  requestChallenge,
  sendGuessStatusUpdate,
  submitGuess,
};
