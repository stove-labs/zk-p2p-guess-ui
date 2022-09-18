import { Dispatch, useEffect, useMemo } from 'react';
import constate from 'constate';
import { useCats } from './selectors';
import { useStore, useStoreContext } from './useStore';
import { data } from '../../components/ChallengerPage/Steps/ChooseCat/ChooseCat.stories';
import { loadCatImage, loadCats } from '../../lib/loadCats';
import { sampleSize } from 'lodash';
import { useP2PContext } from '../P2P/useP2P';

export type Effect = (state: any, dispatch: any) => void;

const useLoadCatsEffect: Effect = (state, dispatch) => {
  const cats = useCats();

  useEffect(() => {
    if (cats.status === 'LOADING') {
      (async () => {
        const allCats = await loadCats();
        const sampleCats = sampleSize(allCats, 9);

        const cats = await Promise.all(
          sampleCats.map(async (cat) => ({
            id: cat.id,
            image: await loadCatImage(cat.id),
          }))
        );

        dispatch({ type: 'SET_CATS', payload: { cats: cats } });
      })();
    }
  }, [cats.status]);
};

const useCreatePeerEffect = () => {
  const [state, dispatch] = useStoreContext();
  // create peer in p2p provider
  const { createPeer } = useP2PContext();

  useEffect(() => {
    if (state.p2p.status === 'LOADING') {
      (async () => {
        const peerId = await createPeer();
        dispatch({ type: 'SET_PEER_ID', payload: { peerId } });
      })();
    }
  }, [state, dispatch, createPeer]);
};

export const useEffects = () => {
  const [state, dispatch] = useStoreContext();
  const effects = useMemo(() => [useLoadCatsEffect, useCreatePeerEffect], []);
  effects.map((effect) => effect(state, dispatch));
};

export const [EffectsProvider] = constate(useEffects);
