import constate from 'constate';
import Peer, { DataConnection } from 'peerjs';
import { useCallback, useEffect, useState } from 'react';
import { Cat } from '../../components/ChallengerPage/Stepper';
import {
  awaitConnection,
  connectToPeer,
  createPeer,
  handoverChallenge,
  receiveGuess,
  receiveGuessStatusUpdates,
  requestChallenge,
  sendGuessStatusUpdate,
  submitGuess,
} from '../../lib/p2p';
import { Challenge, GuessStatus, State } from './Store/reducer';
import { useStoreContext } from './Store/useStore';

export const useP2P = () => {
  const [state, dispatch] = useStoreContext();
  const [peer, setPeer] = useState<Peer>();
  const [connection, setConnection] = useState<DataConnection>();

  const _createPeer = useCallback(async () => {
    const { peer, id } = await createPeer();
    setPeer(peer);
    return id;
  }, [setPeer]);

  const _awaitConnection = useCallback(async () => {
    if (connection) return connection;

    const newConnection = peer && (await awaitConnection(peer));
    // persist connection for future usage
    setConnection(newConnection);
    return newConnection;
  }, [peer, connection]);

  const _handoverChallenge = useCallback(
    async (challenge: Exclude<Challenge, 'secret'>, cats: Cat[]) => {
      const connection = await _awaitConnection();
      connection && (await handoverChallenge(connection, challenge, cats));
    },
    [_awaitConnection]
  );

  const _requestChallenge = useCallback(async () => {
    const handoverPayload = connection && (await requestChallenge(connection));
    return handoverPayload;
  }, [connection]);

  const _connectToPeer = useCallback(
    async (connectToId: string) => {
      if (peer) {
        const connection = await connectToPeer(peer, connectToId);
        setConnection(connection);
      }
    },
    [peer]
  );

  const _receiveGuessStatusUpdates = useCallback(
    async (onGuessStatusUpdate: (status: GuessStatus) => void) => {
      const connection = await _awaitConnection();
      connection &&
        (await receiveGuessStatusUpdates(connection, onGuessStatusUpdate));
    },
    [connection]
  );

  const _sendGuessStatusUpdate = useCallback(
    (guessStatus: GuessStatus) => {
      connection && sendGuessStatusUpdate(connection, guessStatus);
    },
    [connection]
  );

  const _receiveGuess = useCallback(async () => {
    const connection = await _awaitConnection();
    return connection && (await receiveGuess(connection));
  }, [connection, _awaitConnection]);

  const _submitGuess = useCallback(
    async (proof: string) => {
      const connection = await _awaitConnection();
      return connection && submitGuess(connection, proof);
    },
    [connection, _awaitConnection]
  );

  return {
    createPeer: _createPeer,
    awaitConnection: _awaitConnection,
    handoverChallenge: _handoverChallenge,
    requestChallenge: _requestChallenge,
    connectToPeer: _connectToPeer,
    receiveGuessStatusUpdates: _receiveGuessStatusUpdates,
    sendGuessStatusUpdate: _sendGuessStatusUpdate,
    receiveGuess: _receiveGuess,
    submitGuess: _submitGuess,
  };
};

export const [P2PProvider, useP2PContext] = constate(useP2P);
