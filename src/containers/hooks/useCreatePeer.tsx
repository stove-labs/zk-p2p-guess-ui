import { useCallback, useEffect } from 'react';
import { useP2PContext } from './useP2P';
import { useStoreContext } from './Store/useStore';

export const useCreatePeerLazy = () => {
  const [state, dispatch] = useStoreContext();
  const { createPeer } = useP2PContext();

  useEffect(() => {
    if (state.p2p.status === 'LOADING') {
      (async () => {
        const peerId = await createPeer();
        dispatch({ type: 'SET_OWN_PEER_ID', payload: { peerId } });
      })();
    }
  }, [state, dispatch, createPeer]);

  return useCallback(() => {
    dispatch({ type: 'CREATE_PEER' });
  }, []);
};
