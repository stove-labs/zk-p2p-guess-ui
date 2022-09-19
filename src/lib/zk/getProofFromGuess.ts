import { isReady, PrivateKey, verify } from 'snarkyjs';
import {
  challangeHashToContract,
  compiledContractToVerificationKey,
  setupLocalMinaBlockchain,
  deploy,
  proveGuess,
} from 'zk-p2p-guess/src/helpers';
import { RPCCommandMessage, RPCResponseMessage } from '../workers';
import log from 'loglevel';
log.setDefaultLevel('DEBUG');

export type JsonProof = {
  publicInput: string[];
  maxProofsVerified: 0 | 1 | 2;
  proof: string;
};

const privateKeyJSON = {
  s: '2221840510018593325346886852244642890678926503995097692136933338343303739537',
};

export const getProofFromGuess = async (
  providedContract: {
    verificationKey: string;
    state: string;
  },
  guess: string
): Promise<JsonProof> => {
  log.debug('waiting for snarkyjs to be ready');
  await isReady;

  log.debug('generating a random private key');
  const randomPrivateKey = PrivateKey.fromJSON(privateKeyJSON)!;
  log.debug('generated a random private key', randomPrivateKey);

  log.debug('generating a proof with a guess', { guess, providedContract });
  console.time('compile');
  const { compiledContract, contract } = await challangeHashToContract(
    randomPrivateKey,
    providedContract.state
  );
  console.timeEnd('compile');
  const verifcationKey = compiledContractToVerificationKey(compiledContract);
  log.debug('compiled the snarkyjs contract, this is the verification key', {
    compiledVerificationKey: verifcationKey,
    providedVerificationKey: providedContract.verificationKey,
  });

  if (verifcationKey != providedContract.verificationKey) {
    throw new Error("Verification keys don't match");
  }

  log.debug(
    'proving the given guess against the newly compiled verification key',
    {
      guess,
    }
  );
  console.time('prove');

  const { feePayer } = setupLocalMinaBlockchain();
  const contractInstance = await deploy(randomPrivateKey, feePayer, contract);
  log.debug('contract deployed, attempting to prove');
  const proof = await proveGuess(contractInstance, feePayer, guess);
  console.timeEnd('prove');

  console.time('verify');
  log.debug("verifying proof to make sure it's correct", { proof });
  const verified = verify(proof, verifcationKey);
  log.debug("verifying proof to make sure it's correct");
  console.timeEnd('verify');

  return proof.toJSON();
};

onmessage = async (
  e: RPCCommandMessage<{
    contract: {
      verificationKey: string;
      state: string;
    };
    guess: string;
  }>
) => {
  log.debug('message recieved', e);
  const proof = await getProofFromGuess(e.data.contract, e.data.guess);
  const responseMessage: RPCResponseMessage<JsonProof> = {
    status: 'success',
    data: proof,
  };

  log.debug('responding with message', responseMessage);
  postMessage(responseMessage);
};
