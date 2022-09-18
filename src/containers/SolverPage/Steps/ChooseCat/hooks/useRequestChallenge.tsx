import { DataConnection } from 'peerjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCreatePeerLazy } from '../../../../hooks/useCreatePeer';
import { useP2PContext } from '../../../../hooks/useP2P';
import { useSelectP2P } from '../../../../hooks/Store/selectors';
import { useStoreContext } from '../../../../hooks/Store/useStore';

export const useChallengerPeerId = () => {
  const { peerId } = useParams();
  return peerId;
};

export const useConnectPeer = () => {
  const [state, dispatch] = useStoreContext();
  const p2p = useSelectP2P();
  const { connectToPeer } = useP2PContext();
  const challengerPeerId = useChallengerPeerId();
  const createPeer = useCreatePeerLazy();

  useEffect(() => {
    createPeer();
  }, []);

  useEffect(() => {
    if (p2p.status === 'OWN_READY' && challengerPeerId) {
      // connect peer
      (async () => {
        await connectToPeer(challengerPeerId);
        dispatch({ type: 'PEER_CONNECTED' });
      })();
    }
  }, [state, challengerPeerId]);
};

export const useRequestChallenge = () => {
  const [state, dispatch] = useStoreContext();
  const p2p = useSelectP2P();
  const { requestChallenge } = useP2PContext();
  useConnectPeer();

  useEffect(() => {
    if (p2p.status === 'CONNECTED') {
      // request challenge
      (async () => {
        const handoverPayload = await requestChallenge();
        handoverPayload &&
          dispatch({ type: 'CHALLENGE_RECEIVED', payload: handoverPayload });

        handoverPayload && dispatch({ type: 'HANDOVER_COMPLETE' });
      })();
    }
  }, [state]);
};
