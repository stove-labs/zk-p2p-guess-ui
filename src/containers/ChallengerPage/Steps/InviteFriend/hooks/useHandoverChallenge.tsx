import { useEffect } from 'react';
import { useCreatePeerLazy } from '../../../../hooks/useCreatePeer';
import { useP2PContext } from '../../../../hooks/useP2P';
import {
  useSelectCats,
  useSelectChallenge,
} from '../../../../hooks/Store/selectors';
import { useStoreContext } from '../../../../hooks/Store/useStore';

/**
 * Setup a P2P peer and wait until it's ready.
 * Once it's ready, wait for a request to handover the challenge,
 * then hand the challenge over and trigger a callback (e.g. move to next step)
 * @param nextStep
 */
export const useHandoverChallenge = (onChallengeHandedOver: () => void) => {
  const [state, dispatch] = useStoreContext();
  const { handoverChallenge, awaitConnection } = useP2PContext();
  const challenge = useSelectChallenge();
  const cats = useSelectCats();
  const createPeer = useCreatePeerLazy();

  // TODO: compile the challenge FIRST!
  // create peer after we compile the challenge
  useEffect(() => {
    createPeer();
  }, []);

  // TODO: add support for duplicate challenge handover, in case when the solver connects multiple times consecutively
  // once our peer is up and running, wait for the challenge handover request and fullfill it
  useEffect(() => {
    // TODO: await connection?
    if (state.p2p.status === 'OWN_READY' && challenge && cats.data) {
      (async () => {
        // TODO: why doesnt the if above capture undefined `cats.data`?
        await handoverChallenge(
          {
            ...challenge,
            // IMPORTANT: get rid of the secret, this cannot be handed over as the name indicates
            secret: undefined,
          },
          cats.data!
        );
        // let the store know the handover has been completed
        dispatch({ type: 'HANDOVER_COMPLETE' });
      })();
    }
  }, [state.p2p.status, challenge, cats, onChallengeHandedOver]);

  // trigger the handover callback once the handover is complete
  useEffect(() => {
    if (state.p2p.status === 'HANDOVER_COMPLETE') onChallengeHandedOver();
  }, [state.p2p.status]);
};
