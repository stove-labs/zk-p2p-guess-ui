import { sampleSize } from 'lodash';
import { useCallback, useEffect } from 'react';
import { useSelectCats } from '../../../../hooks/Store/selectors';
import { useStoreContext } from '../../../../hooks/Store/useStore';
import { loadFewCats } from '../../../../../lib/loadCats';

/**
 * Wait until an action triggers loading of cats, then load cats with images
 * @returns
 */
export const useLoadCatsLazy = () => {
  const [_, dispatch] = useStoreContext();
  const cats = useSelectCats();

  // react to state change requesting to load cats
  useEffect(() => {
    if (cats.status === 'LOADING') {
      (async () => {
        const cats = await loadFewCats();
        // resolve the request to load cats by dispatching an action
        dispatch({ type: 'SET_CATS', payload: { cats: cats } });
      })();
    }
  }, [cats.status]);

  // callback allowing to load cats lazily
  return useCallback(() => {
    dispatch({ type: 'LOAD_CATS' });
  }, []);
};
