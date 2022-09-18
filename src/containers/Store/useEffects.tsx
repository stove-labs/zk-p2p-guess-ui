import { Dispatch, useEffect, useMemo } from 'react';
import constate from 'constate';
import { useCats } from './selectors';
import { useStoreContext } from './useStore';
import { data } from '../../components/ChallengerPage/Steps/ChooseCat/ChooseCat.stories';
import { loadCatImage, loadCats } from '../../lib/loadCats';
import { sampleSize } from 'lodash';

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

export const useEffects = () => {
  const [state, dispatch] = useStoreContext();
  const effects = useMemo(() => [useLoadCatsEffect], []);
  effects.map((effect) => effect(state, dispatch));
};

export const [EffectsProvider] = constate(useEffects);
