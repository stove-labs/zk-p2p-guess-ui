import { isReady, verify, PrivateKey, Poseidon, UInt64 } from 'snarkyjs';
import { RPCCommandMessage, RPCResponseMessage } from '../workers';
import log from 'loglevel';
import { JsonProof } from './getProofFromGuess';
import { challangeHashToContract } from 'zk-p2p-guess/src/helpers';

log.setDefaultLevel('DEBUG');

const privateKeyJSON = {
  s: '2221840510018593325346886852244642890678926503995097692136933338343303739537',
};

export const verifyProof = async (
  proof: JsonProof,
  verificationKey: string
): Promise<boolean> => {
  console.log('verifyProof', JSON.stringify({ proof, verificationKey }));
  await isReady;
  console.log('is ready');
  const randomPrivateKey = PrivateKey.fromJSON(privateKeyJSON)!;

  /**
   * Compile the contract before verifying, since there is a bug in snarkyjs that
   * makes 'verification' unreachable for some unknown reason if any compilation is not run beforehand
   */

  await challangeHashToContract(
    randomPrivateKey,
    Poseidon.hash(new UInt64('0').toFields()).toString()
  );

  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const valid = await verify(proof, verificationKey);
      resolve(valid);
    }, 4000);
  });
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
