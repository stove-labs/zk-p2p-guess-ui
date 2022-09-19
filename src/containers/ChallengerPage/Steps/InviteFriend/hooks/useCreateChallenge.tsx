import { useCallback, useEffect } from 'react';
import { runWorkerWithMessage } from '../../../../../lib/workers';
import {
  useSelectChallenge,
  useSelectSecret,
} from '../../../../hooks/Store/selectors';
import { useStoreContext } from '../../../../hooks/Store/useStore';
export const useCreateChallengeLazy = () => {
  const challenge = useSelectChallenge();
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    // dispatch that it was compiled and provide verification key & state hash
    // it will be handed over once ready
    console.log('should compile?', challenge?.status, challenge?.secret);
    if (challenge?.status === 'COMPILING' && challenge.secret) {
      // run web worker to compile contract from secret
      // TODO: move to zk lib
      (async () => {
        // TODO: why do i need to '!' when i've checked for undefined in the if statement above?
        const secretHash = await runWorkerWithMessage<string, string>(
          'lib/zk/getSecretHash.ts',
          // TODO: get rid of '!'
          challenge.secret!
        );

        console.log('___COMPLETE____', { secretHash });

        const verificationKey = await runWorkerWithMessage<string, string>(
          'lib/zk/getVerificationKeyFromChallangeHash.ts',
          // TODO: get rid of '!'
          secretHash
        );

        console.log('___COMPLETE____', { verificationKey });

        dispatch({
          type: 'CONTRACT_COMPILED',
          payload: {
            verificationKey: verificationKey,
            secretHash,
          },
        });
      })();
    }
  }, [challenge.status, challenge.secret]);

  return useCallback(() => {
    console.log('dispatching to compile');
    dispatch({ type: 'COMPILE_CONTRACT' });
  }, []);
};
