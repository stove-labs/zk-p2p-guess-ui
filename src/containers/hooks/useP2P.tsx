import constate from 'constate';
import Peer, { DataConnection } from 'peerjs';
import { useCallback, useEffect, useState } from 'react';
import { Cat } from '../../components/ChallengerPage/Stepper';
import p2p from '../../lib/p2p';
import { JsonProof } from '../../lib/zk/getProofFromGuess';
import { Challenge, GuessStatus, State } from './Store/reducer';
import { useStoreContext } from './Store/useStore';

export const useP2P = () => {
  const [state, dispatch] = useStoreContext();
  const [peer, setPeer] = useState<Peer>();
  const [connection, setConnection] = useState<DataConnection>();

  const createPeer = useCallback(async () => {
    const { peer, id } = await p2p.createPeer();
    setPeer(peer);
    return id;
  }, [setPeer]);

  const awaitConnection = useCallback(async () => {
    if (connection) return connection;
    const newConnection = peer && (await p2p.awaitConnection(peer));
    // persist connection for future usage
    setConnection(newConnection);
    return newConnection;
  }, [peer, connection]);

  const handoverChallenge = useCallback(
    async (challenge: Challenge['public'], cats: Cat[]) => {
      const connection = await awaitConnection();
      connection && (await p2p.handoverChallenge(connection, challenge, cats));
    },
    [awaitConnection]
  );

  const requestChallenge = useCallback(async () => {
    const connection = await awaitConnection();
    const handoverPayload =
      connection && (await p2p.requestChallenge(connection));
    return handoverPayload;
  }, [awaitConnection]);

  const connectToPeer = useCallback(
    async (connectToId: string) => {
      if (peer) {
        const connection = await p2p.connectToPeer(peer, connectToId);
        setConnection(connection);
      }
    },
    [peer]
  );

  const receiveGuessStatusUpdates = useCallback(
    async (onGuessStatusUpdate: (status: GuessStatus) => void) => {
      const connection = await awaitConnection();
      connection &&
        (await p2p.receiveGuessStatusUpdates(connection, onGuessStatusUpdate));
    },
    [awaitConnection]
  );

  const sendGuessStatusUpdate = useCallback(
    async (guessStatus: GuessStatus) => {
      const connection = await awaitConnection();
      connection && p2p.sendGuessStatusUpdate(connection, guessStatus);
    },
    [awaitConnection]
  );

  const receiveGuess = useCallback(async () => {
    const connection = await awaitConnection();
    return connection && (await p2p.receiveGuess(connection));
  }, [awaitConnection]);

  const submitGuess = useCallback(
    async (proof: JsonProof) => {
      const connection = await awaitConnection();
      return connection && p2p.submitGuess(connection, proof);
    },
    [awaitConnection]
  );

  return {
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
};

export const [P2PProvider, useP2PContext] = constate(useP2P);
