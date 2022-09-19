import { isReady, verify } from 'snarkyjs';
import { RPCCommandMessage, RPCResponseMessage } from '../workers';
import log from 'loglevel';
import { JsonProof } from './getProofFromGuess';

log.setDefaultLevel('DEBUG');

export const verifyProof = async (
  proof: JsonProof,
  verificationKey: string
): Promise<boolean> => {
  console.log('verifyProof', { proof, verificationKey });
  await isReady;
  console.log('is ready');
  return await verify(proof, verificationKey);
};

onmessage = async (
  e: RPCCommandMessage<{
    proof: JsonProof;
    verificationKey: string;
  }>
) => {
  log.debug('message recieved', e);
  const valid = await verifyProof(e.data.proof, e.data.verificationKey);
  const responseMessage: RPCResponseMessage<boolean> = {
    status: 'success',
    data: valid,
  };

  log.debug('responding with message', responseMessage);
  postMessage(responseMessage);
};
